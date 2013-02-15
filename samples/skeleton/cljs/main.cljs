;; We simply try to create a new window...
(ns main
  (:require ti styles [clojure.string :as string]))
 
(defn- setup []
	;; Some setup logic
)


(defn ^:export run
  "This starts the whole application"
  []
  (setup)
	;; Run!
)
