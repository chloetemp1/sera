import { useMemo } from "react";
import {
  BestPracticeKind,
  Cohort,
  CompiledContent,
} from "../shared/sharedTypes";

interface Props {
  content: CompiledContent;
  filterCohorts: Set<Cohort>;
  filterBestPracticesKinds: Set<BestPracticeKind>;
}

const Results = ({
  content,
  filterCohorts,
  filterBestPracticesKinds,
}: Props) => {
  const filteredBestPractices = useMemo(() => {
    console.log(content.bestPractices);

    return content.bestPractices.filter(
      ({ cohorts, kind }) =>
        cohorts.some((cohort) => filterCohorts.has(cohort)) &&
        filterBestPracticesKinds.has(kind)
    );
  }, []);

  const displayedBestPractices = filteredBestPractices.map((bestPractice) => (
    <div>
      <div>{bestPractice.title}</div>
      <div>{bestPractice.contentMarkdown}</div>
    </div>
  ));

  return <div>{displayedBestPractices}</div>;
};

export default Results;
