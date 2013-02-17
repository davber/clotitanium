
(ns macros.ti
  "This module provides some macros for dealing with Titanium UI in ClojureScript"
  (:require [clojure.string :as string] [macros.utils :as mutils]))

(defmacro create-creator
  "Defines a UI creator based on the given type or types, where the
 name of the creator is create-<type>. It uses an underlying
 function create, so that function needs to exist and be accessible
 via the name 'ti/create'. I.e., symbol resolution happens at
 the invocation target."
  ([type-name]
     (let [hyphenized (string/join "-" (mutils/wordify type-name))
           creator-name (str "create-" hyphenized)]
       `(defn ~(symbol creator-name) [options#] (~'ti/create ~hyphenized options#))))
  ([type-name-1 type-name-2 & type-name-rest]
     (let [type-names `(~type-name-1 ~type-name-2 ~@type-name-rest)
           type-name-lists (map list type-names)]
       `(mutils/macro-map create-creator ~@type-name-lists))))

(defmacro log-via
  "Helper function logging via the given severity level mechanism.
We expect the level to be a Named."
  [level msg]
  `(. Titanium/API ~((comp symbol name) level) ~msg))

;; TODO: create a logger creator instead for specific levels, since these are quite similar

(defmacro debug
  "Convenience wrapper of log-via"
  [& args]
  `(log-via :debug (str ~@args)))

(defmacro warn
  "Convenience wrapper of log-via"
  [& args]
  `(log-via :warn (str ~@args)))

(defmacro throw-error
  "Report an error view the Titanium error log and throw an exception"
  [& msgs]
  `(do (log-via :error (str ~@msgs)) (throw (js/Error. (str ~@msgs)))))

(defmacro yield-platform
  "Yields the js* value of the given string if the plaform matches what passed"
  [value platform & {:keys [default] :or {default "0"}}]
  `(if (= (:osname ti/PLATFORM) ~platform) (~'js* ~value) (~'js* ~default)))

(defmacro yield-ios
  [value & {:keys [default] :or {default "0"}}]
  `(if (ti/ios?) (~'js* ~value) (~'js* ~default)))

(defmacro surround-memory
  "Surrounds a body with output of memory available before and after the body executes, and also
return the value of the body."
  [label & body]
  `(let [before# Titanium.Platform/availableMemory]
     (log-via :debug (str ~label " before memory is " before# " MB"))
     (let [value# (do ~@body)
           after# Titanium.Platform/availableMemory]
       (log-via :debug (str ~label " after memory is " after# " MB"))
       (log-via :debug (str ~label " diff of " (- after# before#) " MB"))
       value#)))

