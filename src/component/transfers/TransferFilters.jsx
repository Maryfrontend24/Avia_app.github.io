import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAll, toggleStop } from '../../redux/slices/filtersSlice.js';
import { fetchTickets } from '../../redux/slices/ticketsSlice.js';

const TransferFilters = () => {
  const dispatch = useDispatch();
  const searchId = useSelector((state) => state.tickets.searchId);
  const { all, stops } = useSelector((state) => state.filters);

  const handleToggleAll = () => {
    dispatch(toggleAll());
  };

  const handleToggleStop = (stopType) => {
    dispatch(toggleStop({ stopType }));
  };

  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets(searchId));
    }
  }, [stops, dispatch, searchId]);

  return (
      <div className="transfer-filter">
        <h3 className="transfer-filter__title">Количество пересадок</h3>
        <form className="checkbox-container">
          <input
              type="checkbox"
              className="custom-checkbox"
              id="done-1"
              checked={all}
              onChange={handleToggleAll}
          />
          <label htmlFor="done-1">Все</label>

          <input
              type="checkbox"
              className="custom-checkbox"
              id="done-2"
              checked={stops.noStops}
              onChange={(e) => handleToggleStop('noStops')}
          />
          <label htmlFor="done-2">Без пересадок</label>

          <input
              type="checkbox"
              className="custom-checkbox"
              id="done-3"
              checked={stops.oneStop}
              onChange={() => handleToggleStop('oneStop')}
          />
          <label htmlFor="done-3">1 пересадка</label>

          <input
              type="checkbox"
              className="custom-checkbox"
              id="done-4"
              checked={stops.twoStops}
              onChange={() => handleToggleStop('twoStops')}
          />
          <label htmlFor="done-4">2 пересадки</label>

          <input
              type="checkbox"
              className="custom-checkbox"
              id="done-5"
              checked={stops.threeStops}
              onChange={() => handleToggleStop('threeStops')}
          />
          <label htmlFor="done-5">3 пересадки</label>
        </form>
      </div>
  );
};

export default TransferFilters;
