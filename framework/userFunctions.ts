import { UserContext } from "./runner";

export const userFunctionSetString: (
  userContext: UserContext,
  key: string,
  value: string
) => void = (userContext, key, value) => {
  userContext[key] = value;
};

export const userFunctionSetBool: (
    userContext: UserContext,
    key: string,
    value: boolean
  ) => void = (userContext, key, value) => {
    userContext[key] = value;
  };
  
