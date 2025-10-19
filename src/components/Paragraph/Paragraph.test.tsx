import { screen, render } from "@testing-library/react";

import { ParagraphProps } from "@src/entities/props";

import { Paragraph } from "@src/components/Paragraph/Paragraph";

type RenderComponent = {
  props: ParagraphProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    children: "hola 1234",
  };

  const { container } = render(<Paragraph>{props.children}</Paragraph>);

  return {
    props: props,
    container: container,
  };
};

describe("Paragraph.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the text entered by props.", () => {
      const { props } = renderComponent();

      const paragraph = screen.getByText(props.children as string);

      expect(paragraph).toBeInTheDocument();
    });
  });
});
