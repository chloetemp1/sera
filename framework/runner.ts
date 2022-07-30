import * as content from "./content-compiled/graphData";

import parseGraph, {
  AnswerEdge,
  Content,
  ContentEdge,
  GraphDefinition,
  QuestionNode,
  UserFunctionMap,
  UserFunctionName,
} from "./parser";
import { userFunctionSetBool, userFunctionSetString } from "./userFunctions";

export type UserContext = {
  node: QuestionNode;
} & Record<string, number | string | boolean>;

interface AppContext {
  currentUserCtx: UserContext;
  historicalUserCtx: UserContext[];
}

const firstToUpper: (text: string) => string = (text) =>
  text.slice(0, 1).toUpperCase() + text.slice(1);


export class Runner {
  parsedGraph: GraphDefinition;
  appContext: AppContext;
  onUpdate: () => void;

  userFunctions: Record<UserFunctionName, Function> = {
    setString: (key: string, value: string) => userFunctionSetString(this.appContext.currentUserCtx, key, value),
    setBool: (key: string, value: boolean) => userFunctionSetBool(this.appContext.currentUserCtx, key, value),
  };

  constructor() {
    this.parsedGraph = parseGraph(content as unknown as Content);

    const userContext: UserContext = {
      node: this.parsedGraph.startNode,
    };

    this.appContext = {
      currentUserCtx: userContext,
      historicalUserCtx: [],
    };

    this.onUpdate = () => {};
  }

  getCurrentNodeId() {
    return this.appContext.currentUserCtx.node;
  }

  getCurrentNode() {
    return this.parsedGraph.nodes[this.getCurrentNodeId()];
  }

  getCurrentNodeContent(): string {
    // @ts-ignore
    return content[`nodes${firstToUpper(this.getCurrentNodeId())}`].text;
  }

  getEdgeContent(edgeId: string): ContentEdge {
    // @ts-ignore
    return content[`edges${firstToUpper(edgeId)}`];
  }

  setListener(listener: () => void) {
    this.onUpdate = listener;
  }

  makeSelection(edgeId: AnswerEdge) {
    const node = this.getCurrentNode();
    const selectedEdge = node.edges[edgeId as AnswerEdge];

    // Push the user context to the stack of previous ones
    this.appContext.historicalUserCtx.push(
      JSON.parse(JSON.stringify(this.appContext.currentUserCtx))
    );

    // If there are any functions attached to the edge, parse and then run them
    this.runFunctions(selectedEdge.run);

    // Move to the next node
    this.appContext.currentUserCtx.node = selectedEdge.next;

    this.onUpdate();
  }

  runFunctions(userFunctions: UserFunctionMap[]) {
    // Only one function per 'list'
    const functionNames = userFunctions.map(Object.keys)[0] as UserFunctionName[];
    const functionArgs = userFunctions.map(Object.values)[0];

    functionNames.forEach(functionName => {
        const userFunction = this.userFunctions[functionName];

        // Call the function - user context is already wrapped
        userFunction(...functionArgs);
    })
  }
}

function run() {}
