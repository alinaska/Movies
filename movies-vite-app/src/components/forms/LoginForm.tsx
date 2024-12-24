import {Dialog, DialogActions, DialogContent, DialogTitle, Paper, Button, TextField} from '@mui/material';
import { useState } from 'react'

interface LoginFormProps {
  open: boolean;
  handleClose: () => void;
  onRequestToken: (email: string) => void;
}

function LoginForm (
 { open,
  handleClose,
  onRequestToken,}
: LoginFormProps)  {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    onRequestToken(email);
    handleClose();
  };

  return (
    <Paper>
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Запросить токен</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSubmit}>Запросить</Button>
      </DialogActions>
    </Dialog>
    </Paper>
  );
};

export default LoginForm;