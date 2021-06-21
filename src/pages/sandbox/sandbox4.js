import { images } from "src/data/images";

export default function Sandbox4() {
  console.log(images);
  images.sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    } else {
      return -1;
    }
  });
  console.log(images);
  return (
    <div>
      <h1>images</h1>
    </div>
  );
}
