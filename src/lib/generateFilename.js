const generateFilename = (username, avantName, id) => {
  //最終の出力ファイル名
  const outputName = `${username}_${avantName}_${id}`;

  return {
    outputName,
  };
};

export { generateFilename };
