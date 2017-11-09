import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import "rxjs/add/operator/toPromise";
import { QueryParameters, QueryExecutionInformation, SuggestParameters, Completion } from './api'

@Injectable()
export class CoveoSearchService {
	private accessToken = "your api key here";
	private apiUrl = "https://cloudplatform.coveo.com/rest/";
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) { }

	search(query: QueryParameters) : Promise<QueryExecutionInformation> {
		return this.http
			.post(this.buildUrl("search"), JSON.stringify(query), { headers: this.headers })
			.toPromise()
			.then(response => {
				return response.json() as QueryExecutionInformation;
			})
			.catch(this.handleError);
	}

	suggest(query: SuggestParameters) : Promise<Completion[]> {
		return this.http
			.post(this.buildUrl("search/querySuggest"), JSON.stringify(query), { headers: this.headers })
			.toPromise()
			.then(response => {
				return response.json().completions as Completion[];
			})
			.catch(this.handleError);
	}

	private buildUrl(action) : string {
		var url = new URL(this.apiUrl + action);
		url.searchParams.set("access_token", this.accessToken);
		return url.toString();
	}

	private handleError(error: any): Promise<any> {
		console.error("An error occurred", error);
		return Promise.reject(error.message || error);
	}
}