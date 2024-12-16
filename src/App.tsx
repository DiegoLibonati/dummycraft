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
    <main className="main_container">
      <section className="generator_container">
        <article className="header_container">
          <h2>TIRED OF BORING LOREM IPSUM?</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="number"
              onChange={handleInputChange}
              value={amount}
            ></input>
            <button type="submit" aria-label="generate">
              GENERATE
            </button>
          </form>
        </article>

        <hr />

        <article className="ps_container">
          {paragraphs.map((p, index) => (
            <Paragraph key={`p_${index}`} text={p}></Paragraph>
          ))}
        </article>
      </section>
    </main>
  );
}

export default App;
