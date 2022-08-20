/** Helpers */

enum CreatorType {
  ORIGINAL_RESEARCHERS = "ORIGINAL_RESEARCHERS",
  USER_CONTRIBUTED = "USER_CONTRIBUTED",
}

/** Cohorts */

interface BaseCohort {
  id: string; // uuidv4
  name: string;
  parentCohortId: string | null; // uuidv4
  categoryName: string | null; // ignored if parentCohortId is present
}

interface ResearcherCohort extends BaseCohort {
  creatorType: CreatorType.ORIGINAL_RESEARCHERS;
  creatorUserId: null;
  submittedDate: null;
}

interface UserContributedCohort extends BaseCohort {
  creatorType: CreatorType.USER_CONTRIBUTED;
  creatorUserId: string; // uuid
  submittedDate: Date;
}

type Cohort = ResearcherCohort | UserContributedCohort;

/** Best practices */

enum BestPracticeKind {
  METHODOLOGY = "METHODOLOGY",
  TOOL = "TOOL",
  CASE_STUDY = "CASE_STUDY",
  NOTE_OF_CAUTION = "NOTE_OF_CAUTION",
  OTHER = "OTHER",
}

interface BaseBestPractice {
  id: string; // uuidv4
  title: string;
  kind: BestPracticeKind;
  contentMarkdown: string;
  upvoteCount: number;
  downvoteCount: number;
}

interface ResearcherBestPractice extends BaseBestPractice {
  cohorts: ResearcherCohort[];
  creatorType: CreatorType.ORIGINAL_RESEARCHERS;
  creatorUserId: null;
  submittedDate: null;
  editedDate: null;
}

interface UserContributedBestPractice extends BaseBestPractice {
  cohorts: Cohort[];
  creatorType: CreatorType.USER_CONTRIBUTED;
  creatorUserId: string; // uuid
  submittedDate: Date;
  editedDate: Date | null;
}

type BestPractice = ResearcherBestPractice | UserContributedBestPractice;

/** User */

interface User {
  id: string; // uuidv4
  cognitoId: string;
}

/** Interactions */

enum InteractionKind {
  COMMENT = "COMMENT",
  VOTE = "VOTE",
}

enum VoteKind {
  UP = "UP",
  DOWN = "DOWN",
}

interface BaseInteraction {
  bestPracticeId: string; // uuidv4
  userId: string; // uuidv4
  submittedDate: Date;
}

interface CommentInteraction extends BaseInteraction {
  kind: InteractionKind.COMMENT;
  commentText: string;
  editedDate: Date | null;
}

interface VoteInteraction extends BaseInteraction {
  kind: InteractionKind.VOTE;
  voteKind: VoteKind;
}

type Interaction = CommentInteraction | VoteInteraction;

/** Types for markdown */

// Cohort expressed in a markdown doc to be compiled
type ResearcherCohortMarkdown = Pick<
  ResearcherCohort,
  "name" | "parentCohortId" | "categoryName"
>;

// Best practice expressed in a markdown doc to be compiled
type ResearcherBestPracticeMarkdown = Pick<
  ResearcherBestPractice,
  "title" | "kind" | "contentMarkdown" | "cohorts"
>;
