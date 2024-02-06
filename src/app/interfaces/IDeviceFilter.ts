import { IFilter } from "./IFilter";


export interface IDeviceFilter extends IFilter {
    models: { model: string }[];
}


