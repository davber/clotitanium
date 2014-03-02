;; We simply try to create a new window...
(ns main
  (:require ti styles
  	[clojure.string :as string]
  	;; TODO: we can ONLY include this namespace for mobileweb deployments!
  	;;[clojure.browser.repl :as repl]
  	))

;; We connect to a REPL server if we reside in a web environment
;;(when (ti/web?) (repl/connect "http://localhost:9191/repl"))

;; We use the UI configutation hosted in the styles namespace; this is pure convention
;; and one could instead have that defined in this same file, but not recommended..."

(ti/init :config styles/*default-config*)
	
;; We just create a simple boring window; see styles/*default-config*
;; for the 'cls' we use
;; NOTE: we use internationalization here for the welcome text.
  
(def *tabs* (map (fn [name]
  (let [label (ti/create-label {:id (str name "-text") :text name})
        win (ti/create-window {:cls (str name "-win") :children [label]})
        tab (ti/create-tab {:title name :id (str name "-tab") :window win})]
    (ti/click label #(ti/set-value label (str "You clicked on " name)))
    tab))
  ["Friends" "Search"]))
(def *main-tabs* (ti/create-tab-group {:cls :stdWin :tabs *tabs*}))
(ti/open *main-tabs*)
