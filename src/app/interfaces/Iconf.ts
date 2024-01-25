import { language } from "../enums/enums";

export interface IConf {
    language: language,
    baseUrl : string;
    port: string;
    protocol: string,
}