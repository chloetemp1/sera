import { useMemo } from "react";
import { BestPractice, CompiledContent } from "../shared/sharedTypes";
import BestPracticeDisplay from "./BestPracticeDisplay";

interface Props {
  content: CompiledContent;
  filterCohorts: Set<string>;
  filterSubCohorts: Set<string>;
  filterKeywords: Set<string>;
}

const Results = ({
  content,
  filterCohorts,
  filterSubCohorts,
  filterKeywords,
}: Props) => {
  const filteredBestPractices = useMemo(
    () =>
      content?.bestPractices?.filter(
        ({ cohorts, subCohorts, keywords }) =>
          cohorts.some((cohort) => filterCohorts.has(cohort)) ||
          subCohorts.some((subCohort) => filterSubCohorts.has(subCohort)) ||
          keywords.some((keyword) => filterKeywords.has(keyword))
      ),
    [filterCohorts, filterSubCohorts, filterKeywords, content]
  );

  const displayedBestPractices = filteredBestPractices?.map(
    (bestPractice: BestPractice) => (
      <BestPracticeDisplay bestPractice={bestPractice} />
    )
  );

  return (
    <div>
      <h1>Results</h1>
      {displayedBestPractices}
    </div>
  );
};

export default Results;
