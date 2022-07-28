import * as content from './content-compiled/graphData';

import parseGraph, { Content, QuestionNode } from './parser';

interface UserContext {
    node: QuestionNode;
}

interface AppContext {
    currentUserCtx: UserContext;
    historicalUserCtx: UserContext[];
}

function run() {
    const parsedGraph = parseGraph(content as unknown as Content);

    const userContext: UserContext = {
        node: parsedGraph.startNode,
    };

    const appContext: AppContext = {
        currentUserCtx: userContext,
        historicalUserCtx: [],
    };
}