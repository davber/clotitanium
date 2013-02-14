;; Styles being used for various views.
;; Intended to be used together with the Titanium ClojureScript wrapper (ti.clj)

(ns styles
  (:require ti)
  (:require-macros [macros.ti :as mti]))

;; Please change these globals

(def *default-bg-color* "white")
(def *default-fg-color* "black")
(def *default-bg-image nil)
(def *default-bar-color* "blue")
(def *default-bar-image* nil)

;; This is the global that holds all the styling.
;; We currently have a default setting for the 'stdWin' class, so
;; you can pass a hash like
;;    { :cls "stdWin"}
;; to the creators in the ti module, such as:
;;    (ti/create-view {:cls "stdWin"})
;; Please change and add to this hash to supply styling for all
;; various (CSS-like) classes and IDs you use in your app.

(def *default-config*
  {;; General settings for main views, tab groups and fields
   "stdWin" {:backgroundColor "transparent" :backgroundImage *default-bg-image*
             :barColor *default-bar-color*
             :barImage *default-bar-image* :navBarHidden false}})
