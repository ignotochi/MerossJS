import { Injectable } from "@angular/core";
import { IDeviceFilter, IFilter } from "../interfaces/IDeviceFilter";
import { FilterName } from "../enum/enums";
import { IFilterService } from "../interfaces/IFilterService";
import { FilterType } from "../types/custom-types";
import { isNullOrEmptyString } from "../utils/helper";


@Injectable()

export class FilterService<T extends FilterType<Record<FilterName, IFilter>>> implements IFilterService<T> {

    private readonly FilterDeclarations: Record<FilterName, IDeviceFilter>[] = [
        { deviceFilter: { name: FilterName.DeviceFilter } } as Record<FilterName.DeviceFilter, IDeviceFilter>
    ];

    private readonly fitlers: Map<number, T> = new Map();

    private id: number = 0;
    public uid = (() => () => this.id++)();

    constructor() {

        for (let index = 0; index < this.FilterDeclarations.length; index++) {
            this.register(this.FilterDeclarations[index]);
        }
    }

    public retrieveInstanceByName(name: FilterName): T {

        let instance: T = {} as T;

        this.fitlers.forEach(el => {

            if (el.deviceFilter.name === name) {
                instance = el;
            }
        });

        return instance;
    }

    public retrieveInstance<K extends keyof T>(filter: Record<K, IFilter>): T {

        let f: T = {} as T;

        const filterKey: K = Object.keys(filter)[0] as K;

        if (!isNullOrEmptyString(filterKey)) {

            if (filter[filterKey].uid) {
                f = this.fitlers.get(filter[filterKey].uid) ?? {} as T;
            }
            else if (filter[filterKey].name) {

                f = this.retrieveInstanceByName(filter[filterKey].name);
            }
        }

        return f;
    }

    public register<K extends keyof T>(filter: Record<K, IFilter>): void {

        const filterKey: K = Object.keys(filter)[0] as K;

        if (!isNullOrEmptyString(filterKey)) {

            const uid = filter[filterKey].uid || this.uid();
            filter[filterKey].uid = uid;

            const f: T = filter as T;
            this.fitlers.set(uid, f);
        }
    }

    public invoke<K extends keyof T>(filter: Record<K, IFilter>): void {

        const filterKey: K = Object.keys(filter)[0] as K;

        if (!isNullOrEmptyString(filterKey)) {

            const f = this.fitlers.get(filter[filterKey].uid);

            if (f) {
                filter[filterKey].invoke();
            }
        }
    }
}