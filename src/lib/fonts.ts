import { Gulzar } from "next/font/google"

export const getFont = (language: string) => {
  switch (language) {
    case "ur":
      return urdu_nastaliq

    default:
      break
  }
}

const urdu_nastaliq = Gulzar({
  weight: "400",
  subsets: ["arabic"],
  variable: "--font-urdu",
})
