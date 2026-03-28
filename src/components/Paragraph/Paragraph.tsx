import { ParagraphProps } from "@/types/props";

import "@/components/Paragraph/Paragraph.css";

const Paragraph = ({ children }: ParagraphProps) => {
  return <p className="paragraph">{children}</p>;
};

export default Paragraph;
