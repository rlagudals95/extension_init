export function getName(code: string): string {
  switch (code) {
    case "en":
      return "영어";
    case "ko":
      return "한국어";
    case "ja":
      return "일본어";
    case "de":
      return "독일어";
    case "zh":
      return "중국어(간체)";
    case "vi":
      return "베트남어";
    case "th":
      return "태국어";
    default:
      return "unknown";
  }
}

export function getCode(name: string): string {
  switch (name) {
    case "영어":
      return "en";
    case "한국어":
      return "ko";
    case "일본어":
      return "ja";
    case "독일어":
      return "de";
    case "중국어(간체)":
      return "zh";
    case "베트남어":
      return "vi";
    case "태국어":
      return "th";
    default:
      return "unknown";
  }
}
