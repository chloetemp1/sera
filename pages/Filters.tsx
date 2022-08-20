import { Dispatch, SetStateAction } from "react";
import { BestPracticeKind, Cohort } from "../shared/sharedTypes";

interface Props {
    filterCohorts: Set<Cohort>;
    setFilterCohorts: Dispatch<SetStateAction<Set<Cohort>>>;
    filterBestPracticesKinds: Set<BestPracticeKind>;
    setFilterBestPracticesKinds: Dispatch<SetStateAction<Set<BestPracticeKind>>>;
}

const Filters = ({}: Props) => {
    return <div></div>
}

export default Filters;
