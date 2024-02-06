import { Injectable } from "@angular/core";
import { FilterName } from "../enum/enums";
import { IFilterService } from "../interfaces/IFilterService";
import { isNullOrEmptyString } from "../utils/helper";
import { IFilter } from "../interfaces/IFilter";


@Injectable()

export class FilterService<T extends Record<FilterName, IFilter>> implements IFilterService<T> {

    private readonly filters: Map<number, T> = new Map();

    private id: number = 0;
    public uid = (() => () => this.id++)();

    constructor() { }

    private initializeWithDefault<K extends keyof T>(name: K): T {

        const f: T = {

            [name as FilterName]: {
                uid: this.uid(),
                name: name as FilterName,
                invoke: () => undefined
            }
        } as T;

        return f;
    }

    private retrieveDefaultAndRegister(name: FilterName): T {

        const def: T = this.initializeWithDefault(name);

        this.register(def);

        return def;
    }

    public retrieveInstanceByName(name: FilterName): T {

        let f: T | undefined | null = null;

        this.filters.forEach(el => {

            const filterkey = el[name];

            if (filterkey?.name === name) {
                f = el;
            }
        });

        if (!f) {
            
            f = this.retrieveDefaultAndRegister(name);
        }

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
            }
        }

        return f;
    }

    public register<K extends keyof T, V extends IFilter>(filter: Record<K, V>): void {

        if (filter) {

            const filterKey: K = Object.keys(filter)[0] as K;

            if (filterKey && !isNullOrEmptyString(filterKey)) {

                const f: T | undefined | null = this.retrieveInstance(filter);

                if (!f) {

                    let uid: number;

                    if (filter[filterKey].uid >= 0) {
                        uid = filter[filterKey].uid
                    }
                    else {
                        uid = this.uid();
                    }

                    this.filters.set(uid, filter as T);
                }
                else {

                    (filter as T)[filterKey as FilterName].uid = (f as T)[filterKey as FilterName].uid;

                    this.filters.forEach(el => {

                        if (el[filterKey as FilterName].name === (filter as T)[filterKey as FilterName].name) {

                            Object.assign(el[filterKey as FilterName], (filter as T)[filterKey as FilterName]);
                        }
                    });
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