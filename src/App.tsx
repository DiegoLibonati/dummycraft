import { useState } from "react";

import { Paragraph } from "./components/Paragraph";

import { texts } from "./constants/texts.ts";

import "./App.css";

function App() {
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(0);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseInt(e.target.value);

    setAmount(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const arr: string[] = [];

    if (amount <= 0) return setParagraphs([]);

    for (let i: number = 0; i < amount; i++) {
      const randomParagraph = texts[Math.floor(Math.random() * texts.length)];
      arr.push(randomParagraph);
    }

    setParagraphs(arr);
  };

  return (
    <main className="main-app">
      <section className="lorem-ipsum">
        <article className="lorem-ipsum__header">
          <h2 className="lorem-ipsum__title">
            TIRED OF BORING LOREM IPSUM?
          </h2>

          <form onSubmit={handleSubmit} className="lorem-ipsum__form">
            <input
              type="number"
              onChange={handleInputChange}
              value={amount}
              className="lorem-ipsum__form-input"
            ></input>
            <button
              type="submit"
              aria-label="generate"
              className="lorem-ipsum__form-submit"
            >
              GENERATE
            </button>
          </form>
        </article>

        <hr className="lorem-ipsum__separator" />

        <article className="paragraphs">
          {paragraphs.map((p, index) => (
            <Paragraph key={`p_${index}`} text={p}></Paragraph>
          ))}
        </article>
      </section>
    </main>
  );
}

export default App;
