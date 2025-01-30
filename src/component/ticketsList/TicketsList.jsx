import React, {useEffect, useId, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Ticket from '/src/component/ticket/Ticket.jsx';
 import { v4 as uuidv4 } from 'uuid';
 import {Spin} from "antd";

const TicketsList = ({noTicketsMessage, setNoTicketsMessage}) => {
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

          if (aTravelTime !== bTravelTime) {
            return aTravelTime - bTravelTime;
          }
          return a.price - b.price; //
        default:
          return 0;
      }
    });
  }, [filteredTickets, filter]);

  const renderingTickets = sortedTickets.slice(0, 10);

  useEffect(() => {
    if (!loading) {
      if (renderingTickets.length === 0) {
        // Если билетов нет, то устанавливаем таймаут для текста пользователю
        const timer = setTimeout(() => {
          setNoTicketsMessage(true);
        }, 800);

        return () => clearTimeout(timer);
      } else {
        // если билеты есть,то сбрасываем сообщение
        setNoTicketsMessage(false);
      }
    }
  }, [loading, renderingTickets]);

  return (

      <ul className="tickets-list">
        {loading && (
            <Spin
                spinning={true}
                size="middle"
                fullscreen={false}
                className="wrapperClassName"
            />
        )}
        {renderingTickets.length > 0
            ? renderingTickets.map((ticket) => {
              // уникальный ключ
              const key = `${ticket.price}-${ticket.carrier}-${uuidv4()}`;
              return <Ticket key={key} ticket={ticket}/>;
            })
            : noTicketsMessage && (
            <li>Нет билетов, соответствующих поиску:(</li>
        )}
      </ul>
  );
};

export default TicketsList;
