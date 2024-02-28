import { $generateHtmlFromNodes } from "@lexical/html"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import {
  $getEditor,
  $getRoot,
  $getSelection,
  EditorState,
  LexicalEditor,
} from "lexical"
import { ActionsPlugin } from "./ActionsPlugin"

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!

export function HadithEditor() {
  const theme = {
    // Theme styling goes here
    // ...
  }
  function onChange(editorState: EditorState, editor: LexicalEditor) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot()
      const selection = $getSelection()

      console.log($generateHtmlFromNodes(editor, null))
    })
  }

  // Catch any errors that occur during Lexical updates and log them
  // or throw them as needed. If you don't throw them, Lexical will
  // try to recover gracefully without losing user data.
  function onError(error: any) {
    console.error(error)
  }
  const initialConfig = {
    namespace: "HadithEditor",
    theme,
    onError,
  }

  return (
    <div className="space-y-2">
      <LexicalComposer initialConfig={initialConfig}>
        <ActionsPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="prose dark:prose-invert flex min-h-[60px] w-full max-w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
            }
            placeholder={
              <p className="absolute left-3 top-3 text-muted-foreground">
                Enter some text...
              </p>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>

        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  )
}
