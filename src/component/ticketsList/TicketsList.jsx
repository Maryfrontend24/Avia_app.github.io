import React, { useEffect, useId, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ticket from '/src/component/ticket/Ticket.jsx';

const TicketsList = ({ noTicketsMessage, setNoTicketsMessage }) => {
  let id = 100;
  const dispatch = useDispatch();
  const fetchedTickets = useSelector((state) => state.tickets.tickets); // Получаем все билеты из состояния
  const filter = useSelector((state) => state.filters.filter); // Получаем фильтры из состояния
  const transferFilters = useSelector((state) => state.filters.stops);
  const loading = useSelector((state) => state.tickets.loading); // Получаем состояние загрузки

  const filteredTickets = useMemo(() => {
    return fetchedTickets.filter((ticket) => {
      const stopCount =
        ticket.segments[0].stops.length || ticket.segments[1].stops.length;
      const count =
        ticket.segments[0].stops.length + ticket.segments[1].stops.length;

      // фильтры пересадок
      if (transferFilters.noStops && count > 0) return false; // Без пересадок
      if (transferFilters.oneStop && stopCount !== 1) return false;
      if (transferFilters.twoStops && stopCount !== 2) return false;
      if (transferFilters.threeStops && stopCount !== 3) return false; // 3 пересадки
      return true;
    });
  }, [fetchedTickets, transferFilters]);

  const sortedTickets = useMemo(() => {
    return [...filteredTickets].sort((a, b) => {
      switch (filter) {
        case 'cheapest':
          return a.price - b.price;
        case 'fastest':
          return a.segments[0].duration - b.segments[0].duration;
        case 'optimal':
          const aTravelTime = a.segments.reduce(
            (total, segment) => total + segment.duration,
            0,
          );
          const bTravelTime = b.segments.reduce(
            (total, segment) => total + segment.duration,
            0,
          );

          // Сравниваем время в пути
          if (aTravelTime !== bTravelTime) {
            return aTravelTime - bTravelTime; // Сортируем по времени в пути
          }

          // Если время в пути одинаковое, сравниваем по цене
          return a.price - b.price; //
        default:
          return 0;
      }
    });
  }, [filteredTickets, filter]);

  const renderingTickets = sortedTickets.slice(0, 10);

  useEffect(() => {
    // Если загрузка завершена и нет билетов, устанавливаем таймаут для текста пользователю
    if (!loading) {
      if (renderingTickets.length === 0) {
        const timer = setTimeout(() => {
          setNoTicketsMessage(true);
        }, 800);

        return () => clearTimeout(timer); //очистка таймера при размонтировании
      } else {
        setNoTicketsMessage(false); // Сброс текста, если билеты есть
      }
    }
  }, [loading, renderingTickets]);

  return (
    <ul className="tickets-list">
      {loading && (
        <li style={{ marginBottom: '10px' }}>Загрузка билетов...</li>
      )}
      {/*{error && <li style={{ color: 'red', marginBottom: '10px' }}>Ошибка: {error.message}</li>}/*/}
      {renderingTickets.length > 0
        ? renderingTickets.map((ticket) => (
            <Ticket key={id++} ticket={ticket} />
          ))
        : noTicketsMessage && (
            <li>Нет билетов, соответствующих поиску:(</li>
          )}
    </ul>
  );
};

export default TicketsList;
