import { GoogleSpreadsheet } from "google-spreadsheet";

const SHEET_TITLE = "streaming";
const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_SPREADSHEET_ID);

export const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[SHEET_TITLE];
    await sheet.addRow(row);
    console.log("Added data to spreadsheet successfully!!");
  } catch (error) {
    console.error("Error: ", error);
  }
};

//参考URL
//https://github.com/theoephraim/node-google-spreadsheet
//https://stackoverflow.com/questions/66720347/module-not-found-cant-resolve-child-process-google-spreadsheet
//https://dev.to/calvinpak/how-to-read-write-google-sheets-with-react-193l
//https://www.npmjs.com/package/google-spreadsheet

//-------------------重要!!!!!!!!!!!-----------------------//
//必ずchild_processエラーが出るのでnext.config.jsを書き換える！！
//https://qiita.com/Tak-Iwamoto/items/213e3cfb41949636f488
//でもauthのやつをフロントで呼び出すのはどうなの??NEXT_PUBLICにprivate_keyぶっ込んでるし...
// module.exports = {
//   webpack: config => {
//     config.node = {
//       fs: 'empty',
//       child_process: 'empty',
//       net: 'empty',
//       dns: 'empty',
//       tls: 'empty',
//     };
//     return config;
//   },
// };
