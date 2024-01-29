import { language } from "../enum/enums";

export interface IConfiguration {
    language: language,
    marossApiUrl : string;
    port: string;
    protocol: string,
    version: string
}