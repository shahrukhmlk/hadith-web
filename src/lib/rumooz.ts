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
    ["ﷻ", ["-جل جلالہ-"]],
    ["﷑", ["-صلی اللہ علیہ وسلم-", "ﷺ"]],
    ["", ["-صلی اللہ علیہ وآلہ وسلم-"]],
    ["﷤", ["-علیہ السلام-"]],
    ["﷥", ["-علیہا السلام-"]],
    ["﷧", ["-علیہما السلام-"]],
    ["﷩", ["-علیہم السلام-"]],
    ["﷪", ["-علیہ الصلاۃ والسلام-"]],
    ["﷜", ["-رضی اللہ عنہ-"]],
    ["﷞", ["-رضی اللہ عنہا-"]],
    ["﷠", ["-رضی اللہ عنہما-"]],
    ["﷢", ["-رضی اللہ عنہم-"]],
  ]),
}

export const hindiRumooz: RumoozConfig = {
  map: new Map([
    ["﷯", ["(ʿअज़्ज़ व जल्ल)"]],
    ["ﷻ", ["(जल्ल जलालुहू)"]],
    ["﷑", ["(स़़ल्लल्लाहु ʿअलैहि वसल्लम)", "ﷺ"]],
    ["", ["(स़़ल्लल्लाहु ʿअलैहि वआलिही  वसल्लम)"]],
    ["﷤", ["(ʿअलैहिस्सलाम)"]],
    ["﷥", ["(ʿअलैहस्सलाम)"]],
    ["﷧", ["(ʿअलैहुमस्सलाम)"]],
    ["﷩", ["(ʿअलैहिमुस्सलाम)"]],
    ["﷪", ["(ʿअलैहिस्स़़लातु वस्सलाम)"]],
    ["﷜", ["(रज़ियल्लाहु ʿअन्हु)"]],
    ["﷞", ["(रज़ियल्लाहु ʿअन्हा)"]],
    ["﷠", ["(रज़ियल्लाहु ʿअन्हुमा)"]],
    ["﷢", ["(रज़ियल्लाहु ʿअन्हुम)"]],
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
