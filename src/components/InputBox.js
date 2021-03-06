import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addImages, addTexts, addPreviewImage } from "src/features/scenes/scenesSlice";
import { doka } from "doka/doka.module.css";
import { DokaImageEditorModal } from "react-doka";
import { useDropzone } from "react-dropzone";
import { CloudUploadIcon } from "@heroicons/react/outline";

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

export const InputBox = (props) => {
  const { step, stepNumber, currentIndex, register, errors } = props;

  //redux
  const dispatch = useDispatch();

  //doka modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalResult, setModalResult] = useState("");
  // 騙されないで！！modalDataが本体よ！！
  const [modalData, setModalData] = useState("");
  const [preview, setPreview] = useState(null);
  //ファイルがD&Dされたら発動! 画像表示するよ
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setModalVisible(true);
  }, []);

  //react dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="m-2">
      {step.checkImage && (
        <div
          {...getRootProps()}
          className={`bg-white border-gray-300 cursor-pointer border border-dashed outline-none ${
            isDragActive && "border-green-400"
          } ${modalResult && "border"}`}
        >
          <input {...getInputProps()} />
          <div>
            {modalResult.length ? (
              <img className="object-contain p-1" src={modalResult} alt="preview" />
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-gray-400">Upload your Image</p>
                <CloudUploadIcon className="h-8 mt-4 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      )}
      <input
        type="text"
        placeholder="Type your text here"
        className="bg-gray-100 py-2 px-3 rounded-md focus:outline-none w-full box-border mt-4 mb-2 text-base"
        maxLength="15"
        {...register(`text${stepNumber}`, {
          required: "This is required",
          minLength: { value: step.minLength, message: "This need to be at least 4 characters" },
          maxLength: { value: step.maxLength, message: "Max length exceeded" },
        })}
      />
      {errors[`text${stepNumber}`] ? (
        <p className="pl-3 text-ai font-semibold">{errors[`text${stepNumber}`].message}</p>
      ) : (
        <div className="h-5"></div>
      )}
      {/* Modal */}
      {modalVisible && (
        <DokaImageEditorModal
          {...editorDefaults}
          className={doka}
          src={preview}
          // onLoad={(res) => console.log('load modal image', res)}
          onHide={() => setModalVisible(false)}
          onProcess={({ dest }) => {
            setModalData(dest);
            setModalResult(URL.createObjectURL(dest));
            const localImageUrl = window.URL.createObjectURL(dest);
            dispatch(addImages({ id: currentIndex + 1, [`image${stepNumber}`]: localImageUrl }));
            dispatch(addPreviewImage({ id: currentIndex + 1, [`image${stepNumber}`]: localImageUrl }));
          }}
          imageCropAspectRatio={16 / 9}
        />
      )}
    </div>
  );
};
