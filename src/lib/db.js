import { db } from "src/lib/firebase";
export const getAllPreviewVideos = async () => {
  const previewVideos = [];
  const snapshot = await db.collection("preview-videos").get();
  snapshot.forEach((doc) => {
    previewVideos.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return previewVideos;
};

export const getPreviewVideo = async (id) => {
  const previewVideo = [];
  const snapshot = await db.collection("preview-videos").where("previewId", "==", id).get();
  snapshot.forEach((doc) => {
    previewVideo.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return previewVideo;
};

export const getAllVideos = async () => {
  const allVideos = [];
  const snapshot = await db.collection("videos").get();
  snapshot.forEach((doc) => {
    allVideos.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return allVideos;
};
