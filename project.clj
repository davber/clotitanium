(defproject clotitanium.dummy "0.0.1"
  :description "Dummy project just to show the paths needed and to compile the library"
  :dependencies [[org.clojure/clojure "1.4.0"]]
  :plugins [[lein-cljsbuild "0.3.0"]]
  :source-paths ["Resources/modules/cljsutils/cljs-macros" "cljs-macros"]
  :cljsbuild {
    :builds [
      {:source-paths ["Resources/modules/cljsutils/cljs"  "cljs" ]
       :compiler {
       	:output-to "target/main.js"
       	:optimizations :whitespace
       	:pretty-print true
        }}]
  })
