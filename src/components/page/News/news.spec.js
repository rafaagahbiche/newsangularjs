import NewsModule       from './news'
import NewsController   from './news.controller';
import NewsComponent    from './news.component';
import NewsTemplate     from './news.html';

describe('News', () => {
  let $rootScope, makeController;

  beforeEach(window.module(NewsModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new NewsController();
    };
  }));

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('renders goats listing component', () => {
      expect(NewsTemplate).to.match(/<news>/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = NewsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(NewsTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(NewsController);
      });
  });
});
