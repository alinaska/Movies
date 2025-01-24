import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react'

interface PaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
  }

const Pages = ({ totalPages, onPageChange }: PaginationProps) => {
  const [page, setPage] = useState(1);

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    onPageChange(value);
  };

  return (
    <Stack sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Pagination
        count={totalPages} 
        page={page}
        onChange={handleChange} 
      />
    </Stack>
  );
};


export default Pages
