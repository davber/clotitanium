/*
 * This is the entry point for the LoudBooks Titanium app.
 * 
 * The main logic is in ClojureScript, in the cljs and cljs-macros
 * directories
 */

if (Ti.version < 3.0)
  alert('Sorry - this application requires Titanium Mobile SDK 3.0 or later');

// TODO: the generation phase of Titanium seems to look at this file
// specifically for the UI modules to include - at least when compiling for
// device instead of simulator - so we use some dummy references here

var dummy = [Titanium.UI.createTabGroup, Titanium.UI.createTab,
  Titanium.UI.createTextField, Titanium.UI.createTextArea, Titanium.UI.createToolbar,
  Titanium.UI.createTableView, Titanium.UI.createTableViewRow, Titanium.UI.createTableViewSection,
  Titanium.UI.createScrollView, Titanium.UI.createScrollableView, Titanium.UI.createLabel,
  Titanium.UI.createImageView, Titanium.UI.createWebView,
  Titanium.UI.createScrollBar,
  Titanium.UI.createSwitch, Titanium.Facebook,
  Titanium.UI.createButton, Titanium.UI.ActivityIndicatorStyle,
  Titanium.UI.createActivityIndicator, Titanium.UI.ActivityIndicatorStyle,
  Titanium.UI.iOS, Titanium.UI.iPhone];
var iOSDummy = Titanium.UI.iOS ?
  [Titanium.UI.createButtonBar, Titanium.UI.iOS.createToolbar, Titanium.UI.iOS.createCoverFlowView] :
  [];
var iPhoneDummy = Titanium.UI.iPhone ?
  [Titanium.UI.iPhone.RowAnimationStyle, Titanium.UI.iPhone.ActivityIndicatorStyle] :
  [];
  
var dummy2 = [Titanium.Stream, Titanium.Media, Titanium.Media.showCamera,
  Titanium.Media.hideCamera];

Ti.include("logic.js");


// Now it is high time to actually call into the main (Clojure-based) logic

main.run();