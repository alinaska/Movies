import { useState, useEffect } from 'react';
import {fetchMovieDetails, fetchMovieDirector,
 } from './api';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Movie } from './constants';
import {RootState} from '../store/reducer';
import { useSelector } from 'react-redux';

  
const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);    
    const [director, setDirector] = useState<any>(null); 
    const [genresList, setgenresList] = useState<any>(null); 
    
  const { genres } = useSelector((state: RootState) => state.filters);    
  const { token } = useSelector((state: RootState) => state.user);    
     
  const fetchData = async () => {
        try {
          const movieData = await fetchMovieDetails(id, token);
          setMovie(movieData);
          const filmGenreIds: string[] = movieData.genre
          const genreNames = filmGenreIds.map(genreId => {
            const genre = genres.find(genre => genre._id === genreId);
            return genre ? genre.genre : "Неизвестный жанр";
          }).filter(name => name !== "Неизвестный жанр");
          const displayedGenreNames = genreNames.join(', ') || "Жанры не указаны";
          setgenresList(displayedGenreNames)
          
          const director = await fetchMovieDirector(movieData.director, token);           
          setDirector(director.name)
        } catch (error) {
          console.error('Ошибка при получении деталей фильма:', error);
        }
      };
  
  useEffect(() => {    
      fetchData();
    }, [id]);
  
    if (!movie) {
      return <div>Загрузка...</div>; 
    }
  
  return (
  <Box className="movie-details-page" 
        position='relative'>
      <Box 
          flex={1}
          position='absolute'
          top={20}
          left={0}>
        <img
            src={`https://image.tmdb.org/t/p/w342`} 
            alt={movie.title}              
            />
      </Box>
    <Box 
      flex={2}
      position='absolute'
      top={20}
      left={370}> 
      <Typography variant="h4" gutterBottom>{movie.title}</Typography>
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>Детали</Typography>
        <Typography variant="body2" gutterBottom>
          Ружиссер: {director}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Год: {new Date(movie.year).getFullYear()}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Жанр: {genresList}
        </Typography>
        
        <Typography variant="body2" gutterBottom>
          Время: {movie.duration} минут
        </Typography>
        <Typography variant="body2" gutterBottom>
          Отзывы: {movie.reviews.length} отзывов
        </Typography>
      </Box>
      
    </Box>
      </Box>
    );
  };
    

    export default MovieDetails  