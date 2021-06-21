import { scenes } from "src/data/redux-store";

export default function Sandbox() {
  const newData = { id: 1, text1: "すまない" };
  scenes.map((scene) => {
    if (scene.id === newData.id) {
      Object.assign(scene, newData);
    }
  });
  console.log(scenes);

  return (
    <div>
      <h1>sandbox</h1>
    </div>
  );
}
