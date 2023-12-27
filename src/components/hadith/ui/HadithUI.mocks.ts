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

export const sampleHadithData = [
  new Hadith(
    "Knowledge",
    "AR",
    `حَدَّثَنَا أَبُو النُّعْمَانِ، عَارِمُ بْنُ الْفَضْلِ قَالَ حَدَّثَنَا أَبُو عَوَانَةَ، عَنْ أَبِي بِشْرٍ، عَنْ يُوسُفَ بْنِ مَاهَكَ، عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو، قَالَ تَخَلَّفَ عَنَّا النَّبِيُّ صلى الله عليه وسلم فِي سَفْرَةٍ سَافَرْنَاهَا، فَأَدْرَكَنَا وَقَدْ أَرْهَقَتْنَا الصَّلاَةُ وَنَحْنُ نَتَوَضَّأُ، فَجَعَلْنَا نَمْسَحُ عَلَى أَرْجُلِنَا، فَنَادَى بِأَعْلَى صَوْتِهِ ‏ "‏ وَيْلٌ لِلأَعْقَابِ مِنَ النَّارِ ‏"‏‏.‏ مَرَّتَيْنِ أَوْ ثَلاَثًا‏.‏
`,
    [new Reference("Bukhari", 3)],
  ),
  new Hadith(
    "Knowledge",
    "EN",
    `Once the Prophet (ﷺ) remained behind us in a journey. He joined us while we were performing ablution for the prayer which was over-due. We were just passing wet hands over our feet (and not washing them properly) so the Prophet (ﷺ) addressed us in a loud voice and said twice or thrice: "Save your heels from the fire."`,
    [new Reference("Bukhari", 3)],
  ),
]
