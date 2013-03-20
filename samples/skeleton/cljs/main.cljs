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
  
(def *account-win* (ti/create-window {:cls :account-win :children [(ti/create-label {:id :welcome-text :text "Welcome!"})]}))
(def *tabs* (map #(ti/create-tab {:title % :id (str % "-tab")}) ["Friends" "Search"]))
(def *main-tabs* (ti/create-tab-group {:cls :stdWin :tabs (conj *tabs* (ti/create-tab {:window *account-win*}))}))
(ti/click :welcome-text #(ti/set-value :welcome-text "You clicked, sir!"))
(ti/open *main-tabs*)

