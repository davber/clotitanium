goog.provide('ti');
goog.require('cljs.core');
goog.require('utils');
goog.require('clojure.string');
ti._STAR_platform_STAR_ = cljs.core.ObjMap.fromObject(["\uFDD0:osname","\uFDD0:version","\uFDD0:width","\uFDD0:height"],{"\uFDD0:osname":cross._QMARK_.call(null,ti.Titanium,ti.Platform,ti.osname),"\uFDD0:version":cross._QMARK_.call(null,ti.Titanium,ti.Platform,ti.version),"\uFDD0:width":cross._QMARK_.call(null,ti.Titanium,ti.Platform,ti.displayCaps,ti.platformWidth),"\uFDD0:height":cross._QMARK_.call(null,ti.Titanium,ti.Platform,ti.displayCaps,ti.platformHeight)});
ti.iphone_QMARK_ = (function iphone_QMARK_(){
return cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0:osname")).call(null,ti._STAR_platform_STAR_),"iphone");
});
ti.ipad_QMARK_ = (function ipad_QMARK_(){
return cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0:osname")).call(null,ti._STAR_platform_STAR_),"ipad");
});
ti.ios_QMARK_ = (function ios_QMARK_(){
var or__3824__auto__ = ti.iphone_QMARK_.call(null);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return ti.ipad_QMARK_.call(null);
}
});
ti.android_QMARK_ = (function android_QMARK_(){
return cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0:osname")).call(null,ti._STAR_platform_STAR_),"android");
});
ti.FILL = cross._QMARK_.call(null,ti.Titanium,ti.UI,ti.FILL);
ti.SIZE = cross._QMARK_.call(null,ti.Titanium,ti.UI,ti.SIZE);
/**
* Get the internationalized string for the given property
*/
ti.l = (function l(prop){
return cross._QMARK_.call(null,ti.L).call(null,prop);
});
ti._STAR_my_cards_STAR_ = undefined;
ti._STAR_cloud_STAR_ = cross.req.call(null,"ti.cloud");
if(cljs.core.truth_(ti._STAR_cloud_STAR_))
{ti._STAR_cloud_STAR_.debug = true;
} else
{}
ti._STAR_twitter_client_STAR_ = undefined;
ti._STAR_twitter_consumer_key_STAR_ = "gdHpNubhOGico97P04OPw";
ti._STAR_twitter_consumer_secret_STAR_ = "MoFCOgK0US0RErxtZ75fRDGSBvEavZDv78dPGpjh2MY";
ti._STAR_default_config_STAR_ = cljs.core.ObjMap.EMPTY;
/**
* Set the default configurations to the given map
*/
ti.set_default_config = (function set_default_config(configs){
ti._STAR_default_config_STAR_ = configs;
});
/**
* Get default configuration for specific classes
*/
ti.default_config = (function default_config(clses){
return cljs.core.apply.call(null,cljs.core.merge,cljs.core.map.call(null,cljs.core.partial.call(null,cljs.core.get,ti._STAR_default_config_STAR_),clojure.string.split.call(null,clses,/ /)));
});
ti._STAR_views_STAR_ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
/**
* Extend the given configuration based on :cls, including setting the :cls
* property from the :id property if not given
*/
ti.extend_config = (function extend_config(opts){
var explicit_clses = ((cljs.core.empty_QMARK_.call(null,(new cljs.core.Keyword("\uFDD0:cls")).call(null,opts)))?cljs.core.PersistentVector.EMPTY:clojure.string.split.call(null,(new cljs.core.Keyword("\uFDD0:cls")).call(null,opts),/ /));
var derived_clses = ((cljs.core.empty_QMARK_.call(null,(new cljs.core.Keyword("\uFDD0:id")).call(null,opts)))?cljs.core.PersistentVector.EMPTY:cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\uFDD0:id")).call(null,opts)], true));
var clses = cljs.core.set.call(null,cljs.core.concat.call(null,explicit_clses,derived_clses));
var cls_opts = cljs.core.map.call(null,ti.default_config,clses);
return cljs.core.merge.call(null,cljs.core.apply.call(null,cljs.core.merge,cls_opts),opts);
});
/**
* Decide whether a view should be auto-purged upon closing.
* NOTE: it is currently only looking for a property 'autoPurge' in the view (proxy) object
*/
ti.auto_purge_QMARK_ = (function auto_purge_QMARK_(view){
return view.autoPurge;
});
goog.exportSymbol('ti.auto_purge_QMARK_', ti.auto_purge_QMARK_);
/**
* State that the given view should be auto-purged upon closure
*/
ti.set_auto_purge_BANG_ = (function set_auto_purge_BANG_(view){
return view.autoPurge = true;
});
goog.exportSymbol('ti.set_auto_purge_BANG_', ti.set_auto_purge_BANG_);
/**
* Cache a view given the passed selector, which is currently
* assumed to be the :id.
* NOTE: it is automatically invoked upon creation of views, which can have a special :context key as one of the
* creation options, basically making the view unique relative a context (view)
*/
ti.cache_view = (function cache_view(selector,view){
return cljs.core.swap_BANG_.call(null,ti._STAR_views_STAR_,cljs.core.assoc,selector,view);
});
/**
* Uncache a view, which includes all other views that has this as its context.
* NOTE: this uncaching is invoked automatically wheneer a view marked with an 'autoPurge' property
* is closed.
* NOTE: one can also invoke it explicitly such as when removing a sub view from a parent!
* @param {...*} var_args
*/
ti.uncache_view = (function() { 
var uncache_view__delegate = function (view,p__2971){
var map__2977 = p__2971;
var map__2977__$1 = ((cljs.core.seq_QMARK_.call(null,map__2977))?cljs.core.apply.call(null,cljs.core.hash_map,map__2977):map__2977);
var include_context = cljs.core._lookup.call(null,map__2977__$1,"\uFDD0:include-context",true);
var relevant_sel = (function (){var iter__2643__auto__ = (function iter__2978(s__2979){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2979__$1 = s__2979;
while(true){
if(cljs.core.seq.call(null,s__2979__$1))
{var vec__2981 = cljs.core.first.call(null,s__2979__$1);
var sel = cljs.core.nth.call(null,vec__2981,0,null);
var v = cljs.core.nth.call(null,vec__2981,1,null);
if(cljs.core.truth_((function (){var or__3824__auto__ = cljs.core._EQ_.call(null,v,view);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var and__3822__auto__ = include_context;
if(cljs.core.truth_(and__3822__auto__))
{var and__3822__auto____$1 = cljs.core.map_QMARK_.call(null,sel);
if(and__3822__auto____$1)
{return cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0:context")).call(null,sel),view);
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
}
})()))
{return cljs.core.cons.call(null,sel,iter__2978.call(null,cljs.core.rest.call(null,s__2979__$1)));
} else
{{
var G__2982 = cljs.core.rest.call(null,s__2979__$1);
s__2979__$1 = G__2982;
continue;
}
}
} else
{return null;
}
break;
}
}),null));
});
return iter__2643__auto__.call(null,cljs.core.deref.call(null,ti._STAR_views_STAR_));
})();
ti.debug.call(null,"ti/uncache-view of view ",view);
ti.debug.call(null,"Before # views: ",cljs.core.count.call(null,cljs.core.deref.call(null,ti._STAR_views_STAR_)));
cljs.core.swap_BANG_.call(null,ti._STAR_views_STAR_,(function (p1__2970_SHARP_){
return cljs.core.apply.call(null,cljs.core.dissoc,p1__2970_SHARP_,relevant_sel);
}));
return ti.debug.call(null,"After # views: ",cljs.core.count.call(null,cljs.core.deref.call(null,ti._STAR_views_STAR_)));
};
var uncache_view = function (view,var_args){
var p__2971 = null;
if (goog.isDef(var_args)) {
  p__2971 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return uncache_view__delegate.call(this, view, p__2971);
};
uncache_view.cljs$lang$maxFixedArity = 1;
uncache_view.cljs$lang$applyTo = (function (arglist__2983){
var view = cljs.core.first(arglist__2983);
var p__2971 = cljs.core.rest(arglist__2983);
return uncache_view__delegate(view, p__2971);
});
uncache_view.cljs$lang$arity$variadic = uncache_view__delegate;
return uncache_view;
})()
;
goog.exportSymbol('ti.uncache_view', ti.uncache_view);
/**
* Removes a view completely, including removing listeners and all the native UI elements
* referred to by the (proxy) view.
* This includes calling uncache-view
*/
ti.purge_view = (function purge_view(view){
return ti.uncache_view.call(null,view);
});
goog.exportSymbol('ti.purge_view', ti.purge_view);
/**
* Select the view based on the given selector.
* NOTE: this is always zero or one view.
* TODO: right now we assume the selector is the :id of a view
*/
ti.select_view = (function select_view(selector){
return cljs.core._lookup.call(null,cljs.core.deref.call(null,ti._STAR_views_STAR_),selector,null);
});
/**
* Get the view associated with the parameter, which could either
* be the value itself, if a view, or the view corresponding to the
* pattern/selector of that value, if a string.
*/
ti.get_view = (function get_view(selector){
var view = (function (){var or__3824__auto__ = ti.select_view.call(null,selector);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return selector;
}
})();
ti.nullify.call(null,"get-view yielded view ",view);
if(cljs.core.truth_(cljs.core.some_fn.call(null,cljs.core.map_QMARK_,cljs.core.not,cljs.core.string_QMARK_).call(null,view)))
{throw (new Error([cljs.core.str("could not find view for selector "),cljs.core.str(selector)].join('')));
} else
{}
return view;
});
ti.bind = (function bind(view,event,handler){
return ti.get_view.call(null,view).addEventListener(event,cljs.core.comp.call(null,handler,utils.cljify));
});
ti.click = (function click(view,handler){
return ti.bind.call(null,view,"click",handler);
});
/**
* @param {...*} var_args
*/
ti.add = (function() { 
var add__delegate = function (view,sub_views){
var view__$1 = ti.get_view.call(null,view);
var G__2985 = cljs.core.seq.call(null,sub_views);
while(true){
if(G__2985)
{var v = cljs.core.first.call(null,G__2985);
view__$1.add(ti.get_view.call(null,v));
{
var G__2986 = cljs.core.next.call(null,G__2985);
G__2985 = G__2986;
continue;
}
} else
{return null;
}
break;
}
};
var add = function (view,var_args){
var sub_views = null;
if (goog.isDef(var_args)) {
  sub_views = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return add__delegate.call(this, view, sub_views);
};
add.cljs$lang$maxFixedArity = 1;
add.cljs$lang$applyTo = (function (arglist__2987){
var view = cljs.core.first(arglist__2987);
var sub_views = cljs.core.rest(arglist__2987);
return add__delegate(view, sub_views);
});
add.cljs$lang$arity$variadic = add__delegate;
return add;
})()
;
/**
* @param {...*} var_args
*/
ti.add_tab = (function() { 
var add_tab__delegate = function (view,tabs){
var view__$1 = ti.get_view.call(null,view);
var G__2989 = cljs.core.seq.call(null,tabs);
while(true){
if(G__2989)
{var t = cljs.core.first.call(null,G__2989);
view__$1.addTab(ti.get_view.call(null,t));
{
var G__2990 = cljs.core.next.call(null,G__2989);
G__2989 = G__2990;
continue;
}
} else
{return null;
}
break;
}
};
var add_tab = function (view,var_args){
var tabs = null;
if (goog.isDef(var_args)) {
  tabs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return add_tab__delegate.call(this, view, tabs);
};
add_tab.cljs$lang$maxFixedArity = 1;
add_tab.cljs$lang$applyTo = (function (arglist__2991){
var view = cljs.core.first(arglist__2991);
var tabs = cljs.core.rest(arglist__2991);
return add_tab__delegate(view, tabs);
});
add_tab.cljs$lang$arity$variadic = add_tab__delegate;
return add_tab;
})()
;
/**
* @param {...*} var_args
*/
ti.remove_tab = (function() { 
var remove_tab__delegate = function (view,tabs){
var view__$1 = ti.get_view.call(null,view);
var G__2993 = cljs.core.seq.call(null,tabs);
while(true){
if(G__2993)
{var t = cljs.core.first.call(null,G__2993);
view__$1.removeTab(ti.get_view.call(null,t));
{
var G__2994 = cljs.core.next.call(null,G__2993);
G__2993 = G__2994;
continue;
}
} else
{return null;
}
break;
}
};
var remove_tab = function (view,var_args){
var tabs = null;
if (goog.isDef(var_args)) {
  tabs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return remove_tab__delegate.call(this, view, tabs);
};
remove_tab.cljs$lang$maxFixedArity = 1;
remove_tab.cljs$lang$applyTo = (function (arglist__2995){
var view = cljs.core.first(arglist__2995);
var tabs = cljs.core.rest(arglist__2995);
return remove_tab__delegate(view, tabs);
});
remove_tab.cljs$lang$arity$variadic = remove_tab__delegate;
return remove_tab;
})()
;
ti.descendants = (function descendants(view){
var children = view.children;
var nested = cljs.core.concat.call(null,children,cljs.core.mapcat.call(null,descendants,children));
ti.nullify.call(null,"ti/descendants returns ",nested);
return nested;
});
ti.sections = (function sections(view){
return ti.get_view.call(null,view).data;
});
ti.set_data = (function set_data(view,data){
var view__$1 = ti.get_view.call(null,view);
return view__$1.setData(utils.jsify.call(null,(function (){var or__3824__auto__ = data;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.PersistentVector.EMPTY;
}
})()));
});
/**
* @param {...*} var_args
*/
ti.append_row = (function() { 
var append_row__delegate = function (view,row,p__2996){
var map__2998 = p__2996;
var map__2998__$1 = ((cljs.core.seq_QMARK_.call(null,map__2998))?cljs.core.apply.call(null,cljs.core.hash_map,map__2998):map__2998);
var opts = map__2998__$1;
var view__$1 = ti.get_view.call(null,view);
var js_opts = utils.jsify.call(null,opts);
return view__$1.appendRow(row,js_opts);
};
var append_row = function (view,row,var_args){
var p__2996 = null;
if (goog.isDef(var_args)) {
  p__2996 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return append_row__delegate.call(this, view, row, p__2996);
};
append_row.cljs$lang$maxFixedArity = 2;
append_row.cljs$lang$applyTo = (function (arglist__2999){
var view = cljs.core.first(arglist__2999);
var row = cljs.core.first(cljs.core.next(arglist__2999));
var p__2996 = cljs.core.rest(cljs.core.next(arglist__2999));
return append_row__delegate(view, row, p__2996);
});
append_row.cljs$lang$arity$variadic = append_row__delegate;
return append_row;
})()
;
/**
* @param {...*} var_args
*/
ti.delete_row = (function() { 
var delete_row__delegate = function (view,row,p__3000){
var map__3002 = p__3000;
var map__3002__$1 = ((cljs.core.seq_QMARK_.call(null,map__3002))?cljs.core.apply.call(null,cljs.core.hash_map,map__3002):map__3002);
var opts = map__3002__$1;
var view__$1 = ti.get_view.call(null,view);
var js_opts = utils.jsify.call(null,opts);
var row__$1 = ti.get_view.call(null,row);
view__$1.deleteRow(row__$1,js_opts);
if(cljs.core.truth_(ti.auto_purge_QMARK_.call(null,row__$1)))
{return ti.purge_view.call(null,row__$1);
} else
{return null;
}
};
var delete_row = function (view,row,var_args){
var p__3000 = null;
if (goog.isDef(var_args)) {
  p__3000 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return delete_row__delegate.call(this, view, row, p__3000);
};
delete_row.cljs$lang$maxFixedArity = 2;
delete_row.cljs$lang$applyTo = (function (arglist__3003){
var view = cljs.core.first(arglist__3003);
var row = cljs.core.first(cljs.core.next(arglist__3003));
var p__3000 = cljs.core.rest(cljs.core.next(arglist__3003));
return delete_row__delegate(view, row, p__3000);
});
delete_row.cljs$lang$arity$variadic = delete_row__delegate;
return delete_row;
})()
;
/**
* @param {...*} var_args
*/
ti.fb_login_button = (function() { 
var fb_login_button__delegate = function (p__3004){
var map__3006 = p__3004;
var map__3006__$1 = ((cljs.core.seq_QMARK_.call(null,map__3006))?cljs.core.apply.call(null,cljs.core.hash_map,map__3006):map__3006);
var opts = map__3006__$1;
return cross._QMARK_.call(null,ti.Titanium,ti.Facebook).createLoginButton(utils.jsify.call(null,opts));
};
var fb_login_button = function (var_args){
var p__3004 = null;
if (goog.isDef(var_args)) {
  p__3004 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return fb_login_button__delegate.call(this, p__3004);
};
fb_login_button.cljs$lang$maxFixedArity = 0;
fb_login_button.cljs$lang$applyTo = (function (arglist__3007){
var p__3004 = cljs.core.seq(arglist__3007);;
return fb_login_button__delegate(p__3004);
});
fb_login_button.cljs$lang$arity$variadic = fb_login_button__delegate;
return fb_login_button;
})()
;
ti.fb_authorize = (function fb_authorize(){
return cross._QMARK_.call(null,ti.Titanium,ti.Facebook).authorize();
});
ti.fb_token = (function fb_token(){
return cross._QMARK_.call(null,ti.Titanium,ti.Facebook,ti.accessToken);
});
ti.fb_logout = (function fb_logout(){
return cross._QMARK_.call(null,ti.Titanium,ti.Facebook).logout();
});
ti.fb_logged_in_QMARK_ = (function fb_logged_in_QMARK_(){
return cross._QMARK_.call(null,ti.Titanium,ti.Facebook,ti.loggedIn);
});
/**
* Register a listener for FB events
*/
ti.fb_bind = (function fb_bind(evt,cb){
return cross._QMARK_.call(null,ti.Titanium,ti.Facebook).addEventListener(evt,cljs.core.comp.call(null,cb,utils.cljify));
});
/**
* @param {...*} var_args
*/
ti.fb_request = (function() { 
var fb_request__delegate = function (path,opts,p__3009){
var map__3011 = p__3009;
var map__3011__$1 = ((cljs.core.seq_QMARK_.call(null,map__3011))?cljs.core.apply.call(null,cljs.core.hash_map,map__3011):map__3011);
var cb = cljs.core._lookup.call(null,map__3011__$1,"\uFDD0:cb",null);
var method = cljs.core._lookup.call(null,map__3011__$1,"\uFDD0:method","POST");
var real_cb = (function (){var or__3824__auto__ = cb;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return ((function (or__3824__auto__){
return (function (p1__3008_SHARP_){
return ti.debug.call(null,[cljs.core.str("FB request "),cljs.core.str(path),cljs.core.str(" with opts "),cljs.core.str(opts),cljs.core.str(" yielded event ")].join(''),p1__3008_SHARP_);
});
;})(or__3824__auto__))
}
})();
return cross._QMARK_.call(null,ti.Titanium,ti.Facebook).requestWithGraphPath(path,utils.jsify.call(null,opts),(function (){var or__3824__auto__ = method;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return "POST";
}
})(),cljs.core.comp.call(null,real_cb,utils.cljify));
};
var fb_request = function (path,opts,var_args){
var p__3009 = null;
if (goog.isDef(var_args)) {
  p__3009 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return fb_request__delegate.call(this, path, opts, p__3009);
};
fb_request.cljs$lang$maxFixedArity = 2;
fb_request.cljs$lang$applyTo = (function (arglist__3012){
var path = cljs.core.first(arglist__3012);
var opts = cljs.core.first(cljs.core.next(arglist__3012));
var p__3009 = cljs.core.rest(cljs.core.next(arglist__3012));
return fb_request__delegate(path, opts, p__3009);
});
fb_request.cljs$lang$arity$variadic = fb_request__delegate;
return fb_request;
})()
;
/**
* @param {...*} var_args
*/
ti.fb_message = (function() { 
var fb_message__delegate = function (msg,p__3013){
var map__3015 = p__3013;
var map__3015__$1 = ((cljs.core.seq_QMARK_.call(null,map__3015))?cljs.core.apply.call(null,cljs.core.hash_map,map__3015):map__3015);
var picture = cljs.core._lookup.call(null,map__3015__$1,"\uFDD0:picture",null);
var link = cljs.core._lookup.call(null,map__3015__$1,"\uFDD0:link",null);
var cb = cljs.core._lookup.call(null,map__3015__$1,"\uFDD0:cb",null);
return ti.fb_request.call(null,"me/feed",cljs.core.ObjMap.fromObject(["\uFDD0:message","\uFDD0:link","\uFDD0:picture"],{"\uFDD0:message":msg,"\uFDD0:link":link,"\uFDD0:picture":picture}),"\uFDD0:cb",cb);
};
var fb_message = function (msg,var_args){
var p__3013 = null;
if (goog.isDef(var_args)) {
  p__3013 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return fb_message__delegate.call(this, msg, p__3013);
};
fb_message.cljs$lang$maxFixedArity = 1;
fb_message.cljs$lang$applyTo = (function (arglist__3016){
var msg = cljs.core.first(arglist__3016);
var p__3013 = cljs.core.rest(arglist__3016);
return fb_message__delegate(msg, p__3013);
});
fb_message.cljs$lang$arity$variadic = fb_message__delegate;
return fb_message;
})()
;
ti.twitter_authorize = (function twitter_authorize(){
return ti._STAR_twitter_client_STAR_.authorize();
});
ti.twitter_logged_in_QMARK_ = (function twitter_logged_in_QMARK_(){
return ti.get_prop_string.call(null,"twitterAccessTokenKey");
});
/**
* Creates a Twitter login button, that handles the action and propagates the corresponding
* login event to all listeners registered on Twitter
* @param {...*} var_args
*/
ti.twitter_login_button = (function() { 
var twitter_login_button__delegate = function (p__3019){
var map__3021 = p__3019;
var map__3021__$1 = ((cljs.core.seq_QMARK_.call(null,map__3021))?cljs.core.apply.call(null,cljs.core.hash_map,map__3021):map__3021);
var opts = map__3021__$1;
var but = ti.create_image_view.call(null,opts);
var flipImage = ((function (but){
return (function (p1__3017_SHARP_){
return but.image = [cljs.core.str("/images/twitter-"),cljs.core.str((cljs.core.truth_(p1__3017_SHARP_)?"out":"in")),cljs.core.str(".png")].join('');
});})(but))
;
flipImage.call(null,ti.twitter_logged_in_QMARK_.call(null));
ti.click.call(null,but,(function (e){
ti.debug.call(null,"clicking Twitter button when logged in is ",ti.twitter_logged_in_QMARK_.call(null));
if(cljs.core.truth_(ti.twitter_logged_in_QMARK_.call(null)))
{return ti.twitter_logout.call(null);
} else
{return ti.twitter_authorize.call(null);
}
}));
ti.twitter_bind.call(null,"login",(function (p1__3018_SHARP_){
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0:success")).call(null,p1__3018_SHARP_)))
{return flipImage.call(null,true);
} else
{return ti.warn.call(null,[cljs.core.str("Could not login to Twitter: "),cljs.core.str((new cljs.core.Keyword("\uFDD0:error")).call(null,p1__3018_SHARP_))].join(''));
}
}));
ti.twitter_bind.call(null,"logout",(function (e){
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0:success")).call(null,e)))
{return flipImage.call(null,false);
} else
{return null;
}
}));
return but;
};
var twitter_login_button = function (var_args){
var p__3019 = null;
if (goog.isDef(var_args)) {
  p__3019 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return twitter_login_button__delegate.call(this, p__3019);
};
twitter_login_button.cljs$lang$maxFixedArity = 0;
twitter_login_button.cljs$lang$applyTo = (function (arglist__3022){
var p__3019 = cljs.core.seq(arglist__3022);;
return twitter_login_button__delegate(p__3019);
});
twitter_login_button.cljs$lang$arity$variadic = twitter_login_button__delegate;
return twitter_login_button;
})()
;
ti.twitter_logout = (function twitter_logout(){
return ti._STAR_twitter_client_STAR_.fireEvent("logout",utils.jsify.call(null,cljs.core.ObjMap.fromObject(["\uFDD0:success"],{"\uFDD0:success":true})));
});
/**
* Listen to a specific event from the Twitter 'sub system'
*/
ti.twitter_bind = (function twitter_bind(evt,cb){
return ti._STAR_twitter_client_STAR_.addEventListener(evt,cljs.core.comp.call(null,cb,utils.cljify));
});
/**
* @param {...*} var_args
*/
ti.twitter_message = (function() { 
var twitter_message__delegate = function (msg,p__3023){
var map__3025 = p__3023;
var map__3025__$1 = ((cljs.core.seq_QMARK_.call(null,map__3025))?cljs.core.apply.call(null,cljs.core.hash_map,map__3025):map__3025);
var picture = cljs.core._lookup.call(null,map__3025__$1,"\uFDD0:picture",null);
var link = cljs.core._lookup.call(null,map__3025__$1,"\uFDD0:link",null);
var source = cljs.core._lookup.call(null,map__3025__$1,"\uFDD0:source",null);
var cb = cljs.core._lookup.call(null,map__3025__$1,"\uFDD0:cb",null);
return ti._STAR_twitter_client_STAR_.request("1.1/statuses/update.json",utils.jsify.call(null,cljs.core.ObjMap.fromObject(["\uFDD0:status"],{"\uFDD0:status":msg})),"POST",cb);
};
var twitter_message = function (msg,var_args){
var p__3023 = null;
if (goog.isDef(var_args)) {
  p__3023 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return twitter_message__delegate.call(this, msg, p__3023);
};
twitter_message.cljs$lang$maxFixedArity = 1;
twitter_message.cljs$lang$applyTo = (function (arglist__3026){
var msg = cljs.core.first(arglist__3026);
var p__3023 = cljs.core.rest(arglist__3026);
return twitter_message__delegate(msg, p__3023);
});
twitter_message.cljs$lang$arity$variadic = twitter_message__delegate;
return twitter_message;
})()
;
ti.open = (function() {
var open = null;
var open__1 = (function (view){
return ti.get_view.call(null,view).open();
});
var open__2 = (function (view,opts){
return ti.get_view.call(null,view).open(utils.jsify.call(null,opts));
});
open = function(view,opts){
switch(arguments.length){
case 1:
return open__1.call(this,view);
case 2:
return open__2.call(this,view,opts);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
open.cljs$lang$arity$1 = open__1;
open.cljs$lang$arity$2 = open__2;
return open;
})()
;
/**
* Get the value from the field, which could be a 'value' or 'text', depending
* on the field type
*/
ti.val = (function val(view){
var view__$1 = ti.get_view.call(null,view);
if((view__$1.value == null))
{return view__$1.text;
} else
{return view__$1.value;
}
});
/**
* Set the value of a field, which could its 'value' or 'text' property,
* depending on the type of field
*/
ti.set_val = (function set_val(view,value){
var view__$1 = ti.get_view.call(null,view);
if(cljs.core.truth_(view__$1.setValue))
{view__$1.setValue(value);
} else
{}
if(cljs.core.truth_(view__$1.setText))
{return view__$1.setText(value);
} else
{return null;
}
});
ti.rows = (function rows(table_view){
return cljs.core.mapcat.call(null,(function (p1__3027_SHARP_){
return p1__3027_SHARP_.rows;
}),ti.sections.call(null,table_view));
});
ti.open = (function open(view){
return ti.get_view.call(null,view).open();
});
ti.close = (function() {
var close = null;
var close__1 = (function (view){
var view__$1 = ti.get_view.call(null,view);
view__$1.close();
ti.debug.call(null,"ti/close of view ",view__$1);
if(cljs.core.truth_(ti.auto_purge_QMARK_.call(null,view__$1)))
{return ti.purge_view.call(null,view__$1);
} else
{return null;
}
});
var close__2 = (function (view,opts){
var view__$1 = ti.get_view.call(null,view);
ti.debug.call(null,[cljs.core.str("close with opts "),cljs.core.str(opts),cljs.core.str(" and view ")].join(''),view__$1);
view__$1.close(utils.jsify.call(null,opts));
if(cljs.core.truth_(ti.auto_purge_QMARK_.call(null,view__$1)))
{return ti.purge_view.call(null,view__$1);
} else
{return null;
}
});
close = function(view,opts){
switch(arguments.length){
case 1:
return close__1.call(this,view);
case 2:
return close__2.call(this,view,opts);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
close.cljs$lang$arity$1 = close__1;
close.cljs$lang$arity$2 = close__2;
return close;
})()
;
/**
* Animate an open view based on the passed configuration
*/
ti.animate = (function animate(view,opts){
var anim = cross._QMARK_.call(null,ti.Titanium,ti.UI).createAnimation(utils.jsify.call(null,opts));
return ti.get_view.call(null,view).animate(anim);
});
/**
* Open a view with an animation based on the passed configuration
*/
ti.open_animate = (function open_animate(view,opts){
var anim = cross._QMARK_.call(null,ti.Titanium,ti.UI).createAnimation(utils.jsify.call(null,opts));
return ti.get_view.call(null,view).open(anim);
});
/**
* Show the camera, with an optional :take-now key to just take the picture without showing a camera UI
* @param {...*} var_args
*/
ti.show_camera = (function() { 
var show_camera__delegate = function (p__3028){
var vec__3031 = p__3028;
var opts = cljs.core.nth.call(null,vec__3031,0,null);
var map__3032 = cljs.core.nthnext.call(null,vec__3031,1);
var map__3032__$1 = ((cljs.core.seq_QMARK_.call(null,map__3032))?cljs.core.apply.call(null,cljs.core.hash_map,map__3032):map__3032);
var take_now = cljs.core._lookup.call(null,map__3032__$1,"\uFDD0:take-now",null);
var success_cb = (new cljs.core.Keyword("\uFDD0:success")).call(null,opts);
var success_cb__$1 = (cljs.core.truth_(success_cb)?cljs.core.comp.call(null,success_cb,utils.cljify):null);
var opts__$1 = (cljs.core.truth_(success_cb__$1)?cljs.core.assoc.call(null,opts,"\uFDD0:success",success_cb__$1):opts);
var error_cb = (new cljs.core.Keyword("\uFDD0:error")).call(null,opts__$1);
var error_cb__$1 = (cljs.core.truth_(error_cb)?cljs.core.comp.call(null,error_cb,utils.cljify):null);
var opts__$2 = (cljs.core.truth_(error_cb__$1)?cljs.core.assoc.call(null,opts__$1,"\uFDD0:error",error_cb__$1):opts__$1);
if(cljs.core.truth_(take_now))
{return cross._QMARK_.call(null,ti.Titanium,ti.Media).takePicture(utils.jsify.call(null,opts__$2));
} else
{return cross._QMARK_.call(null,ti.Titanium,ti.Media).showCamera(utils.jsify.call(null,opts__$2));
}
};
var show_camera = function (var_args){
var p__3028 = null;
if (goog.isDef(var_args)) {
  p__3028 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return show_camera__delegate.call(this, p__3028);
};
show_camera.cljs$lang$maxFixedArity = 0;
show_camera.cljs$lang$applyTo = (function (arglist__3033){
var p__3028 = cljs.core.seq(arglist__3033);;
return show_camera__delegate(p__3028);
});
show_camera.cljs$lang$arity$variadic = show_camera__delegate;
return show_camera;
})()
;
/**
* Hide the camera
*/
ti.hide_camera = (function hide_camera(){
ti.debug.call(null,"about to hide camera");
cross._QMARK_.call(null,ti.Titanium,ti.Media).hideCamera();
return ti.debug.call(null,"did hide camera");
});
/**
* Does the device has a camera?
*/
ti.camera_supported_QMARK_ = (function camera_supported_QMARK_(){
return cross._QMARK_.call(null,ti.Titanium,ti.Media).isCameraSupported;
});
/**
* Shows a regular alert dialog
* @param {...*} var_args
*/
ti.show_alert = (function() { 
var show_alert__delegate = function (msgs){
return alert(cljs.core.apply.call(null,cljs.core.str,msgs));
};
var show_alert = function (var_args){
var msgs = null;
if (goog.isDef(var_args)) {
  msgs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return show_alert__delegate.call(this, msgs);
};
show_alert.cljs$lang$maxFixedArity = 0;
show_alert.cljs$lang$applyTo = (function (arglist__3034){
var msgs = cljs.core.seq(arglist__3034);;
return show_alert__delegate(msgs);
});
show_alert.cljs$lang$arity$variadic = show_alert__delegate;
return show_alert;
})()
;
/**
* Get the path to a temporary file with the given base name and extension
*/
ti.temp_path = (function temp_path(name,ext){
return [cljs.core.str(cross._QMARK_.call(null,ti.Titanium,ti.Filesystem).getTempDirectory()),cljs.core.str(cross._QMARK_.call(null,ti.Titanium,ti.Filesystem).getSeparator()),cljs.core.str(name),cljs.core.str("_"),cljs.core.str(utils.uuid.call(null)),cljs.core.str("."),cljs.core.str(ext)].join('');
});
/**
* Get file corresponding to the given path
*/
ti.file = (function file(path){
return cross._QMARK_.call(null,ti.Titanium,ti.Filesystem).getFile(path);
});
/**
* Creates a blob from a (transient TIFile) file object
*/
ti.file__GT_blob = (function file__GT_blob(file){
var temp_blob = file.blob;
var in_file = temp_blob.file;
var path = ti.temp_path.call(null,"imported",in_file.extension());
var out_file = ti.file.call(null,path);
ti.debug.call(null,"file->blob with in file ",(cljs.core.truth_(file)?in_file.resolve():null));
ti.debug.call(null,"... and blob size (pixels) ",(cljs.core.truth_(temp_blob)?temp_blob.size:null));
ti.debug.call(null,"... and blob length (bytes) ",(cljs.core.truth_(temp_blob)?temp_blob.length:null));
in_file.move(path);
return out_file.read();
});
/**
* Reclaim all space associated with a blob, including any associated file
*/
ti.kill_blob = (function kill_blob(blob){
ti.debug.call(null,"kill-blob of blob ",blob);
var temp__3974__auto__ = blob.file;
if(cljs.core.truth_(temp__3974__auto__))
{var file = temp__3974__auto__;
var ok = file.deleteFile();
return ti.debug.call(null,"kill-blob deleted file -> ",ok);
} else
{return null;
}
});
/**
* Get a string property
*/
ti.get_prop_string = (function get_prop_string(prop){
return cross._QMARK_.call(null,ti.Titanium,ti.App,ti.Properties).getString(prop);
});
/**
* Set a string property
*/
ti.set_prop_string = (function set_prop_string(prop,value){
return cross._QMARK_.call(null,ti.Titanium,ti.App,ti.Properties).setString(prop,value);
});
/**
* We wrap creation of button bars to support non-iOS targets
* @param {...*} var_args
*/
ti.create_button_bar = (function() { 
var create_button_bar__delegate = function (p__3035){
var vec__3037 = p__3035;
var opts = cljs.core.nth.call(null,vec__3037,0,null);
if(cljs.core.truth_(ti.ios_QMARK_.call(null)))
{return ti.create.call(null,"button-bar",opts);
} else
{var view = ti.create_view.call(null,opts);
return view;
}
};
var create_button_bar = function (var_args){
var p__3035 = null;
if (goog.isDef(var_args)) {
  p__3035 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return create_button_bar__delegate.call(this, p__3035);
};
create_button_bar.cljs$lang$maxFixedArity = 0;
create_button_bar.cljs$lang$applyTo = (function (arglist__3038){
var p__3035 = cljs.core.seq(arglist__3038);;
return create_button_bar__delegate(p__3035);
});
create_button_bar.cljs$lang$arity$variadic = create_button_bar__delegate;
return create_button_bar;
})()
;
ti.toolbar = (function toolbar(opts){
if(cljs.core.truth_(Titanium.UI.iOS))
{return ti.create.call(null,"toolbar","iOS",opts);
} else
{var opts__$1 = cljs.core.assoc.call(null,opts,"\uFDD0:layout","horizontal");
var view = ti.create_view.call(null,opts__$1);
var temp__3974__auto___3039 = (new cljs.core.Keyword("\uFDD0:items")).call(null,opts__$1);
if(cljs.core.truth_(temp__3974__auto___3039))
{var children_3040 = temp__3974__auto___3039;
cljs.core.apply.call(null,ti.add,view,children_3040);
} else
{}
return view;
}
});
/**
* This will get the creator function for the given Ti element type and an optional
* platform string if a nestedly named creator is sought, such as 'iOS'
* @param {...*} var_args
*/
ti.ui_creator = (function() { 
var ui_creator__delegate = function (type_name,p__3041){
var vec__3043 = p__3041;
var platform = cljs.core.nth.call(null,vec__3043,0,null);
var cameled = utils.camelize.call(null,cljs.core.name.call(null,type_name),"\uFDD0:capitalize-first",true);
var creatorname = [cljs.core.str("create"),cljs.core.str(cameled)].join('');
return (function (opts){
var opts_all = ti.extend_config.call(null,opts);
var context = (new cljs.core.Keyword("\uFDD0:context")).call(null,opts_all);
var children = (new cljs.core.Keyword("\uFDD0:children")).call(null,opts_all);
var opts__$1 = cljs.core.dissoc.call(null,opts_all,"\uFDD0:context","\uFDD0:children");
var jsopts = utils.jsify.call(null,opts__$1);
var view = (cljs.core.truth_(platform)?Titanium.UI[platform][creatorname](jsopts):Titanium.UI[creatorname](jsopts));
var temp__3974__auto___3044 = (new cljs.core.Keyword("\uFDD0:id")).call(null,opts__$1);
if(cljs.core.truth_(temp__3974__auto___3044))
{var id_3045 = temp__3974__auto___3044;
var selector_3046 = (cljs.core.truth_(context)?cljs.core.ObjMap.fromObject(["\uFDD0:selector","\uFDD0:context"],{"\uFDD0:selector":id_3045,"\uFDD0:context":context}):id_3045);
ti.cache_view.call(null,selector_3046,view);
} else
{}
if(cljs.core.truth_(children))
{cljs.core.apply.call(null,ti.add,view,children);
} else
{}
return view;
});
};
var ui_creator = function (type_name,var_args){
var p__3041 = null;
if (goog.isDef(var_args)) {
  p__3041 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return ui_creator__delegate.call(this, type_name, p__3041);
};
ui_creator.cljs$lang$maxFixedArity = 1;
ui_creator.cljs$lang$applyTo = (function (arglist__3047){
var type_name = cljs.core.first(arglist__3047);
var p__3041 = cljs.core.rest(arglist__3047);
return ui_creator__delegate(type_name, p__3041);
});
ui_creator.cljs$lang$arity$variadic = ui_creator__delegate;
return ui_creator;
})()
;
goog.exportSymbol('ti.ui_creator', ti.ui_creator);
/**
* A general creator of Ti UI elements, where the name of the element type is provided
* as the first argment. There is also an options hash required as second
* argument.
* NOTE: we allow for both a string and symbol as the type, and
* actually allow for key symbols as well, such as
* :tab-group
*/
ti.create = (function() {
var create = null;
var create__2 = (function (type_name,opts){
return ti.ui_creator.call(null,type_name).call(null,opts);
});
var create__3 = (function (type_name,platform,opts){
return ti.ui_creator.call(null,type_name,platform).call(null,opts);
});
create = function(type_name,platform,opts){
switch(arguments.length){
case 2:
return create__2.call(this,type_name,platform);
case 3:
return create__3.call(this,type_name,platform,opts);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
create.cljs$lang$arity$2 = create__2;
create.cljs$lang$arity$3 = create__3;
return create;
})()
;
goog.exportSymbol('ti.create', ti.create);
/**
* Shows information message, using Ti.App.info
*/
ti.info = (function() {
var info = null;
var info__1 = (function (msg){
return macros.log_via.call(null,"\uFDD0:info",msg);
});
var info__2 = (function (msg,obj){
macros.log_via.call(null,"\uFDD0:info",[cljs.core.str(msg),cljs.core.str(cljs.core.pr_str.call(null,obj))].join(''));
return obj;
});
info = function(msg,obj){
switch(arguments.length){
case 1:
return info__1.call(this,msg);
case 2:
return info__2.call(this,msg,obj);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
info.cljs$lang$arity$1 = info__1;
info.cljs$lang$arity$2 = info__2;
return info;
})()
;
goog.exportSymbol('ti.info', ti.info);
/**
* Shows warning message, using Ti.App.warn
*/
ti.warn = (function() {
var warn = null;
var warn__1 = (function (msg){
return macros.log_via.call(null,"\uFDD0:warn",msg);
});
var warn__2 = (function (msg,obj){
macros.log_via.call(null,"\uFDD0:warn",[cljs.core.str(msg),cljs.core.str(cljs.core.pr_str.call(null,obj))].join(''));
return obj;
});
warn = function(msg,obj){
switch(arguments.length){
case 1:
return warn__1.call(this,msg);
case 2:
return warn__2.call(this,msg,obj);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
warn.cljs$lang$arity$1 = warn__1;
warn.cljs$lang$arity$2 = warn__2;
return warn;
})()
;
goog.exportSymbol('ti.warn', ti.warn);
/**
* Shows error message, using Ti.App.error
*/
ti.error = (function() {
var error = null;
var error__1 = (function (msg){
return macros.log_via.call(null,"\uFDD0:error",msg);
});
var error__2 = (function (msg,obj){
macros.log_via.call(null,"\uFDD0:error",[cljs.core.str(msg),cljs.core.str(cljs.core.pr_str.call(null,obj))].join(''));
return obj;
});
error = function(msg,obj){
switch(arguments.length){
case 1:
return error__1.call(this,msg);
case 2:
return error__2.call(this,msg,obj);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
error.cljs$lang$arity$1 = error__1;
error.cljs$lang$arity$2 = error__2;
return error;
})()
;
goog.exportSymbol('ti.error', ti.error);
/**
* Shows debug message, using Ti.App.debug.
* NOTE: we also have a special two-parameter version which expects a value to output as
* second argument, and will return that value, enabling threaded syntax.
*/
ti.debug = (function() {
var debug = null;
var debug__1 = (function (msg){
return macros.log_via.call(null,"\uFDD0:debug",msg);
});
var debug__2 = (function (msg,obj){
macros.log_via.call(null,"\uFDD0:debug",[cljs.core.str(msg),cljs.core.str(cljs.core.pr_str.call(null,obj))].join(''));
return obj;
});
debug = function(msg,obj){
switch(arguments.length){
case 1:
return debug__1.call(this,msg);
case 2:
return debug__2.call(this,msg,obj);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
debug.cljs$lang$arity$1 = debug__1;
debug.cljs$lang$arity$2 = debug__2;
return debug;
})()
;
goog.exportSymbol('ti.debug', ti.debug);
/**
* A null operation, whose primary purpose is to allow for quick replacement of debug output calls
* @param {...*} var_args
*/
ti.nullify = (function() { 
var nullify__delegate = function (args){
return null;
};
var nullify = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return nullify__delegate.call(this, args);
};
nullify.cljs$lang$maxFixedArity = 0;
nullify.cljs$lang$applyTo = (function (arglist__3048){
var args = cljs.core.seq(arglist__3048);;
return nullify__delegate(args);
});
nullify.cljs$lang$arity$variadic = nullify__delegate;
return nullify;
})()
;
goog.exportSymbol('ti.nullify', ti.nullify);
/**
* A null operator replacement for the 'str' operator
* @param {...*} var_args
*/
ti.nullstr = (function() { 
var nullstr__delegate = function (args){
return null;
};
var nullstr = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return nullstr__delegate.call(this, args);
};
nullstr.cljs$lang$maxFixedArity = 0;
nullstr.cljs$lang$applyTo = (function (arglist__3049){
var args = cljs.core.seq(arglist__3049);;
return nullstr__delegate(args);
});
nullstr.cljs$lang$arity$variadic = nullstr__delegate;
return nullstr;
})()
;
goog.exportSymbol('ti.nullstr', ti.nullstr);
macros.create_creator.call(null,"\uFDD0:window","\uFDD0:tab-group","\uFDD0:tab","\uFDD0:view","\uFDD0:label","\uFDD0:text-field","\uFDD0:text-area","\uFDD0:table-view","\uFDD0:table-view-row","\uFDD0:button","\uFDD0:scroll-view","\uFDD0:web-view","\uFDD0:image-view","\uFDD0:toolbar","\uFDD0:activity-indicator","\uFDD0:scrollable-view","\uFDD0:switch","\uFDD0:table-view-section");
ti.photos_create = (function photos_create(opts,cb){
var js_opts = utils.jsify.call(null,opts);
ti.debug.call(null,"photos-create with opts ",opts);
ti.debug.call(null,"... having photo property (in JS): ",js_opts.photo);
return ti._STAR_cloud_STAR_.Photos.create(utils.jsify.call(null,opts),cljs.core.comp.call(null,cb,utils.cljify));
});
ti.photos_show = (function photos_show(opts,cb){
ti.debug.call(null,"photos-show with opts ",opts);
return ti._STAR_cloud_STAR_.Photos.show(utils.jsify.call(null,opts),cljs.core.comp.call(null,cb,utils.cljify));
});
/**
* @param {...*} var_args
*/
ti.objects = (function() { 
var objects__delegate = function (meth,opts,p__3050){
var vec__3052 = p__3050;
var cb = cljs.core.nth.call(null,vec__3052,0,null);
var js_opts = utils.jsify.call(null,opts);
return (ti._STAR_cloud_STAR_.Objects[meth]).call(null,js_opts,(function (e){
if(cljs.core.truth_(cb))
{return cb.call(null,utils.cljify.call(null,e));
} else
{return null;
}
}));
};
var objects = function (meth,opts,var_args){
var p__3050 = null;
if (goog.isDef(var_args)) {
  p__3050 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return objects__delegate.call(this, meth, opts, p__3050);
};
objects.cljs$lang$maxFixedArity = 2;
objects.cljs$lang$applyTo = (function (arglist__3053){
var meth = cljs.core.first(arglist__3053);
var opts = cljs.core.first(cljs.core.next(arglist__3053));
var p__3050 = cljs.core.rest(cljs.core.next(arglist__3053));
return objects__delegate(meth, opts, p__3050);
});
objects.cljs$lang$arity$variadic = objects__delegate;
return objects;
})()
;
goog.exportSymbol('ti.objects', ti.objects);
/**
* Listen to global Titanium App events
*/
ti.listen = (function listen(evt,cb){
return cross._QMARK_.call(null,ti.Titanium,ti.App).addEventListener(evt,cljs.core.comp.call(null,cb,utils.cljify));
});
goog.exportSymbol('ti.listen', ti.listen);
/**
* Fire a global event
*/
ti.fire = (function fire(evt,evt_obj){
return cross._QMARK_.call(null,ti.Titanium,ti.App).fireEvent(evt,utils.jsify.call(null,evt_obj));
});
goog.exportSymbol('ti.fire', ti.fire);
ti.TWITTER = cross.req.call(null,"twitter").Twitter;
ti._STAR_twitter_client_STAR_ = ti.TWITTER.call(null,utils.jsify.call(null,cljs.core.ObjMap.fromObject(["\uFDD0:accessTokenKey","\uFDD0:accessTokenSecret","\uFDD0:consumerKey","\uFDD0:consumerSecret"],{"\uFDD0:accessTokenKey":ti.get_prop_string.call(null,"twitterAccessTokenKey"),"\uFDD0:accessTokenSecret":ti.get_prop_string.call(null,"twitterAccessTokenSecret"),"\uFDD0:consumerKey":ti._STAR_twitter_consumer_key_STAR_,"\uFDD0:consumerSecret":ti._STAR_twitter_consumer_secret_STAR_})));
if(cljs.core.truth_(ti._STAR_twitter_client_STAR_))
{ti.twitter_bind.call(null,"login",(function (e){
ti.set_prop_string.call(null,"twitterAccessTokenKey",(new cljs.core.Keyword("\uFDD0:accessTokenKey")).call(null,e));
return ti.set_prop_string.call(null,"twitterAccessTokenSecret",(new cljs.core.Keyword("\uFDD0:accessTokenSecret")).call(null,e));
}));
ti.twitter_bind.call(null,"logout",(function (e){
var G__3054 = cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray(["twitterAccessTokenKey","twitterAccessTokenSecret"], true));
while(true){
if(G__3054)
{var prop = cljs.core.first.call(null,G__3054);
ti.debug.call(null,"setting prop to nil: ",prop);
ti.set_prop_string.call(null,prop,null);
{
var G__3055 = cljs.core.next.call(null,G__3054);
G__3054 = G__3055;
continue;
}
} else
{return null;
}
break;
}
}));
} else
{}
