import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/slices/filtersSlice.js';
import {Flex, Radio} from "antd";

const PriceFilters = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.filters.filter);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <Flex vertical gap="large">
      <Radio.Group
        defaultValue="a"
        buttonStyle="solid"
        size={"large"}
        block={true}
      >
        <Radio.Button
          value="a"
          className={`price-filter price-filter__cheap ${currentFilter === 'cheapest' ? 'price-filter__cheap--active' : ''}`}
          onClick={() => handleFilterChange('cheapest')}
        >
          Самый дешевый
        </Radio.Button>
        <Radio.Button
          value="b"
          className={`price-filter price-filter__fastest ${currentFilter === 'fastest' ? 'price-filter__fastest--active' : ''}`}
          onClick={() => handleFilterChange('fastest')}
        >
          Самый быстрый
        </Radio.Button>
        <Radio.Button
          value="c"
          className={`price-filter price-filter__optimal ${currentFilter === 'optimal' ? 'price-filter__optimal--active' : ''}`}
          onClick={() => handleFilterChange('optimal')}
        >
          Оптимальный
        </Radio.Button>
      </Radio.Group>
    </Flex>
  );
};

export default PriceFilters;
