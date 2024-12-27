import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, Typography, Box, SelectChangeEvent, Slider, Paper, } from '@mui/material';
import { GenresList } from './GenresList';
import { useEffect, useCallback } from "react";
import { fetchGenres } from './api';
import { Sort, sortOptions } from './Sort';
import { initialSort } from './constants';
import MovieSearch from './MovieSearch';
import {  
  setGenres,
  genresFetchError,
  toggleGenre,
  setSort,
  setYear,
  resetChecked,
  setSearchText,
} from '../store/reducer';
import {RootState} from '../store/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { Genre } from './constants';

const Filters = () => {  
    
  const dispatch = useDispatch();
  const { sort, yearRange } = useSelector((state: RootState) => state.filters);
  const { token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchData = async () => {      
      try {
        const genresData: Genre[] = await fetchGenres(token);
      dispatch(setGenres(genresData));
      } catch (error: any) {
        dispatch(genresFetchError(error.message));
      }
    };    
    fetchData();    
  }, [dispatch, token]); 

  const handleGenreChange = useCallback((genreId: number) => {
    dispatch(toggleGenre(genreId));
  }, [dispatch]);
  
  const handleSortChange = useCallback((e: SelectChangeEvent<string>) => {
    dispatch(setSort(e.target.value));
  }, [dispatch]);
  
  const handleYearChange = useCallback((e: Event, newValue: number | number[]) => {
    dispatch(setYear(Array.isArray(newValue) ? newValue : [newValue, newValue]));
  }, [dispatch]);

    const handleReset = () => {      
    dispatch(setSort(initialSort));
    dispatch(setYear([2000, 2024]));
    dispatch(resetChecked()); 
    dispatch(setSearchText(''));
    };    

  return (      
    <Paper>
      <Box 
        component="div" 
        width={300}
        minHeight={700}
        padding={4}
        position='relative'
        >            
      <Box 
        display='flex'
        gap='190px'
        marginBottom='24px'           
        >
        <Typography variant="h6" align='left'>Фильтры</Typography>
        <IconButton  color='default' 
                     aria-label="save"
                     onClick={handleReset}
                     >
          <ClearIcon />
        </IconButton>
      </Box>  
      <MovieSearch />
      <Typography variant="body1">
        Сортировать:
      </Typography>

    <Sort value={sort} 
        onChange={handleSortChange}
        options={sortOptions}        
        >                     
      </Sort>
    <Typography variant="h6" marginBottom={4} marginTop={3} >
    Год релиза
    </Typography>
      <Slider 
      min={1950}
      max={2024}
        getAriaLabel={() => 'Год релиза'}
        value={yearRange}
        onChange={handleYearChange}
        valueLabelDisplay="on"
        getAriaValueText={(value) => value.toString()}
      />
      <GenresList onChange={handleGenreChange} />      
  </Box></Paper> 
    )
}


export default Filters;
