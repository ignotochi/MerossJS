import { Injectable, inject } from "@angular/core";
import { FilterService } from "src/app/components/filters-components/filter.service";
import { FilterName } from "src/app/enum/enums";
import { IFilter } from "src/app/interfaces/IFilter";
import { FilterType } from "src/app/types/custom-types";

type FilterPair = [IFilter, FilterName];

@Injectable()
export abstract class RegisterFilterComponent<T extends FilterPair> {

    protected readonly filter: { [key in T[1]]: T[0] } = {} as { [key in T[1]]: T[0] };
    private readonly service: FilterService<FilterType<Record<T[1], T[0]>>>;

    constructor(public readonly f: Record<T[1], T[0]>) {

        this.service = inject(FilterService<FilterType<Record<T[1], T[0]>>>);

        this.service.register(f);

        const filterKey: T[1] = Object.keys(f)[0] as T[1];

        this.filter[filterKey] = f[filterKey] as T[0];
    }

    protected ngOnDestroy(): void {
        this.service.unregister(this.filter);
    }
}
