export const sortArray = (obj) => {
  //順番をid順にsortして
  return obj.slice().sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    } else {
      return -1;
    }
  });
  // obj.slice().sort((a, b) => (a.id > b.id ? 1 : -1));
};
