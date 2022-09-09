/** Inject fields into compiled content and then export */

import { BestPracticeKind, CompiledContent, CreatorType, ResearcherBestPractice, ResearcherBestPracticeMarkdown, ResearcherCohort, ResearcherCohortMarkdown } from "../shared/sharedTypes";
import content from "./content-compiled/content.json";

const injectBestPracticeFields: (
  bestPracticeMarkdown: ResearcherBestPracticeMarkdown
) => ResearcherBestPractice = (bestPracticeMarkdown) => ({
  ...bestPracticeMarkdown,
  kind: bestPracticeMarkdown.kind as BestPracticeKind,
  creatorType: CreatorType.ORIGINAL_RESEARCHERS,
  creatorUserId: null,
  submittedDate: null,
  editedDate: null,
  upvoteCount: 0,
  downvoteCount: 0,
});

const injectCohortFields: (
  cohortMarkdown: ResearcherCohortMarkdown
) => ResearcherCohort = (cohortMarkdown) => ({
  ...cohortMarkdown,
  creatorType: CreatorType.ORIGINAL_RESEARCHERS,
  creatorUserId: null,
  submittedDate: null,
});

const compiledContent: CompiledContent = {
  bestPractices: content?.bestPractices?.map((bestPractice) =>
    injectBestPracticeFields(
      bestPractice as unknown as ResearcherBestPracticeMarkdown
    )
  ),
  cohorts: content?.cohorts?.map(injectCohortFields),
};

export default compiledContent;
