import { Noto_Nastaliq_Urdu } from "next/font/google"

export const getFont = (language: string) => {
  switch (language) {
    case "ur":
      return nastaliq

    default:
      break
  }
}

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-urdu",
})
