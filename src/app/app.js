import angular      from 'angular';
import 'angular-route';
import $ from 'jquery';
require('bootstrap')

import '../assets/sass/style.scss';

function importAll (r) {
    r.keys().forEach(r);
}
  
importAll(require.context('../assets/', true, /\.(js|css|eot|ttf|woff|gif|png)$/));

// importAll(require.context('../components/global-navigation/country-selector/images/flags/', true, /\.(png)$/));


import AppComponent from './app.component';
import CoreConfig from '../core/main';
import ServicesComponent from '../services/services';
import PageModule from '../components/page/page';

angular
    .module('app', [
        'ngRoute',
        CoreConfig.name,
        ServicesComponent.name,
        PageModule.name,
    ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        //$locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                template: '<page></page>'
            })
            .when('/home', {
                template: '<page></page>'
            })
            .when('/news/:Country?/:Category?', {
                template: '<page></page>'
            })
            // .otherwise({
            //     redirectTo: '/'
            // });
    }]).component('app', AppComponent);