import {
  Paper,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  CardHeader,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useEffect } from "react";
import { Movie } from "./constants";
import {
  setSearchActive,
  setMovies,
  setFavorites,
  setTotalPages,
  setErrorMessage,
} from "../store/reducer";
import {
  fetchFilms,
  fetchGetFavorites,
  fetchAddToFavorites,
  fetchRemoveFromFavorites,
  fetchSearch,
} from "./api";
import { Link } from "react-router-dom";
import { RootState } from "../store/reducer";
import { useSelector, useDispatch } from "react-redux";

const MovieList = () => {
  const { sort, searchText, isSearchActive } = useSelector(
    (state: RootState) => state.filters
  );
  const { token, account_id } = useSelector((state: RootState) => state.user);
  const { movies, favorites, errorMessage } = useSelector(
    (state: RootState) => state.films
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await fetchGetFavorites(1, token, account_id);
        dispatch(setFavorites(favoritesData.results));
      } catch (error) {
        console.error("Ошибка при получении избранных фильмов:", error);
      }
    };
    if (token && account_id) {
      fetchFavorites();
    }
  }, [token, account_id]);

  const showSearchedMovie = async () => {
    const encodedText = encodeURIComponent(searchText);
    const data = await fetchSearch(token, encodedText);
    dispatch(setMovies(data.results));
    dispatch(setSearchActive(false));
  };

  useEffect(() => {
    if (isSearchActive) {
      showSearchedMovie();
    }
  }, [isSearchActive]);

  const addToFavorites = async (movie: Movie) => {
    dispatch(setFavorites([...favorites, movie]));
    try {
      const success = await fetchAddToFavorites(token, account_id, movie._id);
      if (success) {
        dispatch(setErrorMessage({ [movie._id]: "" }));
      }
    } catch (error) {
      dispatch(
        setFavorites(favorites.filter((favorite) => favorite !== movie))
      );
      console.error(
        `Ошибка при добавлении фильма "${movie.title}" в избранное:`,
        error
      );
      dispatch(setErrorMessage({ [movie._id]: "Ошибка. Попробуйте еще раз." }));
    }
  };

  const removeFromFavorites = async (movie: Movie) => {
    try {
      await fetchRemoveFromFavorites(token, account_id, movie._id);
      dispatch(
        setFavorites(favorites.filter((favorite) => favorite._id !== movie._id))
      );
    } catch (error) {
      console.error("Ошибка при удалении из избранного:", error);
    }
  };

  const isMovieFavorite = (movie: Movie) => {
    return favorites.some((favorite) => favorite._id === movie._id);
  };

  const fetchMovies = async (sort: string) => {
    try {
      let fetchFunction = null;

      if (sort === "popular") {
        fetchFunction = fetchFilms;
      } else if (sort === "top-rated") {
        fetchFunction = fetchFilms;
      } else if (sort === "favorite") {
        fetchFunction = fetchFilms;
      }

      if (fetchFunction) {
        const data = await fetchFunction(token);
        dispatch(setTotalPages(data.length));
        console.log(data);
        dispatch(setMovies(data));
      }
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const handleIconButtonClick = (movie: Movie) => {
    if (isMovieFavorite(movie)) {
      removeFromFavorites(movie);
    } else {
      addToFavorites(movie);
    }
  };

  useEffect(() => {
    fetchMovies(sort);
  }, [sort]);

  return (
    <Paper sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      maxWidth: '1050px',
      height: "max-content",
      gap: "16px",
      padding: "12px",
      backgroundColor: 'rgba(255, 255, 255, 0.91)',
    }}>
    {movies && movies.map((movie) => (
        <Card
          key={movie._id}
          sx={{
            width: "245px",
            maxHeight: "400px",
            marginTop: "10px",
            maxWidth: { xs: "95%", sm: "85%", md: "45%", lg: "100%" },
          }}
        >
          <CardMedia
            component="img"
            alt={movie.title}
            height="240"
            width="296"
            image={movie.poster_path}
            sx={{ backgroundSize: 'contain' }}
          />
          <Link
            to={`/movies/${movie._id}`}
            key={movie._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CardHeader
              title={movie.title}
              subheader={`Год: ${movie.year}`}
              titleTypographyProps={{
                variant: "h6",
              }}
              subheaderTypographyProps={{
                variant: "body2",
              }}
            />
          </Link>
          <CardActions>
            <IconButton
              size="small"
              onClick={() => handleIconButtonClick(movie)}
            >
              <StarIcon
                color={isMovieFavorite(movie) ? "warning" : "inherit"}
              />
            </IconButton>
            {errorMessage[movie._id] && (
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "-70%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(255, 165, 0, 0.8)",
                  padding: "2px 8px",
                  zIndex: 100,
                }}
              >
                {errorMessage[movie._id]}
              </Typography>
            )}
          </CardActions>
        </Card>
      ))}
    </Paper>
  );
};

export default MovieList;
