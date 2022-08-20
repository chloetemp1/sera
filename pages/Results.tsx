import { useMemo } from "react";
import {
  BestPracticeKind,
  Cohort,
  CompiledContent,
} from "../shared/sharedTypes";
import styles from "../styles/Results.module.css";

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
  const filteredBestPractices = useMemo(
    () =>
      content.bestPractices.filter(
        ({ cohorts, kind }) =>
          cohorts.some((cohort) => filterCohorts.has(cohort)) &&
          filterBestPracticesKinds.has(kind)
      ),
    [filterCohorts, filterBestPracticesKinds]
  );

  const displayedBestPractices = filteredBestPractices.map((bestPractice) => (
    <div className={styles.bestPractice}>
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
