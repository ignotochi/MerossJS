import { FilterName } from "../enum/enums";

export interface IFilter {
    uid: number;
    owner: string;
    name: FilterName;
    invoke: () => void;
}