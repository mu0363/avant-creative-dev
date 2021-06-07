import { db } from "src/lib/firebase";
import { format } from "date-fns";

export const getAllPreviewVideos = async () => {
    const previewVideos = [];
    const snapshot = await db.collection("preview-videos").get();
    snapshot.forEach((doc) => {
        previewVideos.push({
            id: doc.id,
            createdAt: format(doc.data().createdAt.toDate(), "yyyy/MM/dd"),
            name: doc.data().name,
            videoSrc: doc.data().videoSrc,
            thumbnail: doc.data().thumbnail,
            length: doc.data().length,
            resolution: doc.data().resolution,
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
            createdAt: format(doc.data().createdAt.toDate(), "yyyy/MM/dd"),
            name: doc.data().name,
            videoSrc: doc.data().videoSrc,
            thumbnail: doc.data().thumbnail,
            length: doc.data().length,
            resolution: doc.data().resolution,
            previewSteps: doc.data().previewSteps,
        });
    });

    return previewVideo;
};
