import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react'
import Box from '@mui/material/Box';

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
    <Box display='flex' 
         justifyContent='center' 
         position='absolute' 
         top={850}
         left={-25} 
         right={300}>  
      <Stack spacing={2}>
        <Pagination
          count={totalPages} 
          page={page}
          onChange={handleChange} 
        />
      </Stack>
    </Box>
  );
}


export default Pages
