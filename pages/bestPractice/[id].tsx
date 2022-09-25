import content from '../../framework/compiledContent';
import { useRouter } from "next/router";
import Link from "next/link";
import BestPracticeDisplay from "../../components/BestPracticeDisplay";

const BestPractice = () => {
  const router = useRouter()
  const { id } = router.query;

  const bestPractice = content.bestPractices.find((bestPractice) => bestPractice.id === id);

  if (bestPractice === undefined) {
    return null;
  }

  return (
    <div>
      <Link href="/">&laquo; Back</Link>
      <h1>Best Practice</h1>
      <BestPracticeDisplay bestPractice={bestPractice} />
    </div>
  );
};

export default BestPractice;
