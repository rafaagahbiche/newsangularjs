class CountrySelectorController {
    constructor(MainConfig, $routeParams) {
      "ngInject";
      this.Countries = MainConfig.countries;
      this.countryFlag = "/images/en.png";
      this.ShowList = false;
      
      if ($routeParams.Country !== undefined) {
        var selectedCountry = this.Countries.find(x => x != undefined && x.Code == $routeParams.Country);
        var countryFlagFile = selectedCountry.Name.toLowerCase().replace(" ", "-");
        this.countryFlag = "/images/"+countryFlagFile+".png";
      }
    }
    
    ShowCountriesList(){
      this.ShowList = !this.ShowList;
    }

    ChangeCountry(country){
      this.ShowList = false;
      var countryFlagFile = country.Name.toLowerCase().replace(" ", "-");
      this.countryFlag = "/images/"+countryFlagFile+".png";
      this.path="/news/"+country.Code;
    }
  }
  
  export default CountrySelectorController;
  