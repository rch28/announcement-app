import DOMPurify from "dompurify";

const RichTextDisplay = ({ html }) => {
  const sanitizedHtml = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};
export default RichTextDisplay;