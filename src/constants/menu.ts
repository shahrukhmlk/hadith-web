import { ROUTES } from "./routes"

export type MenuItem = {
  route: string
  title: string
  children?: MenuItem[]
}

export const MAIN_MENU_ITEMS: MenuItem[] = [
  { route: ROUTES.HOME, title: "Home" },
]
export const ADMIN_MENU_ITEMS: MenuItem[] = [
  {
    route: ROUTES.ADMIN.ROOT,
    title: "Admin",
    children: [
      { route: ROUTES.ADMIN.HADITHS, title: "Hadiths" },
      { route: ROUTES.ADMIN.TOPICS, title: "Topics" },
      { route: ROUTES.ADMIN.BOOKS, title: "Books" },
      { route: ROUTES.ADMIN.LANGUAGES, title: "Languages" },
      { route: ROUTES.ADMIN.USERS, title: "Users" },
    ],
  },
]
