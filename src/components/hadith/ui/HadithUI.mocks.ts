import { Hadith, IHadith, Reference } from "./HadithUI"

const base: IHadith = {
  className: undefined,
  hadith: new Hadith("Topic", "AR", "Hadith text <p>in p</p>", [
    new Reference("Sample Book Name", 46546),
  ]),
}

export const mockHadithProps = {
  base,
}
