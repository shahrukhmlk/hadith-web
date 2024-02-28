import { Toggle } from "@/components/ui/toggle"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { FORMAT_TEXT_COMMAND, TextFormatType } from "lexical"

export const ActionsPlugin = () => {
  const [editor] = useLexicalComposerContext()

  const handleOnClick = (formatType: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType)
  }

  return (
    <div className="flex w-full flex-wrap gap-1">
      {[
        "Bold",
        "Italic",
        "Underline",
        "Code",
        "Highlight",
        "Strikethrough",
        "Subscript",
        "Superscript",
      ].map((value, index) => {
        return (
          <Toggle
            key={index}
            onPressedChange={() => {}}
            onClick={() => handleOnClick(value.toLowerCase() as TextFormatType)}
          >
            {value}
          </Toggle>
        )
      })}
    </div>
  )
}
