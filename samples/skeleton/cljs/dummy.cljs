(ns dummy)

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
