class NavigationController {
  constructor(MainConfig, $routeParams) {
    "ngInject";
    this.category = $routeParams.Category;
    this.Categories = MainConfig.categories;
    this.path = "/news/";
    if ($routeParams.Country !== undefined) {
      this.path = "/news/" + $routeParams.Country;
    }
  }

  IsCurrent(category){
    return this.category == category;
  }
}

export default NavigationController;
