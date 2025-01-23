import { useState, useEffect } from 'react';
import {
  fetchMovieDetails, fetchMovieDirector,
} from './api';
import { Typography, Box, Card, CardMedia, IconButton, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Movie } from './constants';
import { RootState } from '../store/reducer';
import { useSelector } from 'react-redux';
import StarBorderIcon from '@mui/icons-material/StarBorder';


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
    return <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      width: 'auto',
      height: '90vh',
      zIndex: '9999'
    }}>
      <Box sx={{
        bgcolor: '#1976D2',
        position: 'absolute',
        padding: '12px',
        borderRadius: '5px',
      }}>
        Загрузка...
      </Box>
    </Box>;
  }

  return (
    <Box sx={{
      display: 'flex',
      boxSizing: 'border-box',
      width: 'auto',
      height: '777px',
      padding: '24px',
      gap: '24px',
    }}>
      <Card sx={{
        width: '300px',
        height: '402px',
      }}>
        <CardMedia
          component="img"
          alt="image"
          height="402px"
          width="300px"
          image={movie?.poster_path}
        />
      </Card>
      <Paper elevation={8} sx={{ width: '1200px', height: 'fit-content' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h3" component="h3">{movie?.title}</Typography>
          <IconButton>
            <StarBorderIcon />
          </IconButton>
        </Box>
        <Box sx={{ height: 'fit-content', width: 'auto' }}>
          <Typography variant="h4" component="h4" sx={{ padding: '24px' }}>Детали</Typography>
          <Box sx={{ padding: '12px 24px' }}>
            <Typography variant="body2" gutterBottom>Режиссер: {director}</Typography>
            <Typography variant="body2" gutterBottom>Год: {new Date(movie.year).getFullYear()}</Typography>
            <Typography variant="body2" gutterBottom>Жанр: {genresList}</Typography>
            <Typography variant="body2" gutterBottom>Время: {movie.duration} минут</Typography>
            <Typography variant="body2" gutterBottom>Отзывы: {movie.reviews.length} отзывов</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};


export default MovieDetails  