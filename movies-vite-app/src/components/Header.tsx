import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import RegistrationForm from './forms/RegistrationForm';
import LoginForm from './forms/LoginForm';
import { Button } from '@mui/material';
import { useState } from 'react';


const Header = () => {
    
    const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);
    const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  
    const handleOpenRegistrationForm = () => {
      setIsRegistrationFormOpen(true);
    };
  
    const handleCloseRegistrationForm = () => {
      setIsRegistrationFormOpen(false);
    };
  
    const handleOpenLoginForm = () => {      
      setIsLoginFormOpen(true);      
      handleCloseLoginForm();
    };

    const handleCloseLoginForm = () => {
        setIsLoginFormOpen(false);
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
          gap: '1100px',
          marginBottom: '24px',
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: 'left', padding: '18px', color: 'white' }}
        >
          Фильмы
        </Typography>

       <Box sx={{ display: 'flex', flexDirection: 'row' }}> {['Зарегестрироваться', 'Войти'].map((text, index) => (
    <Button key={index} onClick={index === 0 ? handleOpenRegistrationForm : handleOpenLoginForm} sx={{ color: 'white' }}>{text}</Button>
  ))}
       <IconButton size="medium" sx={{ color: 'white' }} >

          <AccountCircleIcon />
        </IconButton>
       </Box>

        <RegistrationForm
          open={isRegistrationFormOpen}
          handleClose={handleCloseRegistrationForm}
          onRequestToken={handleOpenLoginForm}
        />
        <LoginForm
        open={isLoginFormOpen}
        handleClose={handleCloseLoginForm}
         
      />    
      </Box>
    );
  }


  export default Header;
