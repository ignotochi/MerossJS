import { inject } from "@angular/core";
import { FilterName } from "src/app/enum/enums";
import { IFilter } from "src/app/interfaces/IFilter";
import { FilterService } from "src/app/services/filter.service";
import { FilterType } from "src/app/types/custom-types";

type FilterPair = [IFilter, FilterName];

export abstract class BaseFilterComponent<T extends FilterPair> {

    protected readonly filter: { [key in T[1]]: T[0] } = {} as { [key in T[1]]: T[0] };

    constructor(filterName: T[1]) {

        const service = inject(FilterService<FilterType<Record<FilterName, IFilter>>>);

        Object.entries(FilterName).forEach(obj => {

            const value = obj[1] as T[1];

            if (value === filterName) {
                this.filter[value] = service.retrieveInstanceByName(value)[value] as T[0];
            }
        });
    }
}


