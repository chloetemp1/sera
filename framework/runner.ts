enum QuestionNode {
    age,
}

enum AnswerEdge {
    ageYoung,
    ageMid,
    ageOlder,
    ageMixed,
}

interface UserContext {
    node: QuestionNode;
}

interface AppContext {
    currentUserCtx: UserContext;
    historicalUserCtx: UserContext[];
}

function run() {
    const parsedGraph = parse();

    const userContext: UserContext = {
        node: parsedGraph.startNode,
    };

    const appContext: AppContext = {
        currentUserCtx: userContext,
        historicalUserCtx: [],
    };
}