import { BestPractice } from "../shared/sharedTypes";
import Link from "next/link";
import useLocalStorage from "use-local-storage";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

interface Props {
  bestPractice: BestPractice;
}

const BestPracticeCard = ({ bestPractice }: Props) => {
  const [favourites, setFavourites] = useLocalStorage(
    "favourited-best-practices",
    {}
  );

  const toggleFavourited = (bestPracticeId: string) =>
    setFavourites((prev) => ({
      ...prev,
      [bestPracticeId]:
        !(prev ?? {})[bestPracticeId as keyof typeof prev] ?? true,
    }));

  const isFavourited = (bestPracticeId: string) =>
    bestPracticeId in favourites &&
    favourites[bestPracticeId as keyof typeof favourites] === true;

  if (bestPractice === undefined) {
    return null;
  }

  return (
    <div className="flex p-5 mb-5 bg-gray-200 rounded-lg" key={bestPractice.id}>
      <div className="pr-2">
        <button onClick={() => toggleFavourited(bestPractice.id)}>
          {isFavourited(bestPractice.id) ? <StarIcon /> : <StarOutlineIcon />}
        </button>
      </div>
      <div className="flex flex-col">
        <p className="font-bold truncate">{bestPractice.summary}</p>
        <p>{bestPractice.bestPractices}</p>
        <Link href={`/bestPractice/${bestPractice.id}`}>
          <p className="font-bold text-right">View More Details</p>
        </Link>
      </div>
    </div>
  );
};

export default BestPracticeCard;
