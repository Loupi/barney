import { WordCorrection } from "./query.word.correction"

export class TitleHighlight {
	offset: number;
	length: number;
}

export class QueryResult {
	title: string;
	uri: string;
	printableUri: string;
	clickUri: string;
	uniqueId: string;
	excerpt: any;
	firstSentences: any;
	summary: any;
	flags: any;
	hasHtmlVersion: boolean;
	hasMobileHtmlVersion: boolean;
	score: number;
	percentScore: number;
	rankingInfo: any;
	rating: number;
	isTopResult: true;
	titleHighlights: TitleHighlight[];
	firstSentencesHighlights: any;
	excerptHighlights: any;
	printableUriHighlights: any;
	summaryHighlights: any;
	parentResult: any;
	childResults: any;
	totalNumberOfChildResults: number;
	isRecommendation: number;
	raw: any;
}