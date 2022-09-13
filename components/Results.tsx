import { useMemo } from "react";
import {
  BestPracticeKind,
  CompiledContent,
} from "../shared/sharedTypes";

interface Props {
  content: CompiledContent;
  filterCohorts: Set<string>;
  filterBestPracticesKinds: Set<BestPracticeKind>;
}

const Results = ({
  content,
  filterCohorts,
  filterBestPracticesKinds,
}: Props) => {

  console.log(content.bestPractices)

  const filteredBestPractices = useMemo(
    () =>
      content?.bestPractices?.filter(
        ({ cohorts, kind }) => {
        if (cohorts) {
          cohorts.some((cohort) => filterCohorts.has(cohort)) &&
          filterBestPracticesKinds.has(kind)
        }
}),
    [filterCohorts, filterBestPracticesKinds, content]
  );

  const displayedBestPractices = filteredBestPractices?.map((bestPractice) => (
    <div key={bestPractice.id}>
      <div>{bestPractice.title}</div>
      <div>{bestPractice.contentMarkdown}</div>
    </div>
  ));

  return (
    <div>
      <h1>Results</h1>
      {displayedBestPractices}
    </div>
  );
};


export default Results;
