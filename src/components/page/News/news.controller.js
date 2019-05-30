class NewsController {
  constructor(NewsService, $routeParams) {
    "ngInject";
    var self = this;
    self.firstNews = {};
    self.headlines = [];
    self.inlineList = [];
    self.block = {};
    self.count = 0;
    NewsService.getNews($routeParams.Country, $routeParams.Category)
      .then(function(response) {
        if (response !== undefined && response.data !== undefined && response.data.articles !== undefined){
          response.data.articles.forEach(function(newsItem){
            if (self.count < 16){
              setItem(newsItem, self);
            }
            else {
              return;
            }
          });
        } 
    });
  }
}

function setItem(item, data) {
  if (item.urlToImage !== null && item.urlToImage !== '' && item.urlToImage !== undefined){
    if (data.count == 0) {
      data.firstNews = item;
    }
    else if (data.count < 5){
      data.headlines.push(item);
    }
    else if (data.count == 5) {
      data.block = item;
    }
    else if (data.count < 15) {
      data.inlineList.push(item);
    }
    else {
      return;
    }

    data.count++;
  }
}

export default NewsController;