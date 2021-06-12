import { v4 as uuidv4 } from 'uuid';

//uuidでユニークなファイル名作成
const generateFilename = (username, template) => {
  const uuidName = uuidv4().split('-').join('');
  //最終の出力ファイル名
  const outputName = `${username}_${template}_${uuidName}`;

  return {
    outputName,
  };
};

export { generateFilename };
