import aws from "aws-sdk";
import { format } from "date-fns";

export default async function handler(req, res) {
  // const extension = req.query.file.match(/\.[0-9a-z]+$/i)[0];
  const extension = `.${req.query.extension}`;
  const avantName = req.query.avant;
  const step = `step${req.query.step}`;
  const id = req.query.id;
  const date = format(new Date(), "MMdd");
  const year = format(new Date(), "yyyy");

  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME_1,
    Fields: {
      key: `${year}/${date}/${avantName}/${id}/${id}_${step}${extension}`,
    },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], // up to 1 MB
    ],
  });

  res.status(200).json(post);
}
