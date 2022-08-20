interface Cohort {
	id: string; // uuidv4
	name: string;
	parentCohortId: string | null; // uuidv4
}

enum BestPracticeKind {
	METHODOLOGY,
	TOOL,
	CASE_STUDY,
	NOTE_OF_CAUTION,
	OTHER
}

enum CreatorType {
	ORIGINAL_RESEARCHERS,
	USER_CONTRIBUTED
}

interface BestPractice {
	title: string;
	id: string; // uuidv4
	bestPracticeKind: BestPracticeKind;
	contentMarkdown: string;
	upvoteCount: number;
	downvoteCount: number;
	cohorts: Cohort[];
	creatorType: CreatorType;
	creatorUserId: string | null; // null if by original researchers
}

interface User {
	id: string; // uuidv4
	cognitoId: string;
}

enum InteractionKind {
	COMMENT,
	VOTE
}

enum VoteKind {
	UP,
	DOWN
}

interface BaseInteraction {
	kind: InteractionKind;
	bestPracticeId: string; // uuidv4
	userId: string; // uuidv4
}

interface CommentInteraction extends BaseInteraction {
    kind: InteractionKind.COMMENT;
	commentText: string;
}

interface VoteInteraction {
	voteKind: VoteKind;
}
