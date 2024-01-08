import { languages } from "@prisma/client"

export interface ILanguage extends Omit<languages, "sort"> {}
