import { useState } from "react";

import { doka } from "doka/doka.module.css";
import { DokaImageEditorModal } from "react-doka";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { UserIcon, CameraIcon } from "@heroicons/react/solid";

import { useAuth } from "src/lib/auth";
import { uploadAvatarImage, deleteAvatarImage } from "src/lib/storage";

//dokaのNext.jsサンプルから持ってきたやーつ
import {
  // editor
  locale_en_gb,
  createDefaultImageReader,
  createDefaultImageWriter,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_crop_defaults,
  plugin_finetune,
  plugin_finetune_locale_en_gb,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_locale_en_gb,
  plugin_filter_defaults,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,
} from "doka";
setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);
const editorDefaults = {
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  // ↓crop縦横比を変更できる機能を無効化
  // ...plugin_crop_defaults,
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  ...markup_editor_defaults,
  locale: {
    ...locale_en_gb,
    ...plugin_crop_locale_en_gb,
    ...plugin_finetune_locale_en_gb,
    ...plugin_filter_locale_en_gb,
    ...plugin_annotate_locale_en_gb,
    ...markup_editor_locale_en_gb,
  },
};

export default function YourAccount() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setPreview(e.target.files[0]);
      setModalVisible(true);
      e.target.value = "";
    }
  };

  //doka modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalResult, setModalResult] = useState("");
  // 騙されないで！！modalDataが本体よ！！
  const [modalData, setModalData] = useState("");
  const [preview, setPreview] = useState(null);

  return (
    <div>
      <div>
        <label className="inline-block cursor-pointer">
          {auth.user?.photoURL ? (
            <div>
              <img src={auth.user?.photoURL} alt="user-image" className="mr-2 h-32 rounded-full" />
              <CameraIcon className="absolute top-0 left-0 p-8 h-32 text-gray-500 hover:bg-gray-200 rounded-full opacity-0 hover:opacity-70 transition duration-200 ease-in-out" />
            </div>
          ) : (
            <UserIcon className="relative p-1 mr-2 h-32 text-gray-400 bg-gray-200 rounded-full" />
          )}
          <input type="file" name="avatar-upload" accept="image/*" className="hidden" onChange={onChangeImageHandler} />
        </label>
        <span className="text-xs text-gray-500 hover:text-ai underline cursor-pointer" onClick={() => router.push("/")}>
          ← Back to Top
        </span>
        <p>{auth.user?.photoURL}</p>
      </div>

      {/* Modal */}
      {modalVisible && (
        <DokaImageEditorModal
          {...editorDefaults}
          className={doka}
          src={preview}
          // onLoad={(res) => console.log('load modal image', res)}
          onHide={() => setModalVisible(false)}
          onProcess={async ({ dest }) => {
            await deleteAvatarImage();
            const url = await uploadAvatarImage(dest);
            await auth.updatePhotoURL(url);

            // router.reload();
          }}
          imageCropAspectRatio={1 / 1}
        />
      )}
    </div>
  );
}
