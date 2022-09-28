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
    <div className="flex flex-col">
        {displayedBestPractices}
    </div>
  );
};

export default Results;
