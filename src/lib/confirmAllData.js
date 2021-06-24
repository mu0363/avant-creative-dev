import { sortArray } from "src/lib/sortArray";

export const confirmAllData = (texts, images) => {
  //順番をid順にsortして
  const sortedTexts = sortArray(texts);
  const sortedImages = sortArray(images);

  return sortedTexts.map((text) => {
    let spreadData = {};
    sortedImages.map((image) => {
      if (image.id === text.id) {
        spreadData = { ...image, ...text };
      }
    });
    return spreadData;
  });
};
