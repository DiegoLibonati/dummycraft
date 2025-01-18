import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import App from "./App";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<App></App>);

  return {
    container: container,
  };
};

describe("App.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the page title.", () => {
      renderComponent();

      const title = screen.getByRole("heading", {
        name: /tired of boring lorem ipsum?/i,
      });

      expect(title).toBeInTheDocument();
    });

    test("It must render the numerical input and the generate button.", () => {
      const { container } = renderComponent();

      // eslint-disable-next-line
      const inputNumber = container.querySelector("input") as HTMLInputElement;
      const btnSubmit = screen.getByRole("button", { name: /generate/i });

      expect(inputNumber).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
    });

    test("It must render all the paragraphs that are entered through the input when touching the generate button.", async () => {
      const amount = 2;

      const { container } = renderComponent();

      // eslint-disable-next-line
      const inputNumber = container.querySelector("input") as HTMLInputElement;
      const btnSubmit = screen.getByRole("button", { name: /generate/i });
      const articles = screen.getAllByRole("article");
      const paragraphContainer = articles.find((article) =>
        article.classList.contains("paragraphs")
      );

      expect(inputNumber).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
      expect(paragraphContainer).toBeInTheDocument();
      // eslint-disable-next-line
      expect(paragraphContainer?.children).toHaveLength(0);

      await user.click(inputNumber);
      await user.keyboard(String(amount));

      expect(inputNumber).toHaveValue(amount);

      await user.click(btnSubmit);

      // eslint-disable-next-line
      expect(paragraphContainer?.children).toHaveLength(amount);
    });

    test("It should render 0 paragraphs if a quantity of 0 is entered.", async () => {
      const amount = 0;

      const { container } = renderComponent();

      // eslint-disable-next-line
      const inputNumber = container.querySelector("input") as HTMLInputElement;
      const btnSubmit = screen.getByRole("button", { name: /generate/i });
      const articles = screen.getAllByRole("article");
      const paragraphContainer = articles.find((article) =>
        article.classList.contains("paragraphs")
      );

      expect(inputNumber).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
      expect(paragraphContainer).toBeInTheDocument();
      // eslint-disable-next-line
      expect(paragraphContainer?.children).toHaveLength(0);

      await user.click(inputNumber);
      await user.keyboard(String(amount));

      expect(inputNumber).toHaveValue(amount);

      await user.click(btnSubmit);

      // eslint-disable-next-line
      expect(paragraphContainer?.children).toHaveLength(amount);
    });
  });
});
