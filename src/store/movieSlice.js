import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '194291fb71772fdfacec2f6703a07ffa';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
  return response.data.results;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    watchlist: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addToWatchlist: (state, action) => {
      if (!state.watchlist.find(movie => movie.id === action.payload.id)) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(movie => movie.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToWatchlist, removeFromWatchlist } = movieSlice.actions;
export default movieSlice.reducer;