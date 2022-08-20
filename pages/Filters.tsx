import { Dispatch, SetStateAction } from "react";
import {
  BestPracticeKind,
  Cohort,
  ResearcherCohort,
} from "../shared/sharedTypes";

const toggleSetter: <T>(
  setter: Dispatch<SetStateAction<Set<T>>>
) => (value: T) => void = (setter) => (cohortId) => {
  setter((prev) => {
    const newSet = new Set(prev);

    if (newSet.has(cohortId)) {
      newSet.delete(cohortId);
    } else {
      newSet.add(cohortId);
    }

    return newSet;
  });
};

interface Props {
  cohorts: ResearcherCohort[];
  filterCohorts: Set<string>;
  setFilterCohorts: Dispatch<SetStateAction<Set<string>>>;
  filterBestPracticesKinds: Set<BestPracticeKind>;
  setFilterBestPracticesKinds: Dispatch<SetStateAction<Set<BestPracticeKind>>>;
}

const Filters = ({
  cohorts,
  filterCohorts,
  setFilterCohorts,
  filterBestPracticesKinds,
  setFilterBestPracticesKinds,
}: Props) => {
  const toggleCohort = toggleSetter<string>(setFilterCohorts);

  const toggleBestPracticesKind = toggleSetter<BestPracticeKind>(
    setFilterBestPracticesKinds
  );

  const cohortFilters = cohorts.map((cohort) => (
    <div key={cohort.id}>
      <input
        type="checkbox"
        checked={filterCohorts.has(cohort.id)}
        onChange={() => toggleCohort(cohort.id)}
        id={`checkbox-${cohort.id}`}
      />{" "}
      <label htmlFor={`checkbox-${cohort.id}`}>{cohort.name}</label>
    </div>
  ));

  const bestPracticesKindsFilters = Object.values(BestPracticeKind).map(
    (bestPracticeKind) => (
      <div key={bestPracticeKind}>
        <input
          type="checkbox"
          checked={filterBestPracticesKinds.has(bestPracticeKind)}
          onChange={() => toggleBestPracticesKind(bestPracticeKind)}
          id={`checkbox-${bestPracticeKind}`}
        />{" "}
        <label htmlFor={`checkbox-${bestPracticeKind}`}>
          {bestPracticeKind}
        </label>
      </div>
    )
  );

  return (
    <div>
      <div>
        <h2>Cohorts</h2>
        {cohortFilters}
      </div>
      <div>
        <h2>Best Practice Types</h2>
        {bestPracticesKindsFilters}
      </div>
    </div>
  );
};

export default Filters;
