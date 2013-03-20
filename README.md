clotitanium
===========

An abstraction of the Titanium mobile platform in ClojureScript.

# Requirements

* Leiningen
* Titanium (especially the CLI command `titanium`)

# Installation

In order to use this abstraction, you need to:

* include the `cljs-macros` directory in your ClojureScript path for macros, and
* include the `cljs` directory in your ClojureScript source path.

# Get Started

You can compile and run the sample application by:

* `git submodule update`
* `cd sample/skeleton`
* `lein cljsbuild once`
* `titanium build --platform iphone`

This will launch the application in the iOS simulator.
