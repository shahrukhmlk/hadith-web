const {
  generateTemplateFiles,
  CaseConverterEnum,
} = require("generate-template-files")

generateTemplateFiles([
  {
    option: "Create Component with base template",
    defaultCase: CaseConverterEnum.PascalCase,
    entry: {
      folderPath: "src/components/templates/base",
    },
    stringReplacers: [
      { question: "Component Name:", slot: "BaseTemplate" },
      { question: "Parent Folder Name:", slot: "__parent__" },
      { question: "Folder Name:", slot: "__folder__" },
    ],
    output: {
      path: "src/components/__parent__(kebabCase)/__folder__(kebabCase)",
      overwrite: false,
    },
    onComplete: (results) => {
      console.log(results)
    },
  },
])
