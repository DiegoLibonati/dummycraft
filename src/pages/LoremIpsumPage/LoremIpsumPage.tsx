import { useState } from "react";

import type { JSX } from "react";

import Paragraph from "@/components/Paragraph/Paragraph";

import paragraphsData from "@/constants/paragraphs";

import "@/pages/LoremIpsumPage/LoremIpsumPage.css";

const LoremIpsumPage = (): JSX.Element => {
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [amount, setAmount] = useState(0);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseInt(e.target.value);

    setAmount(isNaN(value) ? 0 : value);
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const arr: string[] = [];

    if (amount <= 0) {
      setParagraphs([]);
      return;
    }

    for (let i = 0; i < amount; i++) {
      const randomParagraph = paragraphsData[Math.floor(Math.random() * paragraphsData.length)];
      arr.push(randomParagraph!);
    }

    setParagraphs(arr);
  };

  return (
    <main className="main-app" aria-label="Lorem ipsum generator application">
      <section className="lorem-ipsum" aria-label="Lorem ipsum generator">
        <article className="lorem-ipsum__header">
          <h2 className="lorem-ipsum__title">TIRED OF BORING LOREM IPSUM?</h2>

          <form
            onSubmit={handleSubmit}
            className="lorem-ipsum__form"
            aria-label="Paragraph generator form"
          >
            <input
              type="number"
              onChange={handleInputChange}
              value={amount}
              className="lorem-ipsum__form-input"
              aria-label="Number of paragraphs to generate"
            ></input>
            <button
              type="submit"
              aria-label="Generate lorem ipsum paragraphs"
              className="lorem-ipsum__form-submit"
            >
              GENERATE
            </button>
          </form>
        </article>

        <hr className="lorem-ipsum__separator" aria-hidden="true" />

        <article className="paragraphs" aria-label="Generated paragraphs" aria-live="polite">
          {paragraphs.map((p, index) => (
            <Paragraph key={`p_${index}`}>{p}</Paragraph>
          ))}
        </article>
      </section>
    </main>
  );
};

export default LoremIpsumPage;
