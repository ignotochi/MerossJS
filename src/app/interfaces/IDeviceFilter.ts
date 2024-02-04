import { FilterName } from "src/app/enum/enums";

export interface IFilter {
    uid: number;
    name: FilterName;
    invoke: () => void;
}

export interface IDeviceFilter extends IFilter {
    models: { model: string }[];
}


