import { Cairo } from "next/font/google"
import localFont from "next/font/local"

const arabicNas = localFont({
  src: "./fonts/arabic-quran.ttf",
  variable: "--font-arabic-nas",
})
const arabicNormal = localFont({
  src: "./fonts/razawi.ttf",
  variable: "--font-arabic-normal",
})
const rumoozAr = localFont({
  src: "./fonts/symbols.otf",
  variable: "--font-rumooz",
})
const urduNormal = localFont({
  src: "./fonts/urdu-normal.ttf",
  variable: "--font-urdu-normal",
})
const urduKasheeda = localFont({
  src: "./fonts/urdu-kasheeda.ttf",
  variable: "--font-urdu-kasheeda",
})
const aadil = localFont({
  src: "./fonts/aadil.ttf",
  variable: "--font-aadil",
})

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
})
export {
  arabicNas,
  arabicNormal,
  rumoozAr,
  urduKasheeda,
  urduNormal,
  aadil,
  cairo,
}
