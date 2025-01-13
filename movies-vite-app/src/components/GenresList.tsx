import { useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import {TextField, Checkbox, ListItem, ListItemText} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Genre } from './constants';
import {RootState} from '../store/reducer';

interface GenresListProps {
  onChange: (genreId: string) => void;
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const GenresList = ({ onChange }: GenresListProps) =>{
  const { checked, genres } = useSelector((state: RootState) => state.filters);     
   return(
      <>
      <Autocomplete
      multiple
      id="multiple-limit-tags"
      options={genres as Genre[]}
      getOptionLabel={(option) => option?.genre || ''}
            
      renderOption={(props, option) => (
        <ListItem {...props} key={option._id}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={checked[option._id] ?? false}
            onChange={() => onChange(option._id)}
          />
          <ListItemText primary={option.genre} />
        </ListItem>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Жанры" placeholder="Жанры" />
      )}
      sx={{ width: '300px', mt: 3 }}      
    />      
      </> 
  )
}