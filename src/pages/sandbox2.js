import React, { useState } from 'react';
import { format } from 'date-fns';
import { Layout } from 'src/components/Layout';
import { appendSpreadsheet } from 'src/lib/appendSpreadSheet';
import { generateFilename } from 'src/lib/generateFilename';
import { firestoreData } from 'src/data/firestoreData';

// <div>
// <label>Caption1</label>
// <input type="text" value={texts.text1} onChange={(e) => setTexts({ ...texts, text1: e.target.value })} />
// </div>
// <div>
// <label>Caption2</label>
// <input type="text" value={texts.text2} onChange={(e) => setTexts({ ...texts, text2: e.target.value })} />
// </div>

export default function Sandbox2() {
  const textArray = [];
  firestoreData.previewSteps.forEach((data, index) => {
    textArray.push({ [`text${index + 1}`]: '' });
  });
  const textObj = textArray.reduce((l, r) => Object.assign(l, r), {});

  const [texts, setTexts] = useState(textObj);

  const username = 'JohnDoe';
  const templateName = firestoreData.templateName;

  const onSubmit = async (e) => {
    e.preventDefault();
    const { outputName } = generateFilename(username, templateName);

    //スプレッドシートに書き込むデータのオブジェクト
    const newRow = {
      date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      username: username,
      output: outputName,
      'render-status': 'ready',
      aep: firestoreData.aepPath,
      bot: 'HAL',
      target: 'FINAL1080p',
      ...texts,
    };

    // スプレッドシートに書き込む！！
    appendSpreadsheet(newRow);
  };

  return (
    <div>
      <Layout>
        <form onSubmit={onSubmit}>
          {firestoreData.previewSteps.map((data, index) => (
            <div key={index}>
              <label>{`Text ${index + 1}`}</label>
              <input
                type="text"
                // value={`${texts}.text${index}`}
                onChange={(e) => setTexts({ ...texts, [`text${index + 1}`]: e.target.value })}
              />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </Layout>
    </div>
  );
}
