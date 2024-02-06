import { Injectable } from "@angular/core";
import { FilterName } from "../enum/enums";
import { IFilterService } from "../interfaces/IFilterService";
import { FilterType } from "../types/custom-types";
import { isNullOrEmptyString } from "../utils/helper";
import { IFilter } from "../interfaces/IFilter";


@Injectable()

export class FilterService<T extends FilterType<Record<FilterName, IFilter>>> implements IFilterService<T> {

    private readonly filters: Map<number, T> = new Map();

    private id: number = 0;
    public uid = (() => () => this.id++)();

    constructor() { }

    private initializeWithDefault<K extends keyof T>(name: K): T {

        const f: T = {

            [name as FilterName]: {
                uid: -1,
                name: name as FilterName,
                invoke: () => undefined 
            }
        } as T;

        return f;
    }

    public retrieveInstanceByName(name: FilterName): T {

        let f: T = this.initializeWithDefault(name);

        this.filters.forEach(el => {

            if (el[name]?.name === name) {
                f = el;
            }
        });

        return f;
    }

    public retrieveInstance<K extends keyof T, V extends IFilter>(filter: Record<K, V>): T | undefined | null {

        let f: T | undefined | null = null;

        if (filter) {

            const filterKey: K = Object.keys(filter)[0] as K;

            if (filterKey && !isNullOrEmptyString(filterKey)) {

                if (filter[filterKey].uid >= 0) {

                    f = this.filters.get(filter[filterKey].uid);
                }
                else if (filter[filterKey].name) {

                    f = this.retrieveInstanceByName(filter[filterKey].name);
                }
                else {
                    f = this.initializeWithDefault(filterKey);
                }
            }
        }

        return f;
    }

    public register<K extends keyof T, V extends IFilter>(filter: Record<K, V> | undefined | null): void {

        if (filter) {

            if (!this.retrieveInstance(filter)) {

                let f: T | undefined | null = null;

                const filterKey: K = Object.keys(filter)[0] as K;

                if (filterKey && !isNullOrEmptyString(filterKey)) {

                    const uid = filter[filterKey].uid || this.uid();
                    filter[filterKey].uid = uid;

                    f = filter as T;
                    this.filters.set(uid, f);
                }
            }
        }
    }

    public invoke<K extends keyof T, V extends IFilter>(filter: Record<K, V> | undefined | null): void {

        if (filter) {

            const filterKey: K = Object.keys(filter)[0] as K;

            if (!isNullOrEmptyString(filterKey)) {

                const f: T | undefined | null = this.filters.get(filter[filterKey].uid);

                if (f) {
                    filter[filterKey].invoke();
                }
            }
        }
    }
}