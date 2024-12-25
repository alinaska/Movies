import { url, registrationEndpoint, authEndpoint } from "./constants";


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

export const fetchAuth = async (email: string) => {

  const apiUrl = `${url}${authEndpoint}`;
  const linkData = {
    email,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',      
    },
    body: JSON.stringify(linkData),
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

export const fetchGenres = async (token: string) => {

    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=ru';
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
      return data.genres;    
    } 
    catch (error) {
      console.error(error);
      return []; 
    }
  };

export const fetchTopRated = async (page: number, token: string) =>{
  
 const url = `https://api.themoviedb.org/3/movie/top_rated?language=ru&page=${page}`;
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
  }}
  
export const fetchPopular = async(page: number, token: string) =>{
  
  const url = `https://api.themoviedb.org/3/movie/popular?language=ru&page=${page}`;
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

 export const fetchMovieDetails = async(id: number, token: string) => {
    
    const url = `https://api.themoviedb.org/3/movie/${id}?language=ru`;
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

export const fetchMovieCast = async (id: number, token: string) => {
   
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=ru`;
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
    return { cast: data.cast, crew: data.crew };   
  } 
  catch (error) {
    console.error(error);
    return { cast: [], crew: [] }; 
  }
  }


  export const fetchAccountId = async (token: string) => {
   
    const url = `https://api.themoviedb.org/3/account/account_id`;
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


  export const fetchAddToFavorites = async (token: string, account_id: number | null, movie_id: number) => {
   
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


  export const fetchRemoveFromFavorites = async (token: string, account_id: number | null, movie_id: number) => {
   
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
