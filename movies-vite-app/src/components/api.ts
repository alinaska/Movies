import { url, registrationEndpoint, authEndpoint, genreEndpoint, Genre, fimsEndpoint, Movie,  } from "./constants";


export const fetchRegister = async (email: string,  username: string,  password: string) => {

  const apiUrl = `${url}${registrationEndpoint}`;
  const userData = {     
    email,
    username,
    password,
};
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
      Accept: 'application/json',     
    },
    body: JSON.stringify(userData),
    };  
  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    return data;    
  } 
  catch (error) {
    console.error(error);
    return []; 
  }
};

export const requestToLogin = async (email: string, password: string) => {
  const apiUrl = `${url}${authEndpoint}`;
  const userData = {     
    email,   
    password,
};
  const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        Accept: 'application/json',
          
      },
      body: JSON.stringify(userData)
  };
  try {
      const response = await fetch(apiUrl, options);
      const data = await response.text();      
    return data;
    
  } catch (error) {
      console.error(error);      
  };
};

export const fetchGenres = async (token: string): Promise<Genre[]> => {
  const apiUrl = `${url}${genreEndpoint}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) ) {
        throw new Error("Сервер вернул не массив!");
    }

    const genres = data.filter(item => 
      item.genre !== undefined && typeof item.genre === 'string' && item._id !== undefined && typeof item._id === 'string' && item.__v !== undefined && typeof item.__v === 'number' )

    return genres;

  } catch (error) {
    console.error('Ошибка при получении жанров:', error);
    return [];
  }
};


export const fetchFilms = async (token: string): Promise<Movie[]> =>{
  const apiUrl = `${url}${fimsEndpoint}`;  
 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
  };
  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    return data;    
  } 
  catch (error) {
    console.error(error);
    return []; 
  }}  


 export const fetchMovieDetails = async(id: string | undefined, token: string) => {
  const movieDetailsEndpoint = `/movie/${id}/film`
  const apiUrl = `${url}${movieDetailsEndpoint}`;
    
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    return data;    
  } 
  catch (error) {
    console.error(error);
    return []; 
  }
  }

export const fetchMovieDirector = async (id: string | undefined, token: string) => {
   const directorEndpoint= `/director/${id}`
   const apiUrl = `${url}${directorEndpoint}`;
    const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
    };
  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    return data;   
  } 
  catch (error) {
    console.error(error);
    return []; 
  }
  }

  
  
  export const fetchGetFavorites = async (page: number, token: string, account_id: number | null)=> {
   
    const url = `https://api.themoviedb.org/3/account/${account_id}/favorite/movies?language=ru&page=${page}&sort_by=created_at.asc`;
    const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
    };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;   
  } 
  catch (error) {
    console.error(error);
    return []; 
  }
  }


  export const fetchAddToFavorites = async (token: string, account_id: number | null, movie_id: string) => {
   
    const url = `https://api.themoviedb.org/3/account/${account_id}/favorite`;
    const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ media_type: "movie", media_id: movie_id, favorite: true }),
     };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;   
  } 
  catch (error) {
    console.error(error);
    throw error; 
  }
  }


  export const fetchRemoveFromFavorites = async (token: string, account_id: number | null, movie_id: string) => {
   
    const url = `https://api.themoviedb.org/3/account/${account_id}/favorite`;
    const options = {
        method: 'POST', 
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ media_type: "movie", media_id: movie_id, favorite: false }), 
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;   
    } 
    catch (error) {
        console.error(error);
        throw error; 
    }
}


export const fetchSearch = async(token: string,  encodedText: string) => {
   
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodedText}&include_adult=false&language=ru&page=1`;
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
          Authorization: `Bearer ${token}` 
      },
  };
  try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;   
  } 
  catch (error) {
      console.error(error);
      throw error; 
  }
}
