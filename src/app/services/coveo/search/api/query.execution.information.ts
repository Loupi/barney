import { QueryResult } from './query.result'
import { QueryCorrection } from './query.correction'

export class QueryExecutionInformation{
	totalCount: number;
	totalCountFiltered: number;
	duration: number;
	indexDuration: number;
	results: QueryResult[];
	groupByResults: any;
	queryCorrections: QueryCorrection[];
	triggers: any;
	pipeline: string;
	splitTestRun: string;
}