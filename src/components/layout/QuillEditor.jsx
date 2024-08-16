// components/QuillEditor.js
import Quill from "quill"
import { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css'; // Import Quill's CSS
import "./quill-editor.css"
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike','blockquote','code-block','link', 'image', 'video', 'formula',{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' },{ 'script': 'sub'}, { 'script': 'super' },{ 'indent': '-1'}, { 'indent': '+1' },{ 'direction': 'rtl' }],        // toggled buttons
  // ['blockquote', 'code-block'],
  // ['link', 'image', 'video', 'formula'],

  // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  // [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' },{ 'script': 'sub'}, { 'script': 'super' }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  // [{ 'direction': 'rtl' }],                         // text direction

  // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] },{ 'color': [] }, { 'background': [] },{ 'font': [] },{ 'align': [] },'clean'],

  // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  // [{ 'font': [] }],
  // [{ 'align': [] }],

  // ['clean']                                         // remove formatting button
];
const QuillEditor = ({ value, onChange }) => {
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
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      // Save the cursor position
      const selection = quillRef.current.getSelection();
      const cursorPosition = selection ? selection.index : 0;
      
      quillRef.current.root.innerHTML = value;
      
      // Restore the cursor position
      quillRef.current.setSelection(cursorPosition);
    }
  }, [value]);

  return <div ref={editorRef} style={{ height: '100px' }} className="text-black" />;
};

export default QuillEditor;