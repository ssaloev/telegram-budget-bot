import { createIfDontExist } from "../../../db/services/budget";
import type {ActionChannelData} from "../../types";

export interface CommonAction {
    model: ReturnType<createIfDontExist>,
    actionData: ActionChannelData;
}