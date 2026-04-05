import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoremIpsumPage from "@/pages/LoremIpsumPage/LoremIpsumPage";

interface RenderPage {
  container: HTMLElement;
}

const renderPage = (): RenderPage => {
  const { container } = render(<LoremIpsumPage />);
  return { container };
};

describe("LoremIpsumPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the page title", () => {
    renderPage();
    expect(
      screen.getByRole("heading", { name: /tired of boring lorem ipsum/i })
    ).toBeInTheDocument();
  });

  it("should render the number input", () => {
    renderPage();
    expect(
      screen.getByRole("spinbutton", { name: "Number of paragraphs to generate" })
    ).toBeInTheDocument();
  });

  it("should render the generate button", () => {
    renderPage();
    expect(
      screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" })
    ).toBeInTheDocument();
  });

  it("should not render paragraphs initially", () => {
    const { container } = renderPage();
    expect(container.querySelectorAll<HTMLParagraphElement>("p.paragraph")).toHaveLength(0);
  });

  it("should render the correct number of paragraphs after submitting", async () => {
    const { container } = renderPage();
    const user = userEvent.setup();

    const input = screen.getByRole("spinbutton", { name: "Number of paragraphs to generate" });

    await user.clear(input);
    await user.type(input, "3");
    await user.click(screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" }));

    expect(container.querySelectorAll<HTMLParagraphElement>("p.paragraph")).toHaveLength(3);
  });

  it("should clear paragraphs when amount is 0", async () => {
    const { container } = renderPage();
    const user = userEvent.setup();

    const input = screen.getByRole("spinbutton", { name: "Number of paragraphs to generate" });
    const button = screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" });

    await user.clear(input);
    await user.type(input, "2");
    await user.click(button);

    await user.clear(input);
    await user.type(input, "0");
    await user.click(button);

    expect(container.querySelectorAll<HTMLParagraphElement>("p.paragraph")).toHaveLength(0);
  });
});
