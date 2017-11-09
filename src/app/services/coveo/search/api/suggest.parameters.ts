import { WordCorrection } from "./query.word.correction"

export class SuggestParameters {
	q: string;
    pipeline: string;
    count: number;
    language: string;
    searchHub: string;
    tab: string;
    autoCompleter: string;
    debug: boolean;
    format: string;
}