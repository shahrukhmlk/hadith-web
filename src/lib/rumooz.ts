export type RumoozConfig = {
  map: Map<string, string[]>
}

export const arabicRumooz: RumoozConfig = {
  map: new Map([
    ["", ["-سبحانه وتعالى-"]],
    ["", ["-تبارك وتعالى-"]],
    ["", ["-عز وجل-"]],
    ["", ["-جل جلاله-"]],
    ["", ["-جل وعلا-"]],
    ["", ["-صلى الله عليه وسلم-", "ﷺ"]],
    ["", ["-صلى الله عليه وآله وسلم-"]],
    ["", ["-عليه السلام-"]],
    ["", ["-عليها السلام-"]],
    ["", ["-عليهما السلام-"]],
    ["", ["-عليهم السلام-"]],
    ["", ["-عليه الصلاة والسلام-"]],
    ["", ["-رضي الله عنه-"]],
    ["", ["-رضي الله عنها-"]],
    ["", ["-رضي الله عنهما-"]],
    ["", ["-رضي الله عنهم-"]],
    ["", ["رضي الله عنهن"]],
  ]),
}

export const englishRumooz: RumoozConfig = {
  map: new Map([
    ["", ["-سبحانه وتعالى-"]],
    ["", ["-تبارك وتعالى-"]],
    ["", ["-عز وجل-"]],
    ["", ["-جل جلاله-"]],
    ["", ["-جل وعلا-"]],
    ["", ["(peace and blessings of Allah be upon him)", "ﷺ"]],
    ["", ["(peace and blessings of Allah be upon him and his family)"]],
    ["", ["(peace be upon him)"]],
    ["", ["(peace be upon her)"]],
    ["", ["(peace be upon them)"]],
    ["", ["(peace and blessings be upon him)"]],
    ["", ["(may Allah be pleased with him)"]],
    ["", ["(may Allah be pleased with her)"]],
    ["", ["(may Allah be pleased with them)"]],
  ]),
}

export const urduRumooz: RumoozConfig = {
  map: new Map([
    ["﷯", ["-عز وجل-"]],
    ["ﷻ", ["-جل جلاله-"]],
    ["﷑", ["-صلى الله عليه وسلم-", "ﷺ"]],
    ["", ["-صلى الله عليه وآله وسلم-"]],
    ["﷤", ["-عليه السلام-"]],
    ["﷥", ["-عليها السلام-"]],
    ["﷧", ["-عليهما السلام-"]],
    ["﷩", ["-عليهم السلام-"]],
    ["﷪", ["-عليه الصلاة والسلام-"]],
    ["﷜", ["-رضي الله عنه-"]],
    ["﷞", ["-رضي الله عنها-"]],
    ["﷠", ["-رضي الله عنهما-"]],
    ["﷢", ["-رضي الله عنهم-"]],
  ]),
}

export const hindiRumooz: RumoozConfig = {
  map: new Map([
    ["﷯", ["-عز وجل-"]],
    ["ﷻ", ["-جل جلاله-"]],
    ["﷑", ["-صلى الله عليه وسلم-", "ﷺ"]],
    ["", ["-صلى الله عليه وآله وسلم-"]],
    ["﷤", ["-عليه السلام-"]],
    ["﷥", ["-عليها السلام-"]],
    ["﷧", ["-عليهما السلام-"]],
    ["﷩", ["-عليهم السلام-"]],
    ["﷪", ["-عليه الصلاة والسلام-"]],
    ["﷜", ["-رضي الله عنه-"]],
    ["﷞", ["-رضي الله عنها-"]],
    ["﷠", ["-رضي الله عنهما-"]],
    ["﷢", ["-رضي الله عنهم-"]],
  ]),
}

export const rumoozConfigs: { [languageCode: string]: RumoozConfig } = {
  ar: arabicRumooz,
  ur: urduRumooz,
  en: englishRumooz,
  hi: hindiRumooz,
}

export function addRamzToText(
  text: string,
  rumoozConfig?: RumoozConfig,
  wrapWith?: { start: string; end: string },
) {
  //TODO: add normalization while searching
  rumoozConfig?.map.forEach((replaceStrings, replaceWith) => {
    replaceStrings.forEach((replaceString) => {
      if (wrapWith) {
        text = text.replaceAll(
          replaceString,
          wrapWith.start + replaceWith + wrapWith.end,
        )
      } else {
        text = text.replaceAll(replaceString, replaceWith)
      }
    })
  })
  return text
}
