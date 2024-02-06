import { FilterName } from "../enum/enums";

export interface IFilter {
    uid: number;
    name: FilterName;
    invoke: () => void;
}