import { useState, useEffect } from 'react';
import {fetchMovieDetails, fetchMovieCast } from './api';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {RootState} from '../store/reducer';

interface MovieDetails {
adult: boolean;
backdrop_path: string;
belongs_to_collection: {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};
budget: number;
genres: {
  id: number;
  name: string;
}[];
homepage: string;
id: number;
imdb_id: string;
origin_country: string[];
original_language: string;
original_title: string;
overview: string;
popularity: number;
poster_path: string;
production_companies: {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}[];
production_countries: {
  iso_3166_1: string;
  name: string;
}[];
release_date: string;
revenue: number;
runtime: number;
spoken_languages: {
  english_name: string;
  iso_639_1: string;
  name: string;
}[];
status: string;
tagline: string;
title: string;
video: boolean;
vote_average: number;
vote_count: number;
}
interface MovieCast {
adult: boolean;
gender: number;
id: number;
known_for_department: string;
name: string;
original_name: string;
popularity: number;
profile_path: string;
cast_id: number;
character: string;
credit_id: string;
order: number;
job: string;
} 
  
const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [cast, setCast] = useState<MovieCast[]>([]);
    const [producer, setProducer] = useState<any>(null); 
    const [writer, setWriter] = useState<any>(null);
    
  const { token } = useSelector((state: RootState) => state.user);    
     
  const fetchData = async () => {
        try {
          const movieData = await fetchMovieDetails(parseInt(id!, 10), token);
          setMovie(movieData);
          
          const { cast: castData, crew: crewData } = await fetchMovieCast(parseInt(id!, 10), token) as { cast: MovieCast[], crew: any[] };; 
          setCast(castData.filter((member) => member.known_for_department === 'Acting'));
          const producer = crewData.find((member) => member.job === 'Producer');
          const writer = crewData.find((member) => member.job === 'Writer');
          setProducer(producer);
          setWriter(writer);
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
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
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
          Страна: {movie.production_countries.map((country) => country.name).join(', ')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Год: {new Date(movie.release_date).getFullYear()}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Жанр: {movie.genres.map((genre) => genre.name).join(', ')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Режиссер: {producer?.name || 'Информация отсутствует'}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Сценарий: {writer?.name || 'Информация отсутствует'}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Бюджет: {movie.budget !== 0 ? `${movie.budget}$` : 'Информация отсутствует'} 
        </Typography>
        <Typography variant="body2" gutterBottom>
          Зрители: {movie.vote_count} млн
        </Typography>
        <Typography variant="body2" gutterBottom>
          Время: {movie.runtime} минут
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>Актеры</Typography>
        <Typography variant="body2" gutterBottom>
        {cast.filter((actor) => actor.known_for_department === 'Acting').map((actor) => (
  <span key={actor.id}>{actor.name}, </span>))}
        </Typography>
      </Box>
      <Typography variant="h6" gutterBottom>Описание</Typography>
      <Typography variant="body1" gutterBottom>{movie.overview}</Typography>
    </Box>
      </Box>
    );
  };
    

    export default MovieDetails  