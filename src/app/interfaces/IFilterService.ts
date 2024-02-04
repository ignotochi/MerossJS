import { FilterName } from "../enum/enums";
import { IFilter } from "./IDeviceFilter";

export abstract class IFilterService<T> {

    abstract retrieveInstanceByName(name: FilterName): T;
    
    abstract retrieveInstance(filter: Record<FilterName.DeviceFilter, IFilter>): T;

    abstract register(filter: Record<FilterName.DeviceFilter, IFilter>): void;

    abstract invoke(filter: Record<FilterName.DeviceFilter, IFilter>): void;
}