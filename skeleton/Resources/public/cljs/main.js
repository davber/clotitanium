goog.provide('main');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('styles');
goog.require('ti');
main.setup = (function setup(){
return null;
});
/**
* This starts the whole application
*/
main.run = (function run(){
return main.setup.call(null);
});
goog.exportSymbol('main.run', main.run);
