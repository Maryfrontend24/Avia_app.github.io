import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: 'cheapest', // fastest, optimal
  all: false,
  stops: {
    noStops: false,
    oneStop: true,
    twoStops: false,
    threeStops: false,
  },
  isTicketsLoaded: false,
};

const ticketsSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    toggleAll(state) {
      const newValue = !state.all; // Переключаем значение "Все"
      state.all = newValue;
      console.log(state);

      Object.keys(state.stops).forEach((key) => {
        state.stops[key] = newValue;
      });
    },
    toggleStop(state, action) {
      const { stopType } = action.payload;

      // Переключаем конкретный фильтр
      state.stops[stopType] = !state.stops[stopType];

      // Если включен любой один фильтр, снимаем все
      if (state.all) {
        state.all = false; // Снимаем галочку Все
      } else {
        // Проверяем, включены ли все фильтры
        const allStopsEnabled = Object.values(state.stops).every((v) => v);
        state.all = allStopsEnabled; // Устанавливаем галочку Все, если все фильтры включены
      }
    },
  },
});

export const { setFilter, toggleAll, toggleStop } = ticketsSlice.actions;
export default ticketsSlice.reducer;
