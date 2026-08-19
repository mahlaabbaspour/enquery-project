import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

export const convertEditorContent = (editorState: any) => {
  if (!editorState) return null // Check if editorState is null or undefined

  const rawContent = convertToRaw(editorState.getCurrentContent())
  const htmlContent = draftToHtml(rawContent).trim()

  // Check if the content is effectively empty (i.e., just <p></p> or similar)
  if (htmlContent === '<p></p>' || htmlContent === '<p><br></p>' || htmlContent === '<p></p>\n') {
    return null
  }

  return htmlContent
}
