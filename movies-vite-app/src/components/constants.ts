export const url = 'https://lab.strada.one'
export const registrationEndpoint = '/user/registration'
export const authEndpoint = '/auth/login'
export const genreEndpoint = '/genre'
export const initialSort = 'popular';
export interface Genre {
    _id: string; 
    genre: string; 
    __v: number;
}
export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  