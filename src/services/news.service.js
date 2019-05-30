const NewsAPI = require('newsapi');

function NewsService($http, ServicesConfig) {
    "ngInject";

    var getParams = function(country, category){
        var params = { apiKey: ServicesConfig.apis.newsApiKey };
        if (country == undefined && category == undefined) {
            params.language = 'en';
        }
        else {
            if (country != undefined && category == undefined) {
                params.country = country;
            }
            else {
                params.category = category;
                params.country = country;
            }
        }

        return params;
    }

    var allSources = function (country,category){
        var params = getParams(country,category);
        return $http.get(ServicesConfig.apis.newsSourcesUrl, { params: params });
    };

    var allNews = function(country, category) {
        var params = getParams(country,category);
        return $http.get(ServicesConfig.apis.newsApiUrl, { params: params });
    }
    return {
        getSources : allSources,
        getNews : allNews
        // var newsapi = new NewsAPI(ServicesConfig.apis.newsApiKey);
        // return newsapi.v2.topHeadlines(params);

        // newsapi.v2.topHeadlines(params, function(data) {
        //     deffered.resolve({ articles: data.articles });
        // });

        // return deffered.promise;
        
    }
}

export default NewsService;