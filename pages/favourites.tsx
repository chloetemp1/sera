import content from "../framework/compiledContent";
import { useRouter } from "next/router";
import Link from "next/link";
import BestPracticeDisplay from "./BestPracticeDisplay";
import useLocalStorage from "use-local-storage";

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
    <div>
      <Link href="/">&laquo; Back</Link>
      <h1>Your Favourited Best Practices</h1>
      {bestPractices.map((bestPractice) => (
        <BestPracticeDisplay key={bestPractice.id} bestPractice={bestPractice} />
      ))}
    </div>
  );
};

export default BestPractice;
