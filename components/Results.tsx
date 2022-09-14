import { useMemo } from "react";
import {
  BestPracticeKind,
  CompiledContent,
  ResearcherBestPractice,
} from "../shared/sharedTypes";


const filterByKind = (bestPractices: ResearcherBestPractice[], kind: BestPracticeKind) => {
  return bestPractices.filter((practice) => practice.kind === kind)
}

interface BestPracticeProps {
  practice: ResearcherBestPractice;
}

const BestPractice = ({practice}: BestPracticeProps) => {
  return (
    <div className="pb-3">
      <p className="pb-1">{practice.title}</p>
      <p>{practice.contentMarkdown}</p>
    </div>
  )
}
interface BestPracticeGroupProps {
  kind: BestPracticeKind;
  bestPractices: ResearcherBestPractice[];
}

const BestPracticeGroup = ({kind, bestPractices }: BestPracticeGroupProps) => {
  return(
    <div className="pb-10">
    <h1 className="pb-2">{kind}</h1>
    {filterByKind(bestPractices, kind).map((practice) => (
      <BestPractice key={practice.id} practice={practice} />
  ))}
  </div>
  )
}

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
      content?.bestPractices?.filter(
        ({ cohorts, kind }) => {
          return cohorts?.some((cohort) => filterCohorts.has(cohort)) &&
          filterBestPracticesKinds.has(kind)
        }
      ),
    [filterCohorts, filterBestPracticesKinds, content]
  );


  return (
    <div className="flex flex-col items-stretch">
      <h1 className="flex justify-center pb-20 text-3xl font-bold">Results</h1>
      <>
      {Array.from(filterBestPracticesKinds).map((kind) => <BestPracticeGroup key={kind} kind={kind} bestPractices={filteredBestPractices} />)}
      </>
    </div>
  );
};


export default Results;
