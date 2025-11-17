import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit' 
import { useApi } from '../../store/useApi'
export default function TiptapEditor() { 
  const{posttest}=useApi()
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Write something…</p>',
  })
  if (!editor) {
    return null
  }
  return (
    <div>
      {/* Toolbar */}
      <div className="mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${editor.isActive('bold') ? 'font-bold' : ''} w-30 h-10 bg-green-200`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${editor.isActive('bold') ? 'font-bold' : ''} w-30 h-10 bg-blue-200`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive('bold') ? 'font-bold' : ''} w-30 h-10 bg-red-200`}
        >
          • List
        </button>
      </div>
      {/* Editor */}
      <EditorContent editor={editor} className="border p-2 rounded min-h-[150px]" />
      <button onClick={() => console.log(editor.getHTML())}>
        Get HTML
      </button>
      <button onClick={() => posttest(editor.getJSON())}>
        Get JSON
      </button> 
      
    </div>
  )
}