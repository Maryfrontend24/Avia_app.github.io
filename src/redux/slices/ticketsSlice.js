import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const SEARCH_URL = 'https://aviasales-test-api.kata.academy/search';
const TICKETS_URL = 'https://aviasales-test-api.kata.academy/tickets';

export const fetchSearchId = createAsyncThunk(
  'tickets/fetchSearchId',
  async () => {
    console.log('Запрос к серверу для получения searchId...');
    const response = await fetch(SEARCH_URL, {
      credentials: 'same-origin',
    });
    if (!response.ok) {
      console.error('Ошибка при получении searchId');
      throw new Error('Error fetching searchId');
    }
    const data = await response.json();
    console.log('Получен searchId:', data.searchId);
    localStorage.setItem('searchId', data.searchId);
    return data.searchId;
  },
);

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (searchId, { rejectWithValue }) => {
    console.log(
      'Запрос к серверу для получения билетов с searchId:',
      searchId,
    );
    try {
      const response = await fetch(`${TICKETS_URL}?searchId=${searchId}`);
      if (!response.ok) {
        if (response.status === 404) {
          return rejectWithValue(
            `Ничего не найдено для searchId: ${searchId}`,
          );
        }
        console.error(
          `Ошибка при получении билетов: ${response.status} - ${response.statusText}`,
        );
        return rejectWithValue(
          `Ошибка ${response.status}: ${response.statusText}`,
        ); // Указываем статус и текст ошибки
      }

      const data = await response.json();
      console.log('Получены билеты:', data);

      if (data.tickets.length === 0 && data.stop) {
        console.log('Запрос завершён: билеты не найдены.');
        return { tickets: [], stop: true };
      }

      return data;
    } catch (error) {
      console.error('Исключение при запросе:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    searchId: null,
    tickets: [],
    loading: false,
    error: null,
    stop: false,
  },
  reducers: {
    resetState(state) {
      state.tickets = [];
      state.loading = false;
      state.error = null;
      state.stop = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload; // сохраняем searchId
        state.loading = false;
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        if (action.payload.stop) {
          state.stop = true; // Устанавливаем stop в true
          state.loading = false;
        } else {
          state.tickets.push(...action.payload.tickets);
          state.loading = false;
        }
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = ticketsSlice.actions;

export default ticketsSlice.reducer;
