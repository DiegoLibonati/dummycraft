import { screen, render } from "@testing-library/react";

import { Paragraph } from "./Paragraph";

type RenderComponent = {
  props: { text: string };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    text: "hola 1234",
  };

  const { container } = render(<Paragraph text={props.text}></Paragraph>);

  return {
    props: props,
    container: container,
  };
};

describe("Paragraph.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the text entered by props.", () => {
      const { props } = renderComponent();

      const paragraph = screen.getByText(props.text);

      expect(paragraph).toBeInTheDocument();
    });
  });
});
