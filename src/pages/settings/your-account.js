import { Fragment, useState } from "react";
import { doka } from "doka/doka.module.css";
import { DokaImageEditorModal } from "react-doka";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { UserIcon } from "@heroicons/react/solid";

import { useAuth } from "src/lib/auth";
import { uploadAvatarImage } from "src/lib/uploadAvatarImage";

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
        <label className="cursor-pointer">
          {auth.user?.photoURL ? (
            <img src={auth.user?.photoURL} alt="user-image" className="h-10 rounded-full mr-2" />
          ) : (
            <UserIcon className="h-10 bg-gray-200 text-gray-400 rounded-full p-1 mr-2 relative" />
          )}
          <input type="file" name="avatar-upload" accept="image/*" className="hidden" onChange={onChangeImageHandler} />
        </label>
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
            const url = await uploadAvatarImage(dest);
            await auth.updatePhotoURL(url);
            router.reload();
          }}
          imageCropAspectRatio={1 / 1}
        />
      )}
    </div>
  );
}
