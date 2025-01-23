import { Dialog, DialogActions, DialogContent, DialogTitle, Paper, Button, TextField } from '@mui/material';
import { requestToLogin } from '../api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/reducer';

export interface LoginFormProps {
    open: boolean;
    handleClose: () => void;
};

export default function LoginForm ({ open, handleClose }: LoginFormProps)  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const data = await requestToLogin(email, password);
    if (data) {      
      dispatch(setToken(data));
    } else {      
      console.error("Ошибка авторизации: токен не получен.");      
    }
    handleClose()
  };

  return (
    <Paper>
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth={true}>
            <DialogTitle sx={{
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                Войти
            </DialogTitle>
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
                <Button onClick={handleSubmit}>Войти</Button>
            </DialogActions>
        </Dialog>
    </Paper>
  );
};