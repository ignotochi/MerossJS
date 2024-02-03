import { Injectable } from "@angular/core";
import { IFilter } from "../interfaces/IDeviceFilter";
import { FilterName } from "../enum/enums";

@Injectable()

export class FilterService<T extends Record<FilterName, IFilter>>{

    private readonly fitlers: Map<number, T> = new Map();

    private id: number = 0;
    public uid = (() => () => this.id++)();

    constructor() {
    }

    public retrieveInstance(filter: Record<FilterName.Device, IFilter>): T {

        let instance: T = {} as T;

        if (filter.device.uid) {
            instance = this.fitlers.get(filter.device.uid) ?? {} as T;
        }
        else if (filter.device.name) {

            this.fitlers.forEach(el => {
                if (el.device.name === filter.device.name) {
                    instance = el;
                }
            });
        }
        else {
            this.fitlers.forEach(el => {
                if (el.device.type === filter.device.type) {
                    instance = el;
                }
            });
        }

        return instance;
    }

    public register(filter: Record<FilterName.Device, IFilter>): void {

        const uid = filter.device.uid || this.uid();    
        filter.device.uid = uid;

        const f: T = filter as T;
        this.fitlers.set(uid, f);
    }

    public invoke(filter: Record<FilterName.Device, IFilter>): void {

        const f = this.fitlers.get(filter.device.uid);

        if (f) {
            filter.device.invoke();
        }
    }
}