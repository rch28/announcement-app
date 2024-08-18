// components/QuillEditor.js
import Quill from "quill"
import { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css'; // Import Quill's CSS
import "./quill-editor.css"
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike','blockquote','code-block','link', 'image', 'video', 'formula',{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' },{ 'script': 'sub'}, { 'script': 'super' },{ 'indent': '-1'}, { 'indent': '+1' },{ 'direction': 'rtl' }], 

  [{ 'header': [1, 2, 3, 4, 5, 6, false] },{ 'color': [] }, { 'background': [] },{ 'font': [] },{ 'align': [] },'clean'],
];
const QuillEditor = ({ value, onChange, size }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: 'Description...',
        readOnly: false,
      });

      quillRef.current.on('text-change', () => {
        onChange(quillRef.current.root.innerHTML);
      });
    }
  }, [onChange]);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current;
      const selection = editor.getSelection();
      const cursorPosition = selection ? selection.index : 0;

      // Create a new Delta from the HTML value
      const delta = editor.clipboard.convert(value);

      // Update the editor content
      editor.updateContents(delta, 'silent');

      // Restore the cursor position
      editor.setSelection(cursorPosition, 0);
    
    }

  }, [value]);

 

  return <div ref={editorRef} 
  style={{
    height:size
  }}/>
};

export default QuillEditor;