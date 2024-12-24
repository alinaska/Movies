import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../store/reducer';
import {setSearchText, setSearchActive} from '../store/reducer';

const MovieSearch = () => {
    const { searchText } = useSelector((state: RootState) => state.filters);
    const dispatch = useDispatch();

    const handleChangeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchText(e.target.value));   
        
      }, [dispatch, searchText]);       

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    dispatch(setSearchActive(true));    
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ mb: 3 }} variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment">Название фильма</InputLabel>
        <OutlinedInput
          id="outlined-adornment"
          type="text"
          value={searchText}
          onChange={handleChangeSearch}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Название фильма"
        />
      </FormControl>
    </form>
  );
};

export default MovieSearch;
