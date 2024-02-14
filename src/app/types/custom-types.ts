import { FilterName } from "../enum/enums";
import { IFilter } from "../interfaces/IFilter";


export type FilterType<T extends Record<FilterName, IFilter>> = {
    [key in keyof T]: T[key] & {
      uid: number;
      name: key;
      invoke: () => void;
    };
  };

