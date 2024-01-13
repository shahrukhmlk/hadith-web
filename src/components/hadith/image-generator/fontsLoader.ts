import localFont from "next/font/local"

const arabicNas = localFont({
  src: "./fonts/arabic-quran.ttf",
  variable: "--font-arabic-nas",
})
const arabicNormal = localFont({
  src: "./fonts/razawi.ttf",
  variable: "--font-arabic-normal",
})
const rumooz = localFont({
  src: "./fonts/symbols.otf",
  variable: "--font-rumooz",
})
const urduKasheeda = localFont({
  src: "./fonts/urdu-kasheeda.ttf",
  variable: "--font-urdu-kasheeda",
})
export { arabicNas, arabicNormal, rumooz, urduKasheeda }
