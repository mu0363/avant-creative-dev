import { scenes } from 'src/data/redux-store';

export default function Sandbox() {
  const id = scenes.find((scene) => scene.id === 1);
  console.log(id);

  return (
    <div>
      <h1>sandbox</h1>
    </div>
  );
}
