const API_KEY = process.env.API_KEY;

export default {
  fetchTrending: {
    title: 'Promo',
    url: `/trending/all/week?api_key=${API_KEY}&language=es-US`,
  },
  fetchTopRated: {
    title: 'Openers',
    url: `/movie/top_rated?api_key=${API_KEY}&language=es-US`,
  },
  fetchAction: {
    title: 'Video Displays',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchComedy: {
    title: 'Logo strings',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  },
  fetchHorror: {
    title: 'Titles',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  },
  fetchRomance: {
    title: 'InfoGraphics',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  },
  fetchMystery: {
    title: 'Elements',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
  },
  // fetchSciFi: {
  //   title: 'Transition',
  //   url: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  // },
  // fetchWestern: {
  //   title: 'Photos',
  //   url: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
  // },
  // fetchAnimation: {
  //   title: 'Memory',
  //   url: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  // },
  // fetchMystery: {
  //   title: 'Impact',
  //   url: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
  // },
};
