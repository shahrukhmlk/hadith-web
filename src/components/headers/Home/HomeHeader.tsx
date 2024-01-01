import LanguageMenu, {
  ILanguage,
} from "@/components/menus/language/LanguageMenu"
import MainMenu from "@/components/menus/main/MainMenu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download } from "lucide-react"
import Link from "next/link"

export interface IHomeHeader {
  languages: ILanguage[]
}

const HomeHeader = ({ languages }: IHomeHeader) => {
  return (
    <header className="fixed z-10 h-16 w-full backdrop-blur">
      <div className="flex h-full flex-row flex-wrap justify-center gap-y-1 p-2">
        <Link href={"/"} className="flex items-center justify-center gap-2">
          <Avatar>
            <AvatarImage src="/" />
            <AvatarFallback>DMF</AvatarFallback>
          </Avatar>
          <p className="hidden text-xl font-semibold md:block">
            Dar al-Malik Foundation
          </p>
        </Link>
        <div className="flex flex-1 md:ms-4">
          <MainMenu />
        </div>
        <div className="flex justify-center ">
          <LanguageMenu languages={languages} />
        </div>
      </div>
      <Separator asChild>
        <hr />
      </Separator>
    </header>
  )
}

export default HomeHeader
