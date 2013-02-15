;; We simply try to create a new window...
(ns main
  (:require ti styles))

(when (< Titanium/version 3.0)
  (js/alert "Sorry - this application requires Titanium Mobile SDK 3.0 or later"))

;; We use the UI configutation hosted in the styles namespace; this is pure convention
;; and one could instead have that defined in this same file, but not recommended..."

(ti/init :config styles/*default-config*)
	
;; We just create a simple boring window; see styles/*default-config*
;; for the 'cls' we use
;; NOTE: we use internationalization here for the welcome text.
  
(let [win (ti/create-window {:cls "stdWin" :children [(ti/create-label {:cls "welcome-text" :text (ti/l "Welcome!")})]})]
  (ti/open win))