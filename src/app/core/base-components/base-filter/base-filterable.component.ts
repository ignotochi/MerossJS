import { inject } from "@angular/core";
import { FilterService } from "src/app/components/filters-components/filter.service";
import { FilterName } from "src/app/enum/enums";
import { IFilter } from "src/app/interfaces/IFilter";
import { FilterType } from "src/app/types/custom-types";

type FilterPair = [IFilter, FilterName];

export abstract class FilterableComponent<T extends FilterPair> {

    protected readonly filter: { [key in T[1]]: T[0] } = {} as { [key in T[1]]: T[0] };

    constructor(public readonly filterName: T[1]) {

        const service = inject(FilterService<FilterType<Record<FilterName, IFilter>>>);

        Object.entries(FilterName).forEach(obj => {

            const value = obj[1] as T[1];

            if (value === filterName) {
                this.filter[value] = service.retrieveInstanceByName(value)[value] as T[0];
            }
        });
    }
}


