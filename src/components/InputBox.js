import React, { useCallback, useState, useRef } from 'react';
import { doka } from 'doka/doka.module.css';
import { DokaImageEditorModal } from 'react-doka';
import { useDropzone } from 'react-dropzone';
import { CloudUploadIcon } from '@heroicons/react/outline';

// doka
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
} from 'doka';

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

const editorDefaults = {
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  ...plugin_crop_defaults,
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

export const InputBox = () => {
  const inputRef = useRef(null);
  // modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalResult, setModalResult] = useState('');
  const [preview, setPreview] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setModalVisible(true);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <div className="m-2">
      <div
        {...getRootProps()}
        style={{ width: '340px', height: '193px' }}
        className={`bg-white border-gray-300 cursor-pointer border border-dashed outline-none ${
          isDragActive && 'border-green-400'
        } ${modalResult && 'border'}`}
      >
        <input {...getInputProps()} />
        <div>
          {modalResult.length ? (
            <div>
              <img
                style={{ width: '340px', height: '193px' }}
                className="object-contain p-1"
                src={modalResult}
                alt="preview"
              />
            </div>
          ) : (
            <div style={{ width: '340px', height: '193px' }} className="flex flex-col items-center justify-center">
              <p className="text-gray-400">Drag and Drop a Image here</p>
              <CloudUploadIcon className="h-6 mt-4 text-gray-400" />
            </div>
          )}
        </div>
      </div>
      <input
        type="text"
        placeholder="Type your text here"
        className="bg-gray-100 py-2 px-6 rounded-full focus:outline-none w-full box-border mt-4 mb-2"
        ref={inputRef}
      />

      {/* Modal */}
      {modalVisible && (
        <DokaImageEditorModal
          {...editorDefaults}
          className={doka}
          src={preview}
          onLoad={(res) => console.log('load modal image', res)}
          onHide={() => setModalVisible(false)}
          onProcess={({ dest }) => setModalResult(URL.createObjectURL(dest))}
          imageCropAspectRatio={16 / 9}
        />
      )}
    </div>
  );
};
