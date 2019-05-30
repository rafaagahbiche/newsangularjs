import template from './headline.html';

let headlineComponent = {
  template,
  controllerAs: 'headline',
  bindings: {
    news: '<'
  }
};

export default headlineComponent;