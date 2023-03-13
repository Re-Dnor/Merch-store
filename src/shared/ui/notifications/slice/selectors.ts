import { ApplicationState } from "app/store";

export const mainSelector = (state: ApplicationState) => state.notifications;
