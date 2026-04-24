import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { ParagraphProps } from "@/types/props";

import Paragraph from "@/components/Paragraph/Paragraph";

const renderComponent = (props: Partial<ParagraphProps> = {}): RenderResult => {
  const defaultProps: ParagraphProps = {
    children: "Default lorem ipsum text",
    ...props,
  };
  return render(<Paragraph {...defaultProps} />);
};

describe("Paragraph", () => {
  describe("rendering", () => {
    it("should render the provided children", () => {
      renderComponent({ children: "Hello world" });
      expect(screen.getByText("Hello world")).toBeInTheDocument();
    });

    it("should render with the paragraph class", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLParagraphElement>("p")).toHaveClass("paragraph");
    });

    it("should render as a p element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLParagraphElement>("p")).toBeInTheDocument();
    });

    it("should render different children correctly", () => {
      renderComponent({ children: "Another lorem ipsum paragraph" });
      expect(screen.getByText("Another lorem ipsum paragraph")).toBeInTheDocument();
    });

    it("should not render anything outside the p element", () => {
      const { container } = renderComponent({ children: "Test content" });
      expect(container.children).toHaveLength(1);
      expect(container.firstChild?.nodeName).toBe("P");
    });
  });
});
