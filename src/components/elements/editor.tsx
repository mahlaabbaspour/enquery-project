import type { EditorState } from 'draft-js'

import ReactDraftWysiwyg from '@/@core/components/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorWrapper } from '@/@core/styles/react-draft-wysiwyg'

type Props = {
  value: EditorState
  onChange: (value: EditorState) => void
  disabled?: boolean
}

const EditorControlled = ({ value, onChange, disabled }: Props) => {
  return (
    <EditorWrapper>
      <ReactDraftWysiwyg editorState={value} onEditorStateChange={onChange} readOnly={disabled} />
    </EditorWrapper>
  )
}

export default EditorControlled
