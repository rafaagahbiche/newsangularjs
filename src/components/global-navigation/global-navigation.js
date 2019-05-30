import NavigationComponent from './navigation/navigation';
import CountrySelectorComponent from './country-selector/country-selector';
import globalNavigationComponent from './global-navigation.component';

let globalNavigationModule = angular.module('globalNavigation', 
[NavigationComponent.name, CountrySelectorComponent.name])

.component('globalNavigation', globalNavigationComponent);

export default globalNavigationModule;
