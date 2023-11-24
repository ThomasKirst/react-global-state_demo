import GlobalStyle from "../styles";
import Layout from "../components/Layout";
import { useState } from "react";

const initialAnimals = [
  { id: 1, name: "Cats", count: 0 },
  { id: 2, name: "Dogs", count: 2 },
  { id: 3, name: "Sheep", count: 0 },
  { id: 4, name: "Dragons", count: 0 },
];

export default function App({ Component, pageProps }) {
  const [animals, setAnimals] = useState(initialAnimals);

  // Derived data from state
  const animalsCount = animals.map((animal) => animal.count); // [0, 2, 0, 0]
  const countSum = animalsCount.reduce((a, b) => a + b, 0); // => 2
  const countAverage = countSum / animals.length; // => 0.5
  const dragonCount = animals.find((animal) => animal.name === "Dragons").count; // => 0

  function handleAdd(animalId) {
    setAnimals(
      animals.map((animal) => {
        if (animal.id === animalId) {
          return {
            ...animal,
            count: animal.count + 1,
          };
        }
        return animal;
      })
    );
  }

  function handleSubtract(animalId) {
    setAnimals(
      animals.map((animal) =>
        animal.id === animalId ? { ...animal, count: animal.count - 1 } : animal
      )
    );
  }

  return (
    <>
      <GlobalStyle />
      <Layout countSum={countSum} dragonCount={dragonCount}>
        <Component
          {...pageProps}
          animals={animals}
          handleAdd={handleAdd}
          handleSubtract={handleSubtract}
          countSum={countSum}
          countAverage={countAverage}
          dragonCount={dragonCount}
        />
      </Layout>
    </>
  );
}
