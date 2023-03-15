const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
	top: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	sf: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=878`,
	drama: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=18`,
	fantasy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=14`,
	thriller: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=53`,
	animation: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=16`,
};

export default requests;
