import { ApplicationState } from "app/store";

export const mainSelector = (state: ApplicationState) => state.groups;

export const groupsSelector = (state: ApplicationState) =>
  mainSelector(state).groups;
export const loadingSelector = (state: ApplicationState) =>
  mainSelector(state).isLoading;
