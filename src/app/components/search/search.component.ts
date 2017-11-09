import { Component, OnInit,Input, trigger, state, style, transition, animate } from '@angular/core';
import { CoveoSearchService, LoggerService } from '../../services/index';
import { QueryParameters, QueryResult, Highlight, SuggestParameters, Completion } from '../../services/coveo/index';

class QueryResultViewModel {
    result: QueryResult;
    title: string;
    highlightedTitle: string;
    rating: any[];
    thumbnail: string;
    price: string;
    country: string;
    region: string;
    clickUrl: string;
    state: string;
}

@Component({
    moduleId: module.id,
    selector: 'search',
    templateUrl: 'search.component.html',
    animations: [
        trigger('cardState', [
            state('hovering', style({
                transform: 'scale(1.05)'
            })),
            state('normal', style({
               transform: 'scale(1)'
           })),
            transition('normal => hovering', animate('200ms ease-in')),
            transition('hovering => normal', animate('200ms ease-out'))
        ])
    ]
})

export class SearchComponent implements OnInit {
    
    private results: QueryResultViewModel[];
    private query = "";
    private totalCount = 0;
    private page = 1;
    private hitsPerPage = 10;
    private hitsPerPageOptions = [10, 25, 50, 100];
    private suggestions: string[];
    private loading: boolean;

    constructor(private service: CoveoSearchService, private log: LoggerService) {}

    ngOnInit() {
        this.newSearch();
    }

    @Input() queryString: string;

    newSearch(): void {
        this.page = 1;
        this.search();
    }

    search(): void {
        this.loading = true;
        var parameters = new QueryParameters();
        parameters.q = this.queryString;
        parameters.firstResult = (this.page - 1) * this.hitsPerPage;
        parameters.numberOfResults = this.hitsPerPage;

        this.service.search(parameters).then(response => {
            this.totalCount = response.totalCount;

            //Block the totalCount to 1000 for the demo, queries past this limit return an exception.
            //Seems like an account limitation.
            if(this.totalCount > 1000){
                this.totalCount = 1000 - this.hitsPerPage;;
            }

            this.results = response.results.map((result) => {
                return this.createQueryResultViewModel(result);
            });
            this.loading = false;
        }, (err) => {
            this.log.error(err);
            this.loading = false;
        });
    }

    suggest(): void {
        var parameters = new SuggestParameters();
        parameters.q = this.queryString;
        parameters.count = 10;

        this.service.suggest(parameters).then(response => {
            this.suggestions = response.map((result) => {
                return result.expression;
            });
        }, (err) => {
            this.log.error(err);
        });
    }

    pageChanged(newPage: number): void {
        this.page = newPage;
        this.search();
    }

    searchChanged(query: string): void {
        this.suggest();
    }

    private createQueryResultViewModel(result: QueryResult): QueryResultViewModel{
        var viewModel =  new QueryResultViewModel();
        viewModel.result = result;
        viewModel.title = result.title;
        viewModel.highlightedTitle = this.highlightText(result.title, result.titleHighlights);
        viewModel.rating = new Array(result.rating);
        viewModel.thumbnail = result.raw.tpthumbnailuri;
        viewModel.price = result.raw.tpprixnormal;
        viewModel.country = result.raw.tppays;
        viewModel.region = result.raw.tpregion;
        viewModel.clickUrl = result.clickUri;
        viewModel.state = 'normal';
        return viewModel;
    }

    private highlightText(text: string, highlights: Highlight[]): string {
        var result = ""
        var pos = 0;

        highlights.forEach(highlight => {
            result += text.substr(pos, highlight.offset - pos);
            pos = highlight.offset;
            result += "<mark>" + text.substr(pos, highlight.length) + "</mark>";
            pos += highlight.length;
        });

        if(pos < text.length){
            result += text.substr(pos);
        }

        return result;
    }
}