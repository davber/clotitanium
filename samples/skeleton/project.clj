(defproject skeleton "0.0.1"
  :description "Skeleton sample for the Clotitanium library"
  :dependencies [[org.clojure/clojure "1.4.0"]]
  :plugins [[lein-cljsbuild "0.3.0"]]
  :source-paths ["../../modules/cljsutils/cljs-macros" "../../cljs-macros"]
  :cljsbuild {
    :repl-listen-port 9191
    :builds [
      {:source-paths ["../../modules/cljsutils/cljs"  "../../cljs" "cljs"]
       :compiler {
       	:output-to "Resources/app.js"
       	:optimizations :whitespace
       	:pretty-print true
        }}]
  })
