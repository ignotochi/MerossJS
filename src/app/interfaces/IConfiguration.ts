import { Language } from "../enum/enums";

export interface IConfiguration {
    language: Language,
    marossApiUrl : string;
    port: string;
    protocol: string,
    version: string
}