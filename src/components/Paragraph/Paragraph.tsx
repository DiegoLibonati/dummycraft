import type { JSX } from "react";
import type { ParagraphProps } from "@/types/props";

import "@/components/Paragraph/Paragraph.css";

const Paragraph = ({ children }: ParagraphProps): JSX.Element => {
  return <p className="paragraph">{children}</p>;
};

export default Paragraph;
