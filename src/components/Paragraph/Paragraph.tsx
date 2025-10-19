import { ParagraphProps } from "@src/entities/props";

import "@src/components/Paragraph/Paragraph.css";

export const Paragraph = ({ children }: ParagraphProps) => {
  return <p className="paragraph">{children}</p>;
};
