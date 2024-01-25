import { AfterViewInit, Injectable, OnDestroy, OnInit } from "@angular/core";
import { TranslatePipe } from "../pipes/translate.pipe";


@Injectable()

export class TranslatorService implements OnInit, AfterViewInit, OnDestroy {

    constructor(private ts: TranslatePipe) {

    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
    }

    public translate(message: string): string {

        const translation = this.ts.transform(message);
        return translation;
      }
}
