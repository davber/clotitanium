#
# This Makefile prepares the app for development and deployment
#

CUR = $(CWD)

# This target will compile ClojureScript files into JavaScript on demand
# watching for changes. The bootstrap file is put in Resources/public/cljs/bootstrap.js
cljs :
	cljs-watch cljs '{ :optimizations :none :pretty-print true :externs ["cljs/externs.js"] }'

cljs-simple :
	cljs-watch cljs '{ :optimizations :simple :pretty-print false :externs ["cljs/externs.js"] }'

cljs-advanced :
	cljs-watch cljs '{ :optimizations :advanced :pretty-print false :externs ["cljs/externs.js"] }'

clean :
	rm -rf Resources/public/*


.PHONY: cljs
