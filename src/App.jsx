import React, { useEffect, useState } from 'react';
import './main.css';
import HeaderApp from './component/header/HeaderApp.jsx';
import TransferFilters from './component/transfers/TransferFilters.jsx';
import PriceFilters from './component/categoriesTickets/PriceFilters.jsx';
import TicketsList from './component/ticketsList/TicketsList.jsx';
import FooterApp from './component/footer/FooterApp.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTickets,
  fetchSearchId,
} from './redux/slices/ticketsSlice.js';


  //
  const App = () => {
    const dispatch = useDispatch();
    const { stop, searchId } = useSelector((state) => state.tickets);
    const [noTicketsMessage, setNoTicketsMessage] = useState(false);

  //   useEffect(() => {
  //       console.log('Запуск цикла получения билетов...');
  //       const fetchTicketsLoop = async () => {
  //         while (!stop) {
  //           try {
  //             // Получаем searchId из хранилища
  //             const localSearchId = localStorage.getItem('searchId');
  //
  //             // Если searchId не найден, то мы запрашиваем его
  //             if (!localSearchId) {
  //               console.log('searchId не найден, запрашиваем новый...');
  //               const action = await dispatch(fetchSearchId());
  //
  //               // Проверяем статус выполнения fetchSearchId
  //               if (fetchSearchId.fulfilled.match(action)) {
  //                 // Тут можно добавить задержку перед следующей итерацией
  //                 console.log("Получен новый searchId. Продолжаем...");
  //                 await new Promise((resolve) => setTimeout(resolve, 5000));
  //               } else {
  //                 // В случае ошибки пишем в лог и выходим из цикла
  //                 console.error('Не удалось получить новый searchId:', action.error);
  //                 break;
  //               }
  //             } else {
  //               const action = await dispatch(fetchTickets(localSearchId));
  //
  //               // Проверяем, успешно ли выполнен запрос на получение билетов
  //               if (action.meta.requestStatus === 'fulfilled'&& action.payload.stop) {
  //                 if (action.payload.stop) {
  //                   break; // Останавливаем цикл, если получен сигнал остановки
  //                 }
  //               }
  //
  //               // Тут можно добавить задержку перед следующей итерацией
  //               await new Promise((resolve) => setTimeout(resolve, 5000));
  //             }
  //           } catch (error) {
  //             console.error('Ошибка при получении билетов:', error);
  //             break;
  //           }
  //         }
  //       };
  //       fetchTicketsLoop();
  //     }, [dispatch, stop, searchId]);

    useEffect(() => {
    console.log('Запуск цикла получения билетов...');
      const fetchTicketsLoop = async () => {
        while (!stop) {
          try {
            // Получаем searchId из хранилища
            const localSearchId = localStorage.getItem('searchId');
            // Если searchId не найден, то мы запрашиваем его
            if (!localSearchId) {
              console.log('searchId не найден, запрашиваем новый...');
              const action = await dispatch(fetchSearchId());
              // Проверяем, успешно ли получен новый searchId
              if (fetchSearchId.fulfilled.match(action)) {
              } else {
                console.error('Не удалось получить новый searchId:', action.error);
                break;}
            } else {
              const action = await dispatch(fetchTickets(localSearchId));
              if (action.meta.requestStatus === 'fulfilled' && action.payload.stop) {
                break;
              }
            }
            // await new Promise((resolve) => setTimeout(resolve, 3000));
          } catch (error) {
            console.error('Ошибка при получении билетов:', error);
            break;
          }
        }
      };
      fetchTicketsLoop();
  }, [dispatch, stop, searchId]);




  return (
    <div className="App">
      <div className="wrapper">
        <HeaderApp />
        <div className="main">
          <TransferFilters />
          <PriceFilters />
          <TicketsList
            noTicketsMessage={noTicketsMessage}
            setNoTicketsMessage={setNoTicketsMessage}
          />
          <FooterApp noTicketsMessage={noTicketsMessage} />
        </div>
      </div>
    </div>
  );
};
export default App;
