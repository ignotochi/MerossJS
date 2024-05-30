import { Injectable } from "@angular/core";
import { TranslatePipe } from "../pipes/translate.pipe";


@Injectable()

export class TranslatorService {

    constructor(private ts: TranslatePipe) {
    }

    public translate(message: string): string {

        const translation = this.ts.transform(message);
        return translation;
      }
}
