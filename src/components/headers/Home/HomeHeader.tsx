import MainMenu from "@/components/menus/main/MainMenu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download } from "lucide-react"
import Link from "next/link"

export interface IHomeHeader {}

const HomeHeader: React.FC<IHomeHeader> = () => {
  return (
    <header className="w-full bg-background backdrop-blur">
      <div className="flex flex-col justify-center gap-4 p-4 lg:flex-row">
        <Link href={"/"} className="flex items-center justify-center gap-2">
          <Avatar>
            <AvatarImage src="/Shahrukh-Malik-icon.png" />
            <AvatarFallback>DMF</AvatarFallback>
          </Avatar>
          <p className="text-xl font-semibold">Dar al-Malik Foundation</p>
        </Link>
        <div className="flex justify-center lg:ms-4 lg:flex-1 lg:justify-normal">
          <MainMenu />
        </div>
        {/* <div className="flex justify-center ">
          <Button asChild>
            <a href={"/Shahrukh-Malik.pdf"}>
              <Download className="mr-2" />
              Download Resume
            </a>
          </Button>
        </div> */}
      </div>
      <Separator asChild>
        <hr />
      </Separator>
    </header>
  )
}

export default HomeHeader
