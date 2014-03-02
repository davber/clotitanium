(defproject skeleton "0.0.1"
  :description "Skeleton sample for the Clotitanium library"
  :dependencies [[org.clojure/clojure "1.5.1"] [org.clojure/clojurescript "0.0-2156"]]
  :plugins [[lein-cljsbuild "1.0.2"]]
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
