import EdspHelloModule from './src/index';

/* istanbul ignore next */
EdspHelloModule.install = function(Vue) {
  Vue.component(EdspHelloModule.name, EdspHelloModule);
};

export default EdspHelloModule;
