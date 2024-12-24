import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';

export interface SortOption {
    value: string;
    label: string;  
  }
interface SelectProps {
    value: string; 
    onChange: (e: SelectChangeEvent<string>) => void; 
    options: SortOption[];
      }

export const sortOptions: SortOption[] = [
  { value: "popular", label: "По популярности" },
  { value: "top-rated", label: "По рейтингу" },
  { value: "favorite", label: "Избранные фильмы" },
  
];

  export const Sort = ({ value, onChange, options }: SelectProps) => {
    return (
        <>          
          <Select value={value} onChange={onChange} sx={{ width: '300px' }} >
          {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
              </MenuItem>
            ))}
          </Select>
        </>
      );
}