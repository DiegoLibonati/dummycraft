import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import DummycraftPage from "@/pages/DummycraftPage/DummycraftPage";

jest.mock("@/constants/paragraphs", () => {
  const mockData = jest.requireActual("@tests/__mocks__/paragraphs.mock");
  const { mockParagraphs } = mockData;
  return {
    __esModule: true,
    default: mockParagraphs,
  };
});

const renderPage = (): RenderResult => render(<DummycraftPage />);

describe("DummycraftPage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: "TIRED OF BORING LOREM IPSUM?" })
      ).toBeInTheDocument();
    });

    it("should render the number input with initial value of 0", () => {
      renderPage();
      expect(
        screen.getByRole("spinbutton", { name: "Number of paragraphs to generate" })
      ).toHaveValue(0);
    });

    it("should render the generate button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" })
      ).toBeInTheDocument();
    });

    it("should not render any paragraphs initially", () => {
      const { container } = renderPage();
      expect(container.querySelectorAll("p.paragraph")).toHaveLength(0);
    });

    it("should render the form with accessible label", () => {
      renderPage();
      expect(screen.getByRole("form", { name: "Paragraph generator form" })).toBeInTheDocument();
    });

    it("should render the generated paragraphs section with aria-live", () => {
      renderPage();
      const section = screen.getByRole("article", { name: "Generated paragraphs" });
      expect(section).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("behavior", () => {
    it("should generate the correct number of paragraphs when submitted", async () => {
      const user = userEvent.setup();
      const { container } = renderPage();
      const input = screen.getByRole("spinbutton", {
        name: "Number of paragraphs to generate",
      });
      await user.clear(input);
      await user.type(input, "3");
      await user.click(screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" }));
      expect(container.querySelectorAll("p.paragraph")).toHaveLength(3);
    });

    it("should not render paragraphs when amount is 0 and form is submitted", async () => {
      const user = userEvent.setup();
      const { container } = renderPage();
      await user.click(screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" }));
      expect(container.querySelectorAll("p.paragraph")).toHaveLength(0);
    });

    it("should clear paragraphs when submitting with amount 0 after having paragraphs", async () => {
      const user = userEvent.setup();
      const { container } = renderPage();
      const input = screen.getByRole("spinbutton", {
        name: "Number of paragraphs to generate",
      });
      await user.clear(input);
      await user.type(input, "2");
      await user.click(screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" }));
      expect(container.querySelectorAll("p.paragraph")).toHaveLength(2);
      await user.clear(input);
      await user.click(screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" }));
      expect(container.querySelectorAll("p.paragraph")).toHaveLength(0);
    });

    it("should replace existing paragraphs on subsequent submissions", async () => {
      const user = userEvent.setup();
      const { container } = renderPage();
      const input = screen.getByRole("spinbutton", {
        name: "Number of paragraphs to generate",
      });
      await user.clear(input);
      await user.type(input, "4");
      await user.click(screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" }));
      expect(container.querySelectorAll("p.paragraph")).toHaveLength(4);
      await user.clear(input);
      await user.type(input, "2");
      await user.click(screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" }));
      expect(container.querySelectorAll("p.paragraph")).toHaveLength(2);
    });

    it("should update the input value when the user types a number", async () => {
      const user = userEvent.setup();
      renderPage();
      const input = screen.getByRole("spinbutton", {
        name: "Number of paragraphs to generate",
      });
      await user.clear(input);
      await user.type(input, "5");
      expect(input).toHaveValue(5);
    });
  });

  describe("edge cases", () => {
    it("should not render paragraphs when amount is negative", async () => {
      const user = userEvent.setup();
      const { container } = renderPage();
      const input = screen.getByRole("spinbutton", {
        name: "Number of paragraphs to generate",
      });
      fireEvent.change(input, { target: { value: "-1" } });
      await user.click(screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" }));
      expect(container.querySelectorAll("p.paragraph")).toHaveLength(0);
    });

    it("should reset amount to 0 when non-numeric input is entered", async () => {
      const user = userEvent.setup();
      renderPage();
      const input = screen.getByRole("spinbutton", {
        name: "Number of paragraphs to generate",
      });
      await user.clear(input);
      expect(input).toHaveValue(0);
    });

    it("should generate 1 paragraph when amount is 1", async () => {
      const user = userEvent.setup();
      const { container } = renderPage();
      const input = screen.getByRole("spinbutton", {
        name: "Number of paragraphs to generate",
      });
      await user.clear(input);
      await user.type(input, "1");
      await user.click(screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" }));
      expect(container.querySelectorAll("p.paragraph")).toHaveLength(1);
    });
  });
});
