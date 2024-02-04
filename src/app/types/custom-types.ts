import { FilterName } from "../enum/enums";
import { IFilter } from "../interfaces/IDeviceFilter";

export type FilterType<T extends Record<FilterName, IFilter>> = {
    [key in keyof T]: T[key] & {
      name: key;
      invoke: () => void;
    };
  };
