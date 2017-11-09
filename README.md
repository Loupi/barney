# Barney's search web app

Barney is a demo application for the Coveo Front End Challenge.
It is an Angular 2 web app that interacts with the Coveo REST API.
It can also be deployed on SalesForce.

See the hosted demo running on [SalesForce](https://barneys-developer-edition.na73.force.com/apex/Barney).

### Features

- Search term
- Hits per page
- Pagination at the web app level
- Uses the raw data to display rich ui
- Title hightlightning based on search term
- Search suggestions are plugged (althoug the SAQ source does not provide any)

### App Structure

The standard Angular 2 code structure was followed. A search service, api, component and template were
developed specifically for the Coveo REST API.

#### Service

[SalesForCoveoSearchService](https://github.com/Loupi/barney/blob/master/src/app/services/coveo/search/service.ts) interacts with the Cove REST API. It can perform search and suggest queries.
An api subfolder contains typescript classes mapped to the corresponding REST API query parameters and responses.

#### Component

[SearchComponent](https://github.com/Loupi/barney/blob/master/src/app/components/search/search.component.ts) is injected with the search service, angular routing and logger.
It listents for browser navigation events to update itself without reloading the page.
It displays a search input with suggestions support. A select controls the hits per page.

It displays a list of results with pagination support. When changing pages, a loader is displayed
and user interactions with the pagers are blocked.

The result cards display a result title, thumbail, coutry, region, price and rating.

### Development Setup

Barney was developed using 

- Coveo REST API
- Node.js
- Visual Studio Code
- VSForce extension for VSCode.
- Angular 2
- gulp
- Semantic UI

The build process requires gulp at the global level, and gulp installation requires Python 2.7.x and it's path set in 
PYTHON environment variable.

To install the package
- npm install

To build watch and run in local mode
- Set your Coveo API Key in the service.ts file.
- gulp
