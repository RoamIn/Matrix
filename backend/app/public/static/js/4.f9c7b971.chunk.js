(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{100:function(e,t,a){"use strict";a.r(t);var n=a(43),s=a(6),i=a(7),r=a(9),c=a(8),l=a(10),o=a(0),m=a.n(o),d=a(14),u=a.n(d),h=a(15),v=(a(90),function(e){function t(e){var a,n=e.width,i=void 0===n?"345px":n,l=e.visible,o=void 0!==l&&l;return Object(s.a)(this,t),(a=Object(r.a)(this,Object(c.a)(t).call(this))).state={width:i,visible:o},a}return Object(l.a)(t,e),Object(i.a)(t,[{key:"close",value:function(){this.setState({visible:!1}),this.props.onClose&&this.props.onClose()}},{key:"componentWillReceiveProps",value:function(e){var t=e.visible;this.setState({visible:t})}},{key:"render",value:function(){var e=this,t=u()({"c-drawer":!0,"is-visible":this.state.visible});return m.a.createElement("div",{className:t,style:{width:this.state.width,right:this.state.visible?0:"-".concat(this.state.width)}},m.a.createElement("div",{className:"c-drawer__close-trigger",onClick:function(){return e.close()}},m.a.createElement(h.a,{type:"menu-fold"})),m.a.createElement("div",{className:"c-drawer__body"},this.props.children))}}]),t}(o.Component)),p=(a(91),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(r.a)(this,Object(c.a)(t).call(this))).handleChange=function(e){var t=e.key,n=a.props.onChange;a.setState({activeKey:t}),n&&n(t)},a.state={activeKey:e.defaultActiveKey.activeKey||e.defaultActiveKey||a.default.defaultActiveKey},a}return Object(l.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this.props.activeKey;e.activeKey!==t&&""!==t&&this.setState({activeKey:t})}},{key:"renderHeader",value:function(){var e=this;return m.a.Children.map(this.props.children,function(t,a){var n=t.key===e.state.activeKey?"is-active":null;return m.a.createElement("span",{className:u()("c-tabs__title",n),onClick:function(){e.handleChange(t)}},t.props.title)})}},{key:"renderContent",value:function(){var e=this;return m.a.Children.map(this.props.children,function(t){if(t.key===e.state.activeKey)return m.a.createElement("div",{className:"c-tabs__pane"},t.props.children)})}},{key:"render",value:function(){return m.a.createElement("div",{className:"c-tabs"},m.a.createElement("div",{className:"c-tabs__header"},this.renderHeader()),m.a.createElement("div",{className:"c-tabs__body"},this.renderContent()))}}]),t}(o.Component));p.defaultProps={defaultActiveKey:"1"};var f=p,b=a(44),y=a(45),_=(a(92),function(e){function t(){return Object(s.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return m.a.createElement("ul",{className:"movies"},this.props.list.map(function(t,a){return m.a.createElement("li",{className:"movie",key:a,onClick:function(){return e.props.onClick(t.id)}},m.a.createElement("div",{className:"movie__poster",style:{backgroundImage:"url(".concat(t.images.small||t.images.medium||t.images.large,")")}}),m.a.createElement("div",{className:"movie__footer"},m.a.createElement("div",{className:"movie__title"},t.title),m.a.createElement("span",{className:"movie__rating"},0===t.rating.average?"":t.rating.average)))}))}}]),t}(o.Component)),E=(a(93),window.innerHeight),g=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(r.a)(this,Object(c.a)(t).call(this,e))).handleScroll=function(e){if(!(a.state.isLoading||a.state.noMore||a.state.hasError)){var t=e.target,n=t.scrollHeight,s=t.scrollTop;n-E-s<20&&(console.log("next"),a.search(a.state.params.start+a.state.params.count))}},a.state={list:[],isLoading:!1,noMore:!1,hasError:!1,message:"",params:Object(n.a)({},e.params,{start:0,count:20})},a}return Object(l.a)(t,e),Object(i.a)(t,[{key:"updateLoading",value:function(e){this.setState({isLoading:e})}},{key:"search",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.setState({params:Object(n.a)({},this.state.params,{start:t})}),this.updateLoading(!0),Object(y.a)(this.props.apiName,Object(n.a)({},this.state.params,{start:t,count:this.state.params.count})).then(function(t){var a=t.subjects;e.setState({list:e.state.list.concat(a),noMore:0===a.length})}).catch(function(e){console.log(e.message)}).finally(function(){e.updateLoading(!1)})}},{key:"componentDidUpdate",value:function(e){JSON.stringify(e.params)!==JSON.stringify(this.props.params)&&this.search()}},{key:"componentDidMount",value:function(){this.search()}},{key:"render",value:function(){var e=this.state.isLoading;return m.a.createElement("section",{className:"movie-stage",onScroll:this.handleScroll},m.a.createElement("div",{className:"movie-stage__body"},m.a.createElement(_,{list:this.state.list,onClick:this.props.onClick}),e&&m.a.createElement(b.a,{loading:e})))}}]),t}(o.Component),N=a(38),j=a(41),O=(a(94),function(e){function t(){return Object(s.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){for(var e=Math.ceil(this.props.rate),t=[],a=[],n=u()("c-rate",this.props.className),s=0;s<parseInt(e/2);s++)t.push(m.a.createElement(h.a,{type:"star",key:s}));for(var i=0;i<5-parseInt(e/2)-e%2;i++)a.push(m.a.createElement(h.a,{type:"star-outline",key:i}));return m.a.createElement("div",{className:n},t,e%2===1&&m.a.createElement(h.a,{type:"star-half"}),a,m.a.createElement("span",{className:"c-rate__num"},this.props.rate))}}]),t}(o.Component)),k=(a(95),function(e){function t(){return Object(s.a)(this,t),Object(r.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return m.a.createElement("div",{className:"c-celebrities"},this.props.list.map(function(e,t){return m.a.createElement("div",{className:"c-celebrity",key:e.id},m.a.createElement("div",{className:"c-celebrity__avatar",style:{backgroundImage:"url(".concat(e.avatars.small,")")},alt:e.name}),m.a.createElement("div",{className:"c-celebrity__name"},e.name))}))}}]),t}(o.Component));k.defaultProps={list:[]};var w=k,C=(a(96),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(r.a)(this,Object(c.a)(t).call(this))).state={id:0,data:{countries:[],directors:[],casts:[],genres:[],images:[],aka:[],rating:{}},isLoading:!1},a}return Object(l.a)(t,e),Object(i.a)(t,[{key:"updateLoading",value:function(e){this.setState({isLoading:e})}},{key:"getMovieDetail",value:function(e){var t=this;if(0===e)return!1;this.updateLoading(!0),Object(y.a)("get_movie_detail",{id:e}).then(function(e){t.setState({data:e})}).catch(function(e){console.log(e.message)}).finally(function(){t.updateLoading(!1)})}},{key:"componentWillReceiveProps",value:function(e){var t=e.id;this.setState({id:t}),this.getMovieDetail(t)}},{key:"render",value:function(){var e=this.state,t=e.isLoading,a=e.data,n=null;return n=t?m.a.createElement(b.a,{loading:t}):m.a.createElement("div",{className:"movie-detail"},m.a.createElement("div",{className:"movie-detail__header"},a.title),m.a.createElement("div",{className:"movie-detail__body"},m.a.createElement("div",{className:"movie-detail__poster",alt:"poster",style:{backgroundImage:"url(".concat(a.images.small,")")}}),m.a.createElement("div",{className:"card"},m.a.createElement("div",{className:"card__body"},m.a.createElement("div",{className:"detail-info-item"},m.a.createElement("span",{className:"detail-info-item__label"},"\u8c46\u74e3\u8bc4\u5206: "),m.a.createElement("span",{className:"detail-info-item__text"},m.a.createElement(O,{rate:a.rating.average}))),m.a.createElement("div",{className:"detail-info-item"},m.a.createElement("span",{className:"detail-info-item__label"},"\u7c7b\u578b: "),m.a.createElement("span",{className:"detail-info-item__text"},a.genres.join(" / "))),m.a.createElement("div",{className:"detail-info-item"},m.a.createElement("span",{className:"detail-info-item__label"},"\u5236\u7247\u56fd\u5bb6/\u5730\u533a: "),m.a.createElement("span",{className:"detail-info-item__text"},a.countries.join(" / "))),m.a.createElement("div",{className:"detail-info-item"},m.a.createElement("span",{className:"detail-info-item__label"},"\u4e0a\u6620\u65e5\u671f: "),m.a.createElement("span",{className:"detail-info-item__text"},a.year)),m.a.createElement("div",{className:"detail-info-item"},m.a.createElement("span",{className:"detail-info-item__label"},"\u53c8\u540d: "),m.a.createElement("span",{className:"detail-info-item__text"},a.aka.join(" / "))))),m.a.createElement("div",{className:"card"},m.a.createElement("h4",{className:"card__title"},"\u5bfc\u6f14"),m.a.createElement("div",{className:"card__body"},m.a.createElement(w,{className:"directors",list:a.directors}))),m.a.createElement("div",{className:"card"},m.a.createElement("h4",{className:"card__title"},"\u4e3b\u6f14"),m.a.createElement("div",{className:"card__body"},m.a.createElement(w,{className:"casts",list:a.casts}))),m.a.createElement("div",{className:"card"},m.a.createElement("h4",{className:"card__title"},"\u5267\u60c5\u7b80\u4ecb"),m.a.createElement("div",{className:"card__body"},m.a.createElement("p",{className:"summary"},a.summary)))),m.a.createElement("div",{className:"movie-detail__footer"},m.a.createElement(N.a,{className:"search-button",to:{pathname:"/magnet",search:"?title=".concat(this.state.data.title)},target:"_blank"},"Search Magnet"))),m.a.createElement("div",{className:"movie-detail-wrapper"},n)}}]),t}(o.Component)),S=Object(j.a)(C),K=(a(97),function(e){function t(){var e,a;Object(s.a)(this,t);for(var i=arguments.length,l=new Array(i),o=0;o<i;o++)l[o]=arguments[o];return(a=Object(r.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).state={movieTypeList:[{api:"in_theaters",name:"\u6b63\u5728\u70ed\u6620"},{api:"coming_soon",name:"\u5373\u5c06\u4e0a\u6620"},{api:"top250",name:"Top250"}],movieId:0,tabsActiveKey:"",searchBarInputValue:"",params:{q:""},drawer:{width:"345px",visible:!1}},a.handleViewMovie=function(e){a.setState({movieId:e}),a.showDrawer()},a.handleDrawerClose=function(){a.setState({drawer:Object(n.a)({},a.state.drawer,{visible:!1})})},a.handleSearchBarInputChange=function(e){var t=e.target.value.trim();a.setState({searchBarInputValue:t})},a.handleSubmit=function(e){e.preventDefault();var t=a.state.searchBarInputValue;""!==t&&a.setState({tabsActiveKey:"search",params:{q:t}})},a.handleTabsChange=function(e){e!==a.state.tabsActiveKey&&a.setState({tabsActiveKey:"",searchBarInputValue:""})},a}return Object(l.a)(t,e),Object(i.a)(t,[{key:"showDrawer",value:function(){this.setState({drawer:Object(n.a)({},this.state.drawer,{visible:!0})})}},{key:"render",value:function(){var e=this,t=""!==this.state.searchBarInputValue,a=u()({"search-bar__input":!0,active:t});return m.a.createElement("div",{className:"page-movies"},m.a.createElement("div",{className:"page-movies__body"},m.a.createElement("form",{className:"search-bar",onSubmit:this.handleSubmit},m.a.createElement("input",{className:a,autoComplete:"off",type:"text",placeholder:"Search...",value:this.state.searchBarInputValue,onChange:this.handleSearchBarInputChange}),m.a.createElement("div",{className:"search-bar__button"},m.a.createElement(h.a,{type:"search"}))),m.a.createElement(f,{defaultActiveKey:"in_theaters",activeKey:this.state.tabsActiveKey,onChange:this.handleTabsChange},this.state.movieTypeList.map(function(t){return m.a.createElement("div",{title:t.name,key:t.api},m.a.createElement(g,{apiName:t.api,onClick:e.handleViewMovie}))}),m.a.createElement("div",{title:"",key:"search"},m.a.createElement(g,{apiName:"search",params:this.state.params,onClick:this.handleViewMovie})))),m.a.createElement("div",{className:"page-movies__drawer",style:{width:this.state.drawer.visible?this.state.drawer.width:0}},m.a.createElement(v,{width:this.state.drawer.width,visible:this.state.drawer.visible,onClose:this.handleDrawerClose},m.a.createElement(S,{id:this.state.movieId}))))}}]),t}(o.Component));t.default=K},44:function(e,t,a){"use strict";var n=a(6),s=a(7),i=a(9),r=a(8),c=a(10),l=a(0),o=a.n(l),m=a(14),d=a.n(m),u=(a(46),function(e){function t(){return Object(n.a)(this,t),Object(i.a)(this,Object(r.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=d()({"c-spin":!0,spinning:this.props.loading});return o.a.createElement("div",{className:e},o.a.createElement("div",{className:"c-spin__box"},o.a.createElement("span",{className:"c-spin__animate"},o.a.createElement("div",{className:"primary primary-red"}),o.a.createElement("div",{className:"primary primary-green"}),o.a.createElement("div",{className:"primary primary-blue"}))))}}]),t}(l.Component));t.a=u},45:function(e,t,a){"use strict";var n=a(48),s=a.n(n),i=a(43),r=Object(i.a)({baseURL:""},{getMagnetByTitle:{method:"GET",desc:"\u901a\u8fc7\u6807\u9898\u641c\u7d22\u78c1\u529b\u94fe\u63a5",url:"/api/magnet/getByTitle"}},{in_theaters:{method:"GET",desc:"\u6b63\u5728\u70ed\u6620",url:"/v2/movie/in_theaters"},coming_soon:{method:"GET",desc:"\u5373\u5c06\u4e0a\u6620",url:"/v2/movie/coming_soon"},weekly:{method:"GET",desc:"\u53e3\u7891\u699c[\u9700\u8981\u6743\u9650]",url:"/v2/movie/weekly"},new_movies:{method:"GET",desc:"\u65b0\u7247\u699c[\u9700\u8981\u6743\u9650]",url:"/v2/movie/new_movies"},top250:{method:"GET",desc:"Top250",url:"/v2/movie/top250"},us_box:{method:"GET",desc:"\u5317\u7f8e\u7968\u623f\u699c",url:"/v2/movie/us_box"},search:{method:"GET",desc:"",url:"/v2/movie/search"},get_movie_detail:{method:"GET",desc:"\u83b7\u53d6\u7535\u5f71\u8be6\u60c5",suffix:"id",url:"/v2/movie/subject/:id"}}),c=s.a.create({baseURL:r.baseURL,headers:{"Content-Type":"json"}});function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Date.now().toString(16);return Object.assign({},e,{token:t})}c.interceptors.request.use(function(e){switch(e.method){case"put":case"post":case"patch":e.data=l(e.data);break;default:e.params=l(e.data)}return e},function(e){return alert("\u7f51\u7edc\u9519\u8bef\n".concat(e.message)),Promise.reject(e)}),c.interceptors.response.use(function(e){return e.data},function(e){if("undefined"===typeof e.response)return alert("\u7f51\u7edc\u9519\u8bef\n".concat(e.message,"\n").concat(e.config.url)),Promise.reject(e);switch(e.response.status){case 403:alert(403);break;default:alert("\u7f51\u7edc\u9519\u8bef\n".concat(e.response.status,"\n").concat(e.response.config.url))}return Promise.reject(e)});t.a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=r[e],n=r[e],s=n.url,i=n.method;return"undefined"!==typeof a.suffix&&""!==a.suffix&&(s=s.replace(":".concat(a.suffix),t[a.suffix])),c({url:s,method:i,data:t})}},46:function(e,t,a){},90:function(e,t,a){},91:function(e,t,a){},92:function(e,t,a){},93:function(e,t,a){},94:function(e,t,a){},95:function(e,t,a){},96:function(e,t,a){},97:function(e,t,a){}}]);
//# sourceMappingURL=4.f9c7b971.chunk.js.map