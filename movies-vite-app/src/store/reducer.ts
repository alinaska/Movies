import { Genre, Movie } from "../components/constants";
import { initialSort } from '../components/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface FiltersState {
    checked: { [genreId: string]: boolean };
    sort: string;
    genres: Genre[];
    
  error: string | null;
    yearRange: number[];        
    searchText: string;
    isSearchActive: boolean
  }
  interface UserState {
    token: string;
    account_id: number | null;
  }

  const initialStateFilters: FiltersState = {
    checked: {},
    sort: initialSort,
    genres: [],
    
    error: null,
    yearRange: [2000, 2024],    
    searchText: '',
    isSearchActive: false
  };
  
  const initialStateUser: UserState = {
    token: '',
    account_id: null,
  };

  interface MovieState {
    movies: Movie[];
    favorites: Movie[];
    currentPage: number;
    totalPages: number;
    errorMessage: { [movieId: string]: string };
    
  }

  const initialStateFilms: MovieState = {
    movies: [],
    favorites: [],
    currentPage: 1,
    totalPages: 1,
    errorMessage: {},
    };
  export interface RootState {
    filters: FiltersState;
    user: UserState;
    films: MovieState;
    
  }


  const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialStateFilters,
    reducers: {
      setGenres: (state, action: PayloadAction<Genre[]>) => {
        state.genres = action.payload;       
      },      
      genresFetchError: (state, action: PayloadAction<string>) => {        
        state.error = action.payload;
      },
      toggleGenre: (state, action: PayloadAction<string>) => {
        const genreId = action.payload;
        state.checked[genreId] = !(state.checked[genreId] ?? false);
      },
      setSort: (state, action: PayloadAction<string>) => {
        state.sort = action.payload;
      },
      setYear: (state, action: PayloadAction<number[]>) => {
        state.yearRange = action.payload;
      },
      resetChecked: (state) => {
        state.checked = {};
      },
      setSearchText: (state, action: PayloadAction<string>) => {
        state.searchText = action.payload;
      },
      setSearchActive: (state, action: PayloadAction<boolean>) => {
        state.isSearchActive = action.payload;
      },
    },
  });
  
  const userSlice = createSlice({
    name: 'user',
    initialState: initialStateUser,
    reducers: {
      setToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
      },
      setAccountId: (state, action: PayloadAction<number | null>) => {
        state.account_id = action.payload;
      },
    },
  });
  
  const filmsSlice = createSlice({
    name: 'films',
    initialState: initialStateFilms,
    reducers: {
      setMovies: (state, action: PayloadAction<Movie[]>) => {
        state.movies = action.payload;
      },
      setFavorites: (state, action: PayloadAction<Movie[]>) => {
        state.favorites = action.payload;
      },
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
      },
      setTotalPages: (state, action: PayloadAction<number>) => {
        state.totalPages = action.payload;
      },
      setErrorMessage: (state, action: PayloadAction<{ [movieId: number]: string }>) => {
        state.errorMessage = action.payload;
      },
    },
  });
  
  export const {
    setGenres,    
    genresFetchError,
    toggleGenre,
    setSort,
    setYear,
    resetChecked,
    setSearchText,
    setSearchActive,
  } = filtersSlice.actions;
  
  export const { setToken, setAccountId } = userSlice.actions;
  
  export const { setMovies, setFavorites, setCurrentPage, setTotalPages, setErrorMessage } = filmsSlice.actions;
  
  export default {
    filters: filtersSlice.reducer,
    user: userSlice.reducer,
    films: filmsSlice.reducer,
  };