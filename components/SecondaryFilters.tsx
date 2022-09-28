import { Dispatch, SetStateAction, useMemo } from "react";
import { BestPractice, Cohort } from "../shared/sharedTypes";

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
  filteredBestPractices: BestPractice[];
  filterSubCohorts: Set<string>;
  setFilterSubCohorts: Dispatch<SetStateAction<Set<string>>>;
  filterKeywords: Set<string>;
  setFilterKeywords: Dispatch<SetStateAction<Set<string>>>;
}

const SecondaryFilters = ({
  filteredBestPractices,
  filterSubCohorts,
  setFilterSubCohorts,
  filterKeywords,
  setFilterKeywords,
}: Props) => {
  const toggleSubCohort = toggleSetter<string>(setFilterSubCohorts);
  const toggleKeyword = toggleSetter<string>(setFilterKeywords);

  const availableSubCohorts = useMemo(() =>  {
    const subCohorts = new Set<string>();
    filteredBestPractices.forEach((bestPractice) => bestPractice.subCohorts.forEach((subCohort) => subCohorts.add(subCohort)));
    return subCohorts;
  }, [filteredBestPractices]);

  const availableKeywords = useMemo(() =>  {
    const keywords = new Set<string>();
    filteredBestPractices.forEach((bestPractice) => bestPractice.keywords.forEach((keyword) => keywords.add(keyword)));
    return keywords;
  }, [filteredBestPractices]);
  
  const subCohortFilters = Array.from(availableSubCohorts)?.map((subCohort) => (
    <div key={subCohort}>
      <input
        type="checkbox"
        checked={filterSubCohorts.has(subCohort)}
        onChange={() => toggleSubCohort(subCohort)}
        id={`checkbox-subcohort-${subCohort}`}
      />{" "}
      <label htmlFor={`checkbox-subcohort-${subCohort}`}>{subCohort}</label>
    </div>
  ));

  const keywordFilters = Array.from(availableKeywords)?.map((keyword) => (
    <div key={keyword}>
      <input
        type="checkbox"
        checked={filterKeywords.has(keyword)}
        onChange={() => toggleKeyword(keyword)}
        id={`checkbox-keyword-${keyword}`}
      />{" "}
      <label htmlFor={`checkbox-keyword-${keyword}`}>{keyword}</label>
    </div>
  ));

  return (
    <div className="flex flex-col pb-5 space-y-10">
      {subCohortFilters.length > 0 && 
        <div>
          <h2 className="pb-4 font-bold">Sub-cohorts</h2>
          <div className="grid grid-cols-3 gap-4">{subCohortFilters}</div>
        </div>}

      {keywordFilters.length > 0 && 
        <div>
          <h2 className="pb-4 font-bold">Keywords</h2>
          <div className="grid grid-cols-3 gap-4">{keywordFilters}</div>
        </div>}      
    </div>
  );
};

export default SecondaryFilters;
