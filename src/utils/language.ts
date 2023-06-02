export const isKorean = (text: string) => {
  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  return korean.test(text);
};

export const isJapanese = (text: string) => {
  const japanese = /[ぁ-ゔ]+|[ァ-ヴー]+[々〆〤]/;

  return japanese.test(text);
};

export const isChinese = (text: string) => {
  const chinese = /一-龥/;

  return chinese.test(text);
};

export const extractLanguageCode = (text: string) => {
  const chinese = /一-龥/;
  const japanese = /[ぁ-ゔ]+|[ァ-ヴー]+[々〆〤]/;

  if (japanese.test(text)) {
    return "ja";
  }

  if (chinese.test(text)) {
    return "zh-CN";
  }
};
