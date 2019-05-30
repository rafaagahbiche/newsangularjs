import MainConfig from './main.config';

let MainModule = angular.module('main',[])
    .constant('MainConfig', MainConfig);

export default MainModule;