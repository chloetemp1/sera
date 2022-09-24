import { useMemo } from "react";
import { BestPractice, Cohort, CompiledContent } from "../shared/sharedTypes";
import styles from "../styles/Results.module.css";

interface Props {
  content: CompiledContent;
  filterCohorts: Set<string>;
  filterSubCohorts: Set<string>;
  filterKeywords: Set<string>;
}

const displayField = (fieldData: string | string[] | undefined) => {
  if (fieldData === undefined) {
    return '[none]';
  } else if (Array.isArray(fieldData)) {
    return fieldData.join(', ');
  } else {
    return fieldData;
  }
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

  const displayedBestPractices = filteredBestPractices?.map((bestPractice) => (
    <div className={styles.bestPractice} key={bestPractice.id}>
      {[
        "paperName",
        "paperLink",
        "cohorts",
        "subCohorts",
        "keywords",
        "targetAudience",
        "findings",
        "summary",
        "notes",
        "bestPractices",
        "methodology",
        "tools",
        "terminology",
        "notesOfCaution",
        "relatedPapers",
      ].map((fieldName: string) => (
        <div key={`best-practice-${bestPractice.id}-${fieldName}`}>
          <h3>{fieldName}</h3>
          {displayField(bestPractice[fieldName as keyof typeof bestPractice])}
        </div>
      ))}
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
