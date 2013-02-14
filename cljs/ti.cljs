(ns ti
  (:require [clojure.string :as string] [utils :as utils])
  (:require-macros [macros.utils :as mu])
  (:use-macros [macros.ti :only [debug warn] :as macros]))

(def *platform* {:osname Titanium.Platform/osname
                 :version Titanium.Platform/version
                 :width Titanium.Platform.displayCaps/platformWidth
                 :height Titanium.Platform.displayCaps/platformHeight})

(defn iphone? [] (= (:osname *platform*) "iphone"))
(defn ipad? [] (= (:osname *platform*) "ipad"))
(defn ios? [] (or (iphone?) (ipad?)))
(defn android? [] (= (:osname *platform*) "android"))

(def FILL Titanium.UI/FILL)
(def SIZE Titanium.UI/SIZE)

;; Some forward-declared variables
 (declare get-prop-string)
 (declare create)
 (declare create-view)

(defn l
  "Get the internationalized string for the given property"
  [prop]
  (js/L prop))

(declare *my-cards*)
(def *cloud* (js/require "ti.cloud"))
(when *cloud* (set! (.-debug *cloud*) true))

(declare *twitter-client*)
;; NOTE: you need to setup Twitter via "init-twitter"
(declare *twitter-consumer-key*)
(declare *twitter-consumer-secret*)
(defn init-twitter [consumer-key consumer-secret]
  (def *twitter-consumer-key* consumer-key)
  (def *twitter-consumer-secret* consumer-secret))

(def *default-config* {})
(defn set-default-config
  "Set the default configurations to the given map"
  [configs]
  (def *default-config* configs))

;; Get default settings for the given class (or classes), where
;; the values are fetched from styles/*default-config*
(defn- default-config
  "Get default configuration for specific classes"
  [clses]
  (apply merge (map (partial get *default-config*) (string/split clses #" "))))

;; Containts a mapping from selectors to the actual views. The selectors are
;; either strings or maps with :selector and :context
(def ^:private *views* (atom {}))

(defn- extend-config
  "Extend the given configuration based on :cls, including setting the :cls
property from the :id property if not given"
  [opts]
  
  ;; We get the options for all classes and the ID and merge those with
  ;; the explicit options
  
  (let [explicit-clses (if (empty? (:cls opts)) [] (string/split (:cls opts) #" "))
        derived-clses (if (empty? (:id opts)) [] [(:id opts)])
        clses (set (concat explicit-clses derived-clses))
        cls-opts (map default-config clses)]
    (merge (apply merge cls-opts) opts)))

(defn ^:export auto-purge?
  "Decide whether a view should be auto-purged upon closing.
NOTE: it is currently only looking for a property 'autoPurge' in the view (proxy) object"
  [view]
  (.-autoPurge view))

(defn ^:export set-auto-purge!
  "State that the given view should be auto-purged upon closure"
  [view]
  (set! (.-autoPurge view) true))

(defn- cache-view
  "Cache a view given the passed selector, which is currently
assumed to be the :id.
NOTE: it is automatically invoked upon creation of views, which can have a special :context key as one of the
creation options, basically making the view unique relative a context (view)"
  [selector view]
  (swap! *views* assoc selector view))

(defn ^:export uncache-view
  "Uncache a view, which includes all other views that has this as its context.
NOTE: this uncaching is invoked automatically wheneer a view marked with an 'autoPurge' property
is closed.
NOTE: one can also invoke it explicitly such as when removing a sub view from a parent!"
  [view & {:keys [include-context] :or {include-context true}}]
  (let [relevant-sel (for [[sel v] @*views* :when (or (= v view)
                                                      (and include-context (map? sel) (= (:context sel) view)))]
                       sel)]
    (debug "ti/uncache-view of view " view)
    (debug "Before # views: " (count @*views*))
    (swap! *views* #(apply dissoc % relevant-sel))
    (debug "After # views: " (count @*views*))))

(defn ^:export purge-view
  "Removes a view completely, including removing listeners and all the native UI elements
referred to by the (proxy) view.
This includes calling uncache-view"
  [view]
  (uncache-view view))

(defn- select-view
  "Select the view based on the given selector.
NOTE: this is always zero or one view.
TODO: right now we assume the selector is the :id of a view"
  [selector]
  (get @*views* selector))

(defn get-view
  "Get the view associated with the parameter, which could either
be the value itself, if a view, or the view corresponding to the
pattern/selector of that value, if a string."
  [selector]
  (let [view (or (select-view selector) selector)]
    (when ((some-fn map? not string?) view)
      (throw (js/Error. (str "could not find view for selector " selector))))
    view))
      

;; TODO: use either multi method or protocol instead of this explicit
;; fetching of views

(defn bind [view event handler] (.addEventListener (get-view view) event
                                  (comp handler utils/cljify)))
(defn click [view handler] (bind view "click" handler))
(defn add [view & sub-views]
  (let [view (get-view view)]
    (doseq [v sub-views]
      (.add view (get-view v)))))
(defn add-tab [view & tabs]
  (let [view (get-view view)]
    (doseq [t tabs]
      (.addTab view (get-view t)))))
(defn remove-tab [view & tabs]
  (let [view (get-view view)]
    (doseq [t tabs]
      (.removeTab view (get-view t)))))
(defn descendant-views [view]
  (let [children (.-children view)
        nested (concat children (mapcat descendant-views children))]
    nested))
(defn sections [view]
  (.-data (get-view view)))
(defn set-data [view data]
  (let [view (get-view view)]
    (.setData view (utils/jsify (or data [])))))
(defn append-row [view row & {:as opts}]
  (let [view (get-view view)
        js-opts (utils/jsify opts)]
    (.appendRow view row js-opts)))
(defn delete-row [view row & {:as opts}]
  (let [view (get-view view)
        js-opts (utils/jsify opts)
        row (get-view row)]
    (.deleteRow view row js-opts)
    (when (auto-purge? row) (purge-view row))))
(defn fb-login-button [& {:as opts}]
  (.createLoginButton Titanium/Facebook (utils/jsify opts)))
(defn fb-authorize [] (.authorize Titanium/Facebook))
(defn fb-token [] Titanium.Facebook/accessToken)
(defn fb-logout [] (.logout Titanium/Facebook))
(defn fb-logged-in? [] Titanium.Facebook/loggedIn)
(defn fb-bind
  "Register a listener for FB events"
  [evt cb]
  (.addEventListener Titanium/Facebook evt (comp cb utils/cljify)))
(defn fb-request [path opts & {:keys [method cb] :or {method "POST"}}]
  (let [real-cb (or cb #(debug (str "FB request " path " with opts " opts " yielded event ") %))]
    (.requestWithGraphPath Titanium/Facebook path
      (utils/jsify opts) (or method "POST") (comp real-cb utils/cljify))))
(defn fb-message [msg & {:keys [cb link picture]}]
  (fb-request "me/feed" {:message msg :link link :picture picture} :cb cb))
;;
;; TODO: we should not repeat virtually identical logic for FB and Twitter
;; TODO: the Twitter integration is outside the Titanium library so it does not belong
;; in this wrapper module
;;
(declare twitter-logout)
(declare twitter-bind)
(defn twitter-authorize [] (.authorize *twitter-client*))
(defn twitter-logged-in? [] (get-prop-string "twitterAccessTokenKey"))
(defn twitter-login-button
  "Creates a Twitter login button, that handles the action and propagates the corresponding
login event to all listeners registered on Twitter.
NOTE: first argument is the UI creator for image views, accepting a hash of options"
  [image-view-creator & {:as opts}]
  (let [but (image-view-creator opts)
        flipImage #(set! (.-image but) (str "/images/twitter-" (if % "out" "in") ".png"))]
    (flipImage (twitter-logged-in?))
    (ti/click but (fn [e] (debug "clicking Twitter button when logged in is " (twitter-logged-in?))
                    (if (twitter-logged-in?) (twitter-logout) (twitter-authorize))))
    (twitter-bind "login" #(if (:success %) (flipImage true) (warn (str "Could not login to Twitter: " (:error %)))))
    (twitter-bind "logout" (fn [e] () (when (:success e) (flipImage false))))
    but))
(defn twitter-logout
  []
  (.fireEvent *twitter-client* "logout" (utils/jsify {:success true})))
(defn twitter-bind
  "Listen to a specific event from the Twitter 'sub system'"
  [evt cb]
  (.addEventListener *twitter-client* evt (comp cb utils/cljify)))
(defn twitter-message [msg & {:keys [cb source link picture]}]
  (.request *twitter-client* "1.1/statuses/update.json" (utils/jsify {:status msg}) "POST" cb))
                                                   
(defn open
  ([view] (.open (get-view view)))
  ([view opts] (.open (get-view view) (utils/jsify opts))))
(defn value
  "Get the value from the field, which could be a 'value' or 'text', depending
on the field type"
  [view]
  (let [view (get-view view)]
    (if (nil? (.-value view)) (.-text view) (.-value view))))
(defn set-val
  "Set the value of a field, which could its 'value' or 'text' property,
depending on the type of field"
  [view value]
  (let [view (get-view view)]
    ;; TODO: decide whether to use 'value' or 'text' based on some meta data
    ;; instead of trying both paths
    (when (.-setValue view)
      (.setValue view value))
    (when (.-setText view)
      (.setText view value))))
(defn rows [table-view]
  (mapcat #(.-rows %) (sections table-view)))
(defn open [view]
  (.open (get-view view)))
(defn close
  ([view] (let [view (get-view view)]
            (.close view)
            (debug "ti/close of view " view)
            (when (auto-purge? view) (purge-view view))))
  ([view opts]
    (let [view (get-view view)]
     (debug (str "close with opts " opts " and view ") view)
     (.close view (utils/jsify opts))
     (when (auto-purge? view) (purge-view view)))))
(defn animate
  "Animate an open view based on the passed configuration"
  [view opts]
  (let [anim (.createAnimation Titanium/UI (utils/jsify opts))]
    (.animate (get-view view) anim)))
(defn open-animate
  "Open a view with an animation based on the passed configuration"
  [view opts]
  (let [anim (.createAnimation Titanium/UI (utils/jsify opts))]
    (.open (get-view view) anim)))
(defn show-camera
  "Show the camera, with an optional :take-now key to just take the picture without showing a camera UI"
  [& [opts & {:keys [take-now]}]]
  (let [success-cb (:success opts)
        success-cb (when success-cb (comp success-cb utils/cljify))
        opts (if success-cb (assoc opts :success success-cb) opts)
        error-cb (:error opts)
        error-cb (when error-cb (comp error-cb utils/cljify))
        opts (if error-cb (assoc opts :error error-cb) opts)]
    (if take-now
      (.takePicture Titanium/Media (utils/jsify opts))
      (.showCamera Titanium/Media (utils/jsify opts)))))
(defn hide-camera
  "Hide the camera"
  []
  (debug "about to hide camera")
  (.hideCamera Titanium/Media)
  (debug "did hide camera"))
(defn camera-supported?
  "Does the device has a camera?"
  []
  (.-isCameraSupported Titanium/Media))
(defn show-alert
  "Shows a regular alert dialog"
  [& msgs]
  (js/alert (apply str msgs)))
(defn temp-path
  "Get the path to a temporary file with the given base name and extension"
  [name ext]
  (str (.getTempDirectory Titanium/Filesystem) (.getSeparator Titanium/Filesystem)
       name "_"  (utils/uuid) "." ext))
(defn file
  "Get file corresponding to the given path"
  [path]
  (.getFile Titanium/Filesystem path))
(defn file->blob
  "Creates a blob from a (transient TIFile) file object"
  [file]
  ;; The blob property and associated file is quite temporary, and it doesn't even help
  ;; to read in a blob from the file, since that will use a cached version which will
  ;; be disposed of soon; so we need to copy the file into a new temporary file and use that
  ;; temporary file as a 'blob'
  (let [temp-blob (.-blob file)
        in-file (.-file temp-blob)
        path (temp-path "imported" (.extension in-file))
        out-file (ti/file path)]
    (debug "file->blob with in file " (when file (.resolve in-file)))
    (debug "... and blob size (pixels) " (when temp-blob (.-size temp-blob)))
    (debug "... and blob length (bytes) " (when temp-blob (.-length temp-blob)))
    (.move in-file path)
    (.read out-file)))
(defn kill-blob
  "Reclaim all space associated with a blob, including any associated file"
  [blob]
  (debug "kill-blob of blob " blob)
  (when-let [file (.-file blob)]
    (let [ok (.deleteFile file)]
      (debug "kill-blob deleted file -> " ok))))
(defn get-prop-string
  "Get a string property"
  [prop]
  (.getString Titanium.App/Properties prop))
(defn set-prop-string
  "Set a string property"
  [prop value]
  (.setString Titanium.App/Properties prop value))
(defn create-button-bar
  "We wrap creation of button bars to support non-iOS targets"
  [& [opts]]
  (if (ios?)
    (create "button-bar" opts)
    (let [view (create-view opts)]
      view)))

;; A helper to create toolbars

(defn toolbar [opts]
  (if (js* "Titanium.UI.iOS")
    (create "toolbar" "iOS" opts)
    (let [opts (assoc opts :layout "horizontal")
          view (create-view opts)]
      (when-let [children (:items opts)]
        (apply add view children))
      view)))


(defn ^:export ui-creator
  "This will get the creator function for the given Ti element type and an optional
platform string if a nestedly named creator is sought, such as 'iOS'"
  [type-name & [platform]]
  (let [cameled (utils/camelize (name type-name) :capitalize-first true)
        creatorname (str "create" cameled)]
    (fn [opts]
      (let [opts-all (extend-config opts)
            context (:context opts-all)
            children (:children opts-all)
            opts (dissoc opts-all :context :children)
            jsopts (utils/jsify opts)
            view (if platform
                    (js* "Titanium.UI[~{platform}][~{creatorname}](~{jsopts})")
                    (js* "Titanium.UI[~{creatorname}](~{jsopts})"))]
        (when-let [id (:id opts)]
          (let [selector (if context {:selector id :context context} id)]
            (cache-view selector view)))
        (when children (apply add view children))
        view))))

(defn ^:export create
  "A general creator of Ti UI elements, where the name of the element type is provided
 as the first argment. There is also an options hash required as second
 argument.
 NOTE: we allow for both a string and symbol as the type, and
 actually allow for key symbols as well, such as
     :tab-group"
  ([type-name opts]
    ((ui-creator type-name) opts))
  ([type-name platform opts]
    ((ui-creator type-name platform) opts)))

;; TODO: provide a macro that generates these various information
;; points

(defn ^:export info
  "Shows information message, using Ti.App.info"
  ([msg] (macros/log-via :info msg))
  ([msg obj] (macros/log-via :info (str msg (pr-str obj))) obj))

(defn ^:export warn
  "Shows warning message, using Ti.App.warn"
  ([msg] (macros/log-via :warn msg))
  ([msg obj] (macros/log-via :warn (str msg (pr-str obj))) obj))

(defn ^:export error
  "Shows error message, using Ti.App.error"
  ([msg] (macros/log-via :error msg))
  ([msg obj] (macros/log-via :error (str msg (pr-str obj))) obj))

(defn ^:export debug
  "Shows debug message, using Ti.App.debug.
 NOTE: we also have a special two-parameter version which expects a value to output as
 second argument, and will return that value, enabling threaded syntax."
  ([msg] (macros/log-via :debug msg))
  ([msg obj] (macros/log-via :debug (str msg (pr-str obj))) obj))

(defn ^:export nullify
  "A null operation, whose primary purpose is to allow for quick replacement of debug output calls"
  [& args])

(defn ^:export nullstr
  "A null operator replacement for the 'str' operator"
  [& args])

;; We setup a few convenience UI creators
(macros/create-creator :window :tab-group :tab :view :label :text-field :text-area
                       :table-view :table-view-row :button :scroll-view
                       :web-view :image-view :toolbar :activity-indicator
                       :scrollable-view :switch :table-view-section)


(defn photos-create [opts cb] 
  (let [js-opts (utils/jsify opts)]
    (debug "photos-create with opts " opts)
    (debug "... having photo property (in JS): " (.-photo js-opts))
    (.create (.-Photos *cloud*)
      (utils/jsify opts) (comp cb utils/cljify))))
(defn photos-show [opts cb]
  (debug "photos-show with opts " opts)
  (.show (.-Photos *cloud*)
    (utils/jsify opts) (comp cb utils/cljify)))

;; Wrapper for the Cloud.Objects API

(defn ^:export objects [meth opts & [cb]]
  (let [js-opts (utils/jsify opts)]
    ((aget (.-Objects *cloud*) meth) js-opts (fn [e] (when cb (cb (utils/cljify e)))))))

(defn ^:export listen
  "Listen to global Titanium App events"
  [evt cb]
  (.addEventListener Titanium/App evt
    (comp cb utils/cljify)))

(defn ^:export fire
  "Fire a global event"
  [evt evt-obj]
  (.fireEvent Titanium/App evt
    (utils/jsify evt-obj)))

(def TWITTER (.-Twitter (js/require "twitter")))
(def *twitter-client* (TWITTER (utils/jsify {:accessTokenKey (get-prop-string "twitterAccessTokenKey")
                                             :accessTokenSecret (get-prop-string "twitterAccessTokenSecret")
                                             :consumerKey *twitter-consumer-key*
                                             :consumerSecret *twitter-consumer-secret*})))
(when *twitter-client*
  (twitter-bind "login" (fn [e]
                          (set-prop-string "twitterAccessTokenKey" (:accessTokenKey e))
                          (set-prop-string "twitterAccessTokenSecret" (:accessTokenSecret e))))
  (twitter-bind "logout" (fn [e] (doseq [prop ["twitterAccessTokenKey" "twitterAccessTokenSecret"]]
                                   (debug "setting prop to nil: " prop)
                                   (set-prop-string prop nil)))))
