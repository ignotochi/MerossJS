import { language } from "../enum/enums";

export interface IConfiguration {
    language: language,
    baseUrl : string;
    port: string;
    protocol: string,
    version: string
}