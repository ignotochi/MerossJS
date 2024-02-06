import { FilterName } from "../enum/enums";
import { IFilter } from "./IFilter";

export abstract class IFilterService<T> {

    public abstract retrieveInstanceByName(name: FilterName): T;
    
    public abstract retrieveInstance<K extends keyof T, V extends IFilter>(filter: Record<K, V>): T | undefined | null;

    public abstract register<K extends keyof T, V extends IFilter>(filter: Record<K, V>): void;

    public abstract invoke<K extends keyof T, V extends IFilter>(filter: Record<K, V>): void;
}