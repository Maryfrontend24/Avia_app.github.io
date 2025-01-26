import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/slices/filtersSlice.js';

const PriceFilters = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.filters.filter);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="price-filters section--line">
      <div
        className={`price-filter price-filter__cheap ${currentFilter === 'cheapest' ? 'price-filter__cheap--active' : ''}`}
        onClick={() => handleFilterChange('cheapest')}
      >
        Самый дешевый
      </div>
      <div
        className={`price-filter price-filter__fastest ${currentFilter === 'fastest' ? 'price-filter__fastest--active' : ''}`}
        onClick={() => handleFilterChange('fastest')}
      >
        Самый быстрый
      </div>
      <div
        className={`price-filter price-filter__optimal ${currentFilter === 'optimal' ? 'price-filter__optimal--active' : ''}`}
        onClick={() => handleFilterChange('optimal')}
      >
        Оптимальный
      </div>
    </div>
  );
};

export default PriceFilters;
