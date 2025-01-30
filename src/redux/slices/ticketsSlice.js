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
      console.log('Запрос к серверу для получения билетов с searchId:', searchId);
      try {
        const response = await fetch(`${TICKETS_URL}?searchId=${searchId}`);
        if (!response.ok) {
          if (response.status === 404) {
            return rejectWithValue(`Ничего не найдено для searchId: ${searchId}`);
          }
          console.error(`Ошибка при получении билетов: ${response.status} - ${response.statusText}`);
          return rejectWithValue(`Ошибка ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Получены билеты:', data);

        return data; // Возвращаем данные, даже если tickets пустые
      } catch (error) {
          console.error('Ошибка при получении searchId:', error);
          throw error;
      }
    },
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
      searchId: localStorage.getItem('searchId') || null,
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
      state.stop = true;
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
          state.error = action.error.message;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
          state.error = null;
      })
        .addCase(fetchTickets.fulfilled, (state, action) => {
            if (action.payload.stop) {
                state.stop = true; // Устанавливаем stop в true
            }
            state.loading = false;
            state.tickets.push(...action.payload.tickets);
        })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Произошла ошибка';
      });
  },
});

export const { resetState } = ticketsSlice.actions;

export default ticketsSlice.reducer;
