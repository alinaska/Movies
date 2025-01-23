import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import RegistrationForm from '../forms/RegistrationForm';
import LoginForm from '../forms/LoginForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';


const Header = () => {

  const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  const handleOpenRegistrationForm = () => {
    setIsRegistrationFormOpen(true);
  };

  const handleCloseRegistrationForm = () => {
    setIsRegistrationFormOpen(false);
  };

  const handleOpenLoginForm = () => {
    setIsLoginFormOpen(true);

  };

  const handleCloseLoginForm = () => {
    setIsLogined(true);
    setIsLoginFormOpen(false);
  };

  return (
    <AppBar position='static' sx={{ marginBottom: '12px' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ textAlign: 'left', padding: '18px', color: 'white', flexGrow: 1, }}>
          Фильмы
        </Typography>
        <Stack>
          {isLogined ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '72px' }}>
              <IconButton size="medium" sx={{ color: 'white', width: '32px', height: '32px' }} >
                <AccountCircleIcon sx={{ width: '32px', height: '32px' }}/>
              </IconButton>
            </Box>
          ) : (
            <Box>
              {
                ['Зарегестрироваться', 'Войти'].map((text, index) => (
                  <Button key={index} onClick={index === 0 ? handleOpenRegistrationForm : handleOpenLoginForm} sx={{ color: 'white' }}>{text}</Button>
                ))
              }
            </Box>
          )}
          <RegistrationForm
            open={isRegistrationFormOpen}
            handleClose={handleCloseRegistrationForm}
            onRequestToken={handleOpenLoginForm}
          />
          <LoginForm
            open={isLoginFormOpen}
            handleClose={handleCloseLoginForm}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}


export default Header;
