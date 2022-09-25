import { BestPractice } from "../shared/sharedTypes";
import BestPracticeCard from "./BestPracticeCard";
interface Props {
  filteredBestPractices:  BestPractice[];
}

const Results = ({
  filteredBestPractices
}: Props) => {


  const displayedBestPractices = filteredBestPractices?.map(
    (bestPractice: BestPractice) => (
      <BestPracticeCard key={bestPractice.id} bestPractice={bestPractice} />
    )
  );

  return (
    <div>
      <p className="pb-5 text-3xl font-bold text-center">Results</p>
      {displayedBestPractices}
    </div>
  );
};

export default Results;
