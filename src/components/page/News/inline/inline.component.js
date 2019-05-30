import template from './inline.html';
import controller from './inline.controller';

let inlineComponent = {
    template,
    controller,
    controllerAs: 'inline',
    bindings: {
        newslist: '<'
    }
};

export default inlineComponent;