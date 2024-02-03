import { FilterName } from "src/app/enum/enums";

export interface IFilter {
    uid: number;
    name: FilterName;
    type: string,
    invoke: () => void;
}

export interface IDeviceFilter extends IFilter {
    models: { model: string }[];
}


