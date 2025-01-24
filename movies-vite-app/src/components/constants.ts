export const url = 'https://lab.strada.one'
export const registrationEndpoint = '/user/registration'
export const authEndpoint = '/auth/login'
export const genreEndpoint = '/genre'
export const fimsEndpoint = '/movie/films'

export const initialSort = 'popular';
export interface Genre {
    _id: string; 
    genre: string; 
    __v: number;
}
export interface Movie {
    director: [];
    duration: number;
    genre: [];
    reviews: [];   
    title: string;
    overview: string;
    year: number;
    __v: number;
    _id: string;
    poster_path: string;
  }

  