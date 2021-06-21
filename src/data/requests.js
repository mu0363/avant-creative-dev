const API_KEY = process.env.API_KEY;

export default {
  fetchPromo: {
    title: "Promo",
    url: `/trending/all/week?api_key=${API_KEY}&language=es-US`,
  },
  fetchOpeners: {
    title: "Openers",
    url: `/movie/top_rated?api_key=${API_KEY}&language=es-US`,
  },
  fetchDisplays: {
    title: "Displays",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchLogos: {
    title: "Logos",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  },
  fetchTitles: {
    title: "Titles",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  },
  fetchInfoGraphics: {
    title: "InfoGraphics",
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  },
  fetchElements: {
    title: "Elements",
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
