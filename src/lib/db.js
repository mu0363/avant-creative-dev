import { db } from 'src/lib/firebase';
import { format } from 'date-fns';

export const getAllPreviewVideos = async () => {
  const previewVideos = [];
  const snapshot = await db.collection('preview-videos').get();
  snapshot.forEach((doc) => {
    previewVideos.push({
      id: doc.id,
      createdAt: format(doc.data().createdAt.toDate(), 'yyyy/MM/dd'),
      name: doc.data().name,
      videoSrc: doc.data().videoSrc,
      thumbnail: doc.data().thumbnail,
      length: doc.data().length,
      resolution: doc.data().resolution,
    });
  });

  return previewVideos;
};
