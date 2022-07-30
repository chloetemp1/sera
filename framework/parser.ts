interface ContentEdge {
    short: string;
    long: string;
}

interface MarkdownDoc {
    text: string;
}

export enum QuestionNode {
    age = "age",
}

export enum AnswerEdge {
    ageYoung = "ageYoung",
    ageMid = "ageMid",
    ageOlder = "ageOlder",
    ageMixed = "ageMixed",
}

export type UserFunctionName = 'setString' | 'setBool';

export type UserFunctionMap = Record<UserFunctionName, string[]>;

export interface GraphDefinition {
    nodes: Record<QuestionNode, {
        edges: Record<AnswerEdge, {
            next: QuestionNode;
            run: UserFunctionMap[];
        }>;
    }>;
    startNode: QuestionNode;
}

// TODO autogen this?
export interface Content {
    edgesAgeMid: ContentEdge;
    edgesAgeMixed: ContentEdge;
    edgesAgeOlder: ContentEdge;
    edgesAgeYoung: ContentEdge;
    nodesAge: MarkdownDoc;
    summaryAgeMid: MarkdownDoc;
    summaryAgeOlder: MarkdownDoc;
    summaryAgeYoung: MarkdownDoc;
    graphGraph: GraphDefinition;
}

export default function parseGraph(content: Content) {
    const graph = content.graphGraph;
    return graph;
}
