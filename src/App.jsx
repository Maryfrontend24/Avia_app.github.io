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

const App = () => {
  const dispatch = useDispatch();
  const { stop, searchId } = useSelector((state) => state.tickets);
  const transferFilters = useSelector((state) => state.filters.stops);
  const [noTicketsMessage, setNoTicketsMessage] = useState(false);

  useEffect(() => {
    console.log('--');
    const localSearchId = localStorage.getItem('searchId');
    console.log(localSearchId);

    if (localSearchId) {
      dispatch(fetchTickets(localSearchId)).then((response) => {
        if (response.error && response.error.message.includes('404')) {
          console.log('Ошибка 404, получаем новый searchId...');
          dispatch(fetchSearchId()).then((newSearchIdResponse) => {
            // Сохраняем новый searchId в хранилище
            localStorage.setItem('searchId', newSearchIdResponse.payload);
          });
        }
        if (response.error && response.error.message.includes('500')) {
          console.log('Ошибка 404, получаем новый searchId...');
          dispatch(fetchSearchId()).then((newSearchIdResponse) => {
            // Сохраняем новый searchId в хранилище
            localStorage.setItem('searchId', newSearchIdResponse.payload);
          });
        }
      });
    } else {
      console.log('Получаем новый searchId...');
      dispatch(fetchSearchId()).then((newSearchIdResponse) => {
        // Сохраняем его в хранилище
        localStorage.setItem('searchId', newSearchIdResponse.payload);
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (searchId && !stop) {
      const interval = setInterval(() => {
        console.log('Запрос билетов...');
        dispatch(fetchTickets(searchId));
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [dispatch, searchId, stop]);

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
