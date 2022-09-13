import { ForwardedRef, forwardRef, useMemo } from "react";
import {
  BestPracticeKind,
  CompiledContent,
} from "../../shared/sharedTypes";
import styles from "./Results.module.css";

interface Props {
  content: CompiledContent;
  filterCohorts: Set<string>;
  filterBestPracticesKinds: Set<BestPracticeKind>;
}

const Results = forwardRef(({
  content,
  filterCohorts,
  filterBestPracticesKinds,
}: Props, ref: ForwardedRef<HTMLDivElement>) => {

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
    <div className={styles.bestPractice} key={bestPractice.id}>
      <div>{bestPractice.title}</div>
      <div>{bestPractice.contentMarkdown}</div>
    </div>
  ));

  return (
    <div className={styles.container} ref={ref}>
      <h1>Results</h1>
      {displayedBestPractices}
    </div>
  );
});

Results.displayName = 'Results';

export default Results;
