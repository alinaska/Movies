import {Dialog, DialogActions, DialogContent, DialogTitle, Paper, Button, TextField} from '@mui/material';
import { useState } from 'react';
import { fetchRegister } from '../api';

interface RegistrationFormProps {
  open: boolean;
  handleClose: () => void;
  onRequestToken: (email: string) => void;
}

function RegistrationForm (
 { open,
  handleClose,
  onRequestToken,}
: RegistrationFormProps)  {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  

  const fetchRegistration = async () => { 
    
    setError(null);     
    try {
      await fetchRegister(email, username, password);        
    } catch (error: any) {
      console.error('Ошибка при регистрации:', error);
      setError(error.message);
    }
    
  };    

  
  const handleRegister = () => {
    fetchRegistration(); 
    onRequestToken(email);
    handleClose();        
  };
  

  return (
    <Paper>
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Регистрация</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Почта"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Имя"
          type="text"
          fullWidth
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Пароль"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleRegister} >Зарегестрироваться</Button>
        
      </DialogActions>
    </Dialog>
    </Paper>
  );
};

export default RegistrationForm;