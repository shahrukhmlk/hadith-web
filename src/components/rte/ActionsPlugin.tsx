import { Toggle } from "@/components/ui/toggle"

export const ActionsPlugin = () => {

  const handleOnClick = (formatType: any) => {
    //editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType)
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
            onClick={() => handleOnClick(value.toLowerCase())}
          >
            {value}
          </Toggle>
        )
      })}
    </div>
  )
}
