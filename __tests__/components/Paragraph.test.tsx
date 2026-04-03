import { render, screen } from "@testing-library/react";

import type { ParagraphProps } from "@/types/props";

import Paragraph from "@/components/Paragraph/Paragraph";

type RenderComponent = {
  container: HTMLElement;
  props: ParagraphProps;
};

const renderComponent = (overrides?: Partial<ParagraphProps>): RenderComponent => {
  const props: ParagraphProps = {
    children: "Test paragraph content",
    ...overrides,
  };

  const { container } = render(<Paragraph {...props} />);

  return { container, props };
};

describe("Paragraph", () => {
  it("should render a paragraph element with the correct class", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLParagraphElement>("p.paragraph")).toBeInTheDocument();
  });

  it("should render children text", () => {
    renderComponent({ children: "Hello world" });
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("should render empty when no children are provided", () => {
    const { container } = renderComponent({ children: undefined });
    expect(container.querySelector<HTMLParagraphElement>("p.paragraph")?.textContent).toBe("");
  });
});
