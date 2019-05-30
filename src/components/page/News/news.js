import newsComponent            from './news.component';
import headlineComponent        from './headline/headline.component';
import sourcesComponent        from './sources/sources.component';
import inlineComponent        from './inline/inline.component';
import oneBlockComponent        from './oneblock/oneblock.component';

let newsModule = angular.module('news', [])
.component('news', newsComponent)
.component('headline', headlineComponent)
.component('sources', sourcesComponent)
.component('oneblock', oneBlockComponent)
.component('inline', inlineComponent);


export default newsModule;