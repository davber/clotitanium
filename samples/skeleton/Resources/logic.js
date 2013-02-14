//
// This file includes both the Closure and ClojureScript
// frameworks, AND also our main module, 'wallt' (defined
// in main.js)
//

// The base files and goog files are only generated for unoptimized compilation,
// whereas when optimizing, all that code ends up in bootstrap.js

var baseFiles = ["/public/cljs/goog/base.js", "/public/cljs/goog/deps.js"];
var bootstrapFiles = ["/public/cljs/bootstrap.js"];
var googFiles = ["/public/cljs/goog/useragent/jscript.js",
  "/public/cljs/goog/string/string.js",
  "/public/cljs/goog/i18n/datetimesymbols.js",
  "/public/cljs/goog/date/date.js",
  "/public/cljs/goog/string/stringbuffer.js",
  "/public/cljs/goog/object/object.js"];
  
// TODO: why do we have to explicitly include these
// files!? Should that not be handled by the 'goog.require'?
var moduleFiles = ["/public/cljs/cljs/core.js",
  "/public/cljs/clojure/string.js", "/public/cljs/clojure/walk.js",
  "/public/cljs/clojure/set.js",
  "/public/cljs/ti.js",
  "/public/cljs/styles.js",
  "/public/cljs/main.js"];

var unoptFileGroups = [baseFiles, bootstrapFiles, googFiles, moduleFiles];
var optFileGroups = [bootstrapFiles, moduleFiles];
var fileGroups = unoptFileGroups;

// This function creates Titanium File objects all the way to the leaf
// and 
function getDeepFile(path) {
  var segments = path.split("/");
  var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + segments[0]);
  Ti.API.debug("top-level file exists is " + file.exists() + ": " + file.resolve());
  for (i = 1; i < segments.length; ++i) {
    file = Ti.Filesystem.getFile(file.resolve(), segments[i]);
    Ti.API.debug("nested file exists is " + file.exists() + ": " + file.resolve());
  }
  return file;
}

function optInclude(name) {
  var relName = name[0] == '/' ? name.substring(1) : name;
  var file = getDeepFile(relName);
  Ti.API.debug("trying to include file " + file.resolve());
  if (true || file.exists()) {
    try {
      Ti.include(name);
      Ti.API.debug("included file " + name);
    } catch (err) {
      Ti.API.warn("could not include file " + name);
    }
  }
}

var resDir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory);
Ti.API.debug("resources directory exists is " + resDir.exists() + ": " + Ti.Filesystem.resourcesDirectory);
Ti.API.debug("files there are " + resDir.getDirectoryListing());

var fi, k;
for (fi = 0; fi < fileGroups.length; fi++)
  for (k = 0; k < fileGroups[fi].length; k++)
    optInclude(fileGroups[fi][k]);
