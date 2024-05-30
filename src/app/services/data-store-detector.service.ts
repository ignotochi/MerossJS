import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Enum } from 'src/app/enum/enums';
import { hardObjectClone } from 'src/app/utils/helper';


export abstract class DataStoreDetector<T, W extends Enum> {

    private dataChangeSubject: BehaviorSubject<{ action: W, payload: T }>;
    private dataChangeEvent$: Observable<{ action: W, payload: T }>;

    constructor() {
        this.dataChangeSubject = new BehaviorSubject({ action: {} as W, payload: {} as T });
        this.dataChangeEvent$ = this.dataChangeSubject.asObservable();
    }

    public initialize(): void {
        if (this.dataChangeSubject.closed) {
            this.dataChangeSubject = new BehaviorSubject({ action: {} as W, payload: {} as T });
            this.dataChangeEvent$ = this.dataChangeSubject.asObservable();
        }
    }

    public complete(): void {
        this.dataChangeSubject.complete();
    }

    public reset(): void {
        if (this.dataChangeSubject !== null) {
            this.complete();
        }
        else {
            this.initialize();
        }
    }

    public changes(): Observable<{ action: W, payload: T }> {
        return this.dataChangeEvent$.pipe(filter(tt => tt.action !== null));
    }

    public lastValue() {
        return this.dataChangeSubject.getValue();
    }

    protected update(dataChangeEntries: { action: W, payload: T }): void {
        this.dataChangeSubject.next(dataChangeEntries);
    }

    protected clone(): T {
        var storeValue = this.dataChangeSubject.getValue();
        return hardObjectClone(storeValue.payload) as T;
    }
}

