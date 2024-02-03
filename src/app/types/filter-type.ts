import { FilterName } from "../enum/enums";
import { IFilter } from "../interfaces/IDeviceFilter";

export type FilterType<T extends Record<FilterName, IFilter>> = T;
