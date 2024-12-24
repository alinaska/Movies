import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import LoginForm from './forms/LoginForm';
import TokenForm from './forms/TokenForm';
import { useState } from 'react';


const Header = () => {
    
    const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
    const [isTokenFormOpen, setIsTokenFormOpen] = useState(false);
  
    const handleOpenLoginForm = () => {
      setIsLoginFormOpen(true);
    };
  
    const handleCloseLoginForm = () => {
      setIsLoginFormOpen(false);
    };
  
    const handleRequestToken = () => {      
      setIsTokenFormOpen(true);      
      handleCloseLoginForm();
    };

    const handleCloseTokenForm = () => {
        setIsTokenFormOpen(false);
          };      
  
    return (
      <Box
        component="div"
        sx={{
            position:'absolute',
          top: 0,
          width: '100%',
          height: '72px',
          borderBottom: '1px solid grey',
          backgroundColor: 'blue',
          display: 'flex',
          gap: '1300px',
          marginBottom: '24px',
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: 'left', padding: '18px', color: 'white' }}
        >
          Фильмы
        </Typography>
        <IconButton size="medium" sx={{ color: 'white' }} onClick={handleOpenLoginForm}>
          <AccountCircleIcon />
        </IconButton>
  
        <LoginForm
          open={isLoginFormOpen}
          handleClose={handleCloseLoginForm}
          onRequestToken={handleRequestToken}
        />
        <TokenForm
        open={isTokenFormOpen}
        handleClose={handleCloseTokenForm}
         
      />    
      </Box>
    );
  }


  export default Header;
