import { Button } from "@/components/ui/button"
import { clsx } from "clsx"
import { Facebook, Github, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export interface IMainHero {
  className?: string
}

const MainHero: React.FC<IMainHero> = ({ className }) => {
  const social = [
    {
      icon: <Github strokeWidth={1} />,
      link: "https://github.com/shahrukhmlk",
    },
    {
      icon: <Linkedin strokeWidth={1} />,
      link: "https://www.linkedin.com/in/shahrukhmlk",
    },
    {
      icon: <Instagram strokeWidth={1} />,
      link: "https://instagram.com/shahrukhmlk7",
    },
    {
      icon: <Facebook strokeWidth={1} />,
      link: "https://facebook.com/shahrukhmlk7",
    },
  ]

  return (
    <div
      className={clsx(
        "mx-auto flex h-full flex-col items-center gap-2 text-center lg:mx-0",
        className,
      )}
    >
      <p className="text-muted-foreground">Hi there!</p>
      <h1 className="bg-gradient-to-r from-ring to-foreground bg-clip-text text-transparent md:text-6xl">
        I'm Shahrukh Malik
      </h1>
      <p className="text-muted-foreground">
        I develop Responsive and accesible WebApps.
      </p>
      <div className="flex gap-1">
        {social.map((el, index) => (
          <Button key={index} variant="secondary" size="icon" asChild>
            <Link href={el.link} target="_blank">
              {el.icon}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default MainHero
