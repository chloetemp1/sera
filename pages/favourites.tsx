import content from "../framework/compiledContent";
import Link from "next/link";
import BestPracticeDisplay from "../components/BestPracticeDisplay";
import useLocalStorage from "use-local-storage";
import { Layout } from "../layouts/Layout";

const BestPractice = () => {
  const [favourites] = useLocalStorage(
    "favourited-best-practices",
    {}
  );

  const favouritesIds = new Set(
    Object.keys(favourites).filter(
      (key) => favourites[key as keyof typeof favourites]
    )
  );

  const bestPractices = content.bestPractices.filter((bestPractice) =>
    favouritesIds.has(bestPractice.id)
  );

  return (
    <Layout title="Persona | Favourites">
      <div>
        <Link href="/">&laquo; Back</Link>
        <h1>Your Favourited Best Practices</h1>
        {bestPractices.map((bestPractice) => (
          <BestPracticeDisplay key={bestPractice.id} bestPractice={bestPractice} />
        ))}
      </div>
    </Layout>
  );
};

export default BestPractice;
