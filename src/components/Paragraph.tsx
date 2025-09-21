import "@src/components/Paragraph.css";

interface ParagraphProps {
  text: string;
}

export const Paragraph = ({ text }: ParagraphProps) => {
  return <p className="paragraph">{text}</p>;
};
