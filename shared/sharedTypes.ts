/** Helpers */

export enum CreatorType {
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

export interface ResearcherCohort extends BaseCohort {
  creatorType: CreatorType.ORIGINAL_RESEARCHERS;
  creatorUserId: null;
  submittedDate: null;
}

export interface UserContributedCohort extends BaseCohort {
  creatorType: CreatorType.USER_CONTRIBUTED;
  creatorUserId: string; // uuid
  submittedDate: Date;
}

export type Cohort = ResearcherCohort | UserContributedCohort;

/** Best practices */

export enum BestPracticeKind {
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
  cohorts: string[]; // ids of cohorts
}

export interface ResearcherBestPractice extends BaseBestPractice {
  creatorType: CreatorType.ORIGINAL_RESEARCHERS;
  creatorUserId: null;
  submittedDate: null;
  editedDate: null;
}

export interface UserContributedBestPractice extends BaseBestPractice {
  creatorType: CreatorType.USER_CONTRIBUTED;
  creatorUserId: string; // uuid
  submittedDate: Date;
  editedDate: Date | null;
}

export type BestPractice = ResearcherBestPractice | UserContributedBestPractice;

/** User */

export interface User {
  id: string; // uuidv4
  cognitoId: string;
}

/** Interactions */

export enum InteractionKind {
  COMMENT = "COMMENT",
  VOTE = "VOTE",
}

export enum VoteKind {
  UP = "UP",
  DOWN = "DOWN",
}

interface BaseInteraction {
  bestPracticeId: string; // uuidv4
  userId: string; // uuidv4
  submittedDate: Date;
}

export interface CommentInteraction extends BaseInteraction {
  kind: InteractionKind.COMMENT;
  commentText: string;
  editedDate: Date | null;
}

export interface VoteInteraction extends BaseInteraction {
  kind: InteractionKind.VOTE;
  voteKind: VoteKind;
}

export type Interaction = CommentInteraction | VoteInteraction;

/** Types for markdown */

// Cohort expressed in a markdown doc to be compiled
export type ResearcherCohortMarkdown = Pick<
  ResearcherCohort,
  "name" | "parentCohortId" | "categoryName" | "id"
>;

// Best practice expressed in a markdown doc to be compiled
export type ResearcherBestPracticeMarkdown = Pick<
  ResearcherBestPractice,
  "title" | "kind" | "contentMarkdown" | "cohorts" | "id"
>;

/** Overall compiled content */

export interface CompiledContent {
    cohorts: ResearcherCohort[];
    bestPractices: ResearcherBestPractice[];
}
