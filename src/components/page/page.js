import newsModule            from './news/news';
import globalNavigationModule            from '../global-navigation/global-navigation';
import pageComponent from './page.component';

let pageModule = angular.module('page', [globalNavigationModule.name, newsModule.name])
.component('page', pageComponent);


export default pageModule;