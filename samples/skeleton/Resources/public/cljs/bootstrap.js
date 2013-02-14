goog.addDependency("base.js", ['goog'], []);
goog.addDependency("../cljs/core.js", ['cljs.core'], ['goog.string', 'goog.array', 'goog.object', 'goog.string.StringBuffer']);
goog.addDependency("../clojure/string.js", ['clojure.string'], ['cljs.core', 'goog.string', 'goog.string.StringBuffer']);
goog.addDependency("../ti.js", ['ti'], ['cljs.core', 'clojure.string', 'utils']);
goog.addDependency("../styles.js", ['styles'], ['ti', 'cljs.core']);
goog.addDependency("../main.js", ['main'], ['ti', 'cljs.core', 'styles', 'clojure.string']);