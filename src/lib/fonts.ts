import { Gulzar, Inter } from "next/font/google"

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const urdu_nastaliq = Gulzar({
  weight: "400",
  subsets: ["arabic"],
  variable: "--font-urdu",
})

export const getFont = (language: string) => {
  switch (language) {
    case "ur":
      return urdu_nastaliq

    default:
      break
  }
}
