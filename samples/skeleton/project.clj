(defproject skeleton "0.0.1"
  :description "Skeleton sample for the Clotitanium library"
  :dependencies [[org.clojure/clojure "1.4.0"]]
  :plugins [[lein-cljsbuild "0.3.0"]]
  :source-paths ["../../Resources/modules/cljsutils/cljs-macros" "../../cljs-macros"]
  :cljsbuild {
    :builds [
      {:source-paths ["../../Resources/modules/cljsutils/cljs"  "../../cljs" "cljs" ]
       :compiler {
       	:output-to "Resources/public/cljs/main.js"
       	:optimizations :whitespace
       	:pretty-print true
        }}]
  })