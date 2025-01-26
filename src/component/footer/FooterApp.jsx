import React from 'react';
import { useSelector } from 'react-redux';

const FooterApp = () => {
  const loading = useSelector((state) => state.tickets.loading);
  const fetchedTickets = useSelector((state) => state.tickets.tickets);
  const noTicketsMessage = useSelector(
    (state) => state.tickets.noTicketsMessage,
  );
  const transferFilters = useSelector((state) => state.filters.stops);

  const activeTransferFiltersCount =
    Object.values(transferFilters).filter(Boolean).length;

  const shouldShowFooter =
    !loading &&
    fetchedTickets.length > 0 &&
    !noTicketsMessage &&
    activeTransferFiltersCount < 2;

  return (
    <footer>
      {shouldShowFooter && (
        <div className="main-footer section--line">
          Показать еще 5 билетов!
        </div>
      )}
    </footer>
  );
};

export default FooterApp;
