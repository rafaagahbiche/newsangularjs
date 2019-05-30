import 'angular-resource';
import NewsService from './news.service';
import ServicesConfig from './services.config';

export default angular.module('services', ['ngResource'])
.constant('ServicesConfig', ServicesConfig)
.service('NewsService', NewsService);