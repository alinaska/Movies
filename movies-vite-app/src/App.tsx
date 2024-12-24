import Filters from './components/Filters'
import Header from './components/Header'
import './App.css'
import MovieList from './components/MovieList';
import MovieDetailsPage from './components/MovieDetailsPage';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {RootState} from './store/reducer';

const App = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const isRegistered = Boolean(token);

  return (
      <BrowserRouter basename="/"> 
          <>
              <Header />
              {isRegistered ? (
                  <Box component="div" display="flex" gap="10px" marginTop="80px" marginLeft="40px" padding="20px">
                      <Routes>
                          <Route path="/" element={<> <Filters /><MovieList /></>} />
                          <Route path="/movies/:id" element={<MovieDetailsPage />} />
                      </Routes>
                  </Box>
              ) : (
                  <></> 
              )}
          </>
      </BrowserRouter>
  );
};



export default App
