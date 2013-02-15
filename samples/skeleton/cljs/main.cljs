;; We simply try to create a new window...
(ns main
  (:require ti styles))

(when (< Titanium/version 3.0)
  (js/alert "Sorry - this application requires Titanium Mobile SDK 3.0 or later"))
 
;; TODO: the generation phase of Titanium seems to look at this file
;;  specifically for the UI modules to include - at least when compiling for
;; device instead of simulator - so we use some dummy references here

(def *dummy* [Titanium.UI/createTabGroup Titanium.UI/createTab
  Titanium.UI/createTextField Titanium.UI/createTextArea Titanium.UI/createToolbar
  Titanium.UI/createTableView Titanium.UI/createTableViewRow Titanium.UI/createTableViewSection
  Titanium.UI/createScrollView Titanium.UI/createScrollableView Titanium.UI/createLabel
  Titanium.UI/createImageView Titanium.UI/createWebView
  Titanium.UI/createScrollBar
  Titanium.UI/createSwitch Titanium/Facebook
  Titanium.UI/createButton Titanium.UI/ActivityIndicatorStyle
  Titanium.UI/createActivityIndicator Titanium.UI/ActivityIndicatorStyle
  Titanium.UI/iOS Titanium.UI/iPhone])

(def *ios-dummy* (when Titanium.UI/iOS
  [Titanium.UI/createButtonBar Titanium.UI.iOS.createToolbar Titanium.UI.iOS.createCoverFlowView]))

(def *iphone-dummy* (when Titanium.UI/iPhone
  [Titanium.UI.iPhone/RowAnimationStyle Titanium.UI.iPhone/ActivityIndicatorStyle]))

(def *dummy2* [Titanium/Stream Titanium/Media Titanium.Media/showCamera
  Titanium.Media/hideCamera])


;;
;; Setting up the Clotitanium layer
;;

;; We use the UI configutation hosted in the styles namespace; this is pure convention
;; and one could instead have that defined in this same file, but not recommended..."

(ti/init :config styles/*default-config*)
	
;; We just create a simple boring window; see styles/*default-config*
;; for the 'cls' we use
;; NOTE: we use internationalization here for the welcome text.
  
(let [win (ti/create-window {:cls "stdWin" :children [(ti/create-label {:cls "welcome-text" :text (ti/l "Welcome!")})]})]
  (ti/open win))