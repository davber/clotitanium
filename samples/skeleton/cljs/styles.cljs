;; Styles being used for various views.
;; NOTE: this is just an example, and there is no need to put styling in
;; a separate namespace, but it is a good convention to put styling in
;; this namespace

(ns styles)

(def *default-config*
  {;; General settings for main views, tab groups and fields
   :stdWin {:backgroundColor "red" :backgroundImage nil
             :barColor "black" :layout "vertical"
             :barImage nil :navBarHidden false}
   :welcome-text {:color "blue"}})
