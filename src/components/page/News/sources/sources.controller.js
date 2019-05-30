class SourcesController {
    constructor(NewsService, $routeParams) {
        "ngInject";
        var self = this;
        self.newsSources = [];
        NewsService.getSources($routeParams.Country, $routeParams.Category)
        .then(function(response) { 
            self.newsSources = response.data.sources;
        });
    }
}
  
export default SourcesController;