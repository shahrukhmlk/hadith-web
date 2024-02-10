type RumoozConfig = {
  language: string
  map: Map<string, [string, string]>
}

const arabicRumooz: RumoozConfig = {
  language: "ar",
  map: new Map([
    ["-سبحانه وتعالى-", ["", ""]],
    ["-تبارك وتعالى-", ["", ""]],
    ["-عز وجل-", ["", ""]],
    ["-جل جلاله-", ["", ""]],
    ["-جل وعلا-", ["", ""]],
    ["-صلى الله عليه وسلم-", ["", ""]],
    ["-صلى الله عليه وآله وسلم-", ["", ""]],
    ["-عليه السلام-", ["", ""]],
    ["-عليها السلام-", ["", ""]],
    ["-عليهما السلام-", ["", ""]],
    ["-عليهم السلام-", ["", ""]],
    ["-عليه الصلاة والسلام-", ["", ""]],
    ["-رضي الله عنه-", ["", ""]],
    ["-رضي الله عنها-", ["", ""]],
    ["-رضي الله عنهما-", ["", ""]],
    ["-رضي الله عنهم-", ["", ""]],
    ["رضي الله عنهن", ["", ""]],
    ["-رحمه الله-", ["", ""]],
    ["-رحمها الله- ", ["", ""]],
    ["-رحمهما الله- ", ["", ""]],
    ["-رحمهم الله- ", ["", ""]],
    ["رحمهن الله ", ["", ""]],
  ]),
}

const urduRumooz: RumoozConfig = {
  language: "ur",
  map: new Map([
    ["-سبحانه وتعالى-", ["", ""]],
    ["-تبارك وتعالى-", ["", ""]],
    ["-عز وجل-", ["", ""]],
    ["-جل جلاله-", ["", ""]],
    ["-جل وعلا-", ["", ""]],
    ["-صلى الله عليه وسلم-", ["", ""]],
    ["-صلى الله عليه وآله وسلم-", ["", ""]],
    ["-عليه السلام-", ["", ""]],
    ["-عليها السلام-", ["", ""]],
    ["-عليهما السلام-", ["", ""]],
    ["-عليهم السلام-", ["", ""]],
    ["-عليه الصلاة والسلام-", ["", ""]],
    ["-رضي الله عنه-", ["", ""]],
    ["-رضي الله عنها-", ["", ""]],
    ["-رضي الله عنهما-", ["", ""]],
    ["-رضي الله عنهم-", ["", ""]],
    ["رضي الله عنهن", ["", ""]],
    ["-رحمه الله-", ["", ""]],
    ["-رحمها الله- ", ["", ""]],
    ["-رحمهما الله- ", ["", ""]],
    ["-رحمهم الله- ", ["", ""]],
    ["رحمهن الله ", ["", ""]],
  ]),
}