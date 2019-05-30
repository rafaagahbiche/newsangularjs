import countrySelectorComponent  from './country-selector.component';

let countrySelectorModule = angular.module('countrySelector', [])
.component('countrySelector', countrySelectorComponent);

export default countrySelectorModule;
