import {Dialog, DialogActions, DialogContent, DialogTitle, Paper, Button, TextField} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {fetchAccountId, fetchAuth } from '../api';
import {setAccountId, setToken} from '../../store/reducer';

interface TokenFormProps {
  open: boolean;
  handleClose: () => void;
}

export default function LoginForm({ open, handleClose }: TokenFormProps) {
  const dispatch = useDispatch();
    const [enteredToken, setEnteredToken] = useState('');
            
    const fetchData = async () => {
      const data = await fetchAccountId(enteredToken);
      const account_id = data.id;
      dispatch(setAccountId(account_id));
      dispatch(setToken(enteredToken));
      };        
  
    const handleSubmit = () => {
          
        handleClose(); 
        fetchData();                
    };
  
    return (
      <Paper> 
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth={true}>
        <DialogTitle>Введите токен</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="token"
            label="Токен"
            type="text"
            fullWidth
            variant="standard"
            value={enteredToken}
            onChange={(e) => setEnteredToken(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit}>ОК</Button>
        </DialogActions>
      </Dialog>
      </Paper> 
    );
  }