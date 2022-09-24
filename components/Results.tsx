import { useMemo } from "react";
import { BestPractice, CompiledContent } from "../shared/sharedTypes";
import BestPracticeDisplay from "../pages/BestPracticeDisplay";


// const filterByKind = (bestPractices: ResearcherBestPractice[], kind: BestPracticeKind) => {
//   return bestPractices.filter((practice) => practice.kind === kind)
// }

// interface BestPracticeProps {
//   practice: ResearcherBestPractice;
// }

// const BestPractice = ({practice}: BestPracticeProps) => {
//   return (
//     <div className="pb-3">
//       <p className="pb-1">{practice.title}</p>
//       <p>{practice.contentMarkdown}</p>
//     </div>
//   )
// }
// interface BestPracticeGroupProps {
//   kind: BestPracticeKind;
//   bestPractices: ResearcherBestPractice[];
// }

// const BestPracticeGroup = ({kind, bestPractices }: BestPracticeGroupProps) => {
//   return(
//     <div className="pb-10">
//     <h1 className="pb-2">{kind}</h1>
//     {filterByKind(bestPractices, kind).map((practice) => (
//       <BestPractice key={practice.id} practice={practice} />
//   ))}
//   </div>
//   )
// }

// interface Props {
//   content: CompiledContent;
//   filterCohorts: Set<string>;
//   filterBestPracticesKinds: Set<BestPracticeKind>;
// }

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
      <BestPracticeDisplay key={bestPractice.id} bestPractice={bestPractice} />
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
