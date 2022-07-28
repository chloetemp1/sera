interface ContentEdge {
    short: string;
    long: string;
}

interface MarkdownDoc {
    text: string;
}

export enum QuestionNode {
    age,
}

export enum AnswerEdge {
    ageYoung,
    ageMid,
    ageOlder,
    ageMixed,
}

interface GraphDefinition {
    nodes: Record<QuestionNode, {
        edges: Record<AnswerEdge, {
            next: QuestionNode;
            run: string;
        }>[];
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
