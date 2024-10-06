import { Cairo, Inter, NotoSans } from "next/font/google"
import localFont from "next/font/local"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

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
  variable: "--font-arabic-ramz",
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

const hindi = NotoSans({
  variable: "--font-hindi",
  subsets: ["latin", "devanagari"],
})
export {
  arabicNas,
  arabicNormal,
  rumoozAr,
  urduKasheeda,
  urduNormal,
  aadil,
  cairo,
  inter,
}
