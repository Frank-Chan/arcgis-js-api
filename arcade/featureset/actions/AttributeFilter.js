// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.10/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/extendsHelper","dojo/Deferred","dojo/promise/all","dojo/promise/Promise","../support/FeatureSet","../support/IdSet","../support/shared","../support/WhereClause"],function(e,t,r,n,a,s,i,u,l,o){var c=function(e){function t(t){var r=e.call(this,t)||this;if(r.declaredClass="esri.arcade.featureset.actions.AttributeFilter",r._maxProcessing=1e3,r._parent=t.parentfeatureset,t.whereclause instanceof o){r._whereclause=t.whereclause,r._whereClauseFunction=null;var n=r._whereclause.getFunctions();r._whereclauseDoesGeometry=!1,n.indexOf("area")>=0?r._whereclauseDoesGeometry=!0:n.indexOf("length")>=0&&(r._whereclauseDoesGeometry=!0)}else r._whereClauseFunction=t.whereclause,r._whereclause=null;return r}return r(t,e),t.prototype._getSet=function(e){var t=this,r=new n;return null===this._wset?this._ensureLoaded().then(l.callback(function(){t._parent._getFilteredSet("",null,!1===t._whereclauseDoesGeometry?t._whereclause:null,null,e).then(l.callback(function(n){t._checkCancelled(e),!0===t._whereclauseDoesGeometry||null!==t._whereClauseFunction?t._wset=new u(n._candidates.slice(0).concat(n._known.slice(0)),[],n._ordered,t._clonePageDefinition(n.pagesDefinition)):t._wset=new u(n._candidates.slice(0),n._known.slice(0),n._ordered,t._clonePageDefinition(n.pagesDefinition)),r.resolve(t._wset)},r),l.errback(r))},r),l.errback(r)):r.resolve(this._wset),r.promise},t.prototype._isInFeatureSet=function(e){var t=this._parent._isInFeatureSet(e);return t===l.IdState.NotInFeatureSet?t:(t=this._idstates[e],void 0===t?l.IdState.Unknown:t)},t.prototype._getFeature=function(e,t,r){return this._parent._getFeature(e,t,r)},t.prototype._getFeatures=function(e,t,r,n){return this._parent._getFeatures(e,t,r,n)},t.prototype._featureFromCache=function(e){return this._parent._featureFromCache(e)},t.prototype.executeWhereClause=function(e){return this._whereclause.testFeature(e)},t.prototype.executeWhereClauseDeferred=function(e){if(null!==this._whereClauseFunction){var t=new n;try{var r=this._whereClauseFunction(e);r instanceof s?r.then(l.callback(function(e){t.resolve(e)},t),l.errback(t)):t.resolve(r)}catch(e){t.reject(e)}return t.promise}return this._whereclause.testFeatureDeferred(e)},t.prototype._fetchAndRefineFeatures=function(e,t,r){var s=this,i=new n,o=new u([],e,!1,null),c=Math.min(t,e.length);return this._parent._getFeatures(o,-1,c,r).then(l.callback(function(){if(s._checkCancelled(r),!1===s._whereclauseDoesGeometry&&null==s._whereClauseFunction){for(var n=0;n<c;n++){var u=s._parent._featureFromCache(e[n]);!0===s.executeWhereClause(u)?s._idstates[e[n]]=l.IdState.InFeatureSet:s._idstates[e[n]]=l.IdState.NotInFeatureSet}i.resolve("success")}else{for(var o=[],n=0;n<c;n++){var u=s._parent._featureFromCache(e[n]);o.push(s.executeWhereClauseDeferred(u))}a(o).then(l.callback(function(r){for(var n=0;n<t;n++)!0===r[n]?s._idstates[e[n]]=l.IdState.InFeatureSet:s._idstates[e[n]]=l.IdState.NotInFeatureSet;i.resolve("success")},i),l.errback(i))}},i),l.errback(i)),i.promise},t.prototype._getFilteredSet=function(e,t,r,a,s){var i=this,c=new n;return!0===this._whereclauseDoesGeometry||null!==this._whereClauseFunction||(null!==r?null!==this._whereclause&&(r=o.combine(this._whereclause,r)):r=this._whereclause),this._ensureLoaded().then(l.callback(function(){i._parent._getFilteredSet(e,t,r,a,s).then(l.callback(function(e){i._checkCancelled(s);var t;t=!0===i._whereclauseDoesGeometry||null!==i._whereClauseFunction?new u(e._candidates.slice(0).concat(e._known.slice(0)),[],e._ordered,i._clonePageDefinition(e.pagesDefinition)):new u(e._candidates.slice(0),e._known.slice(0),e._ordered,i._clonePageDefinition(e.pagesDefinition)),c.resolve(t)},c),l.errback(c))},c),l.errback(c)),c.promise},t.prototype._stat=function(e,t,r,a,s,i,u){var c=this,h=new n;if(!0===this._whereclauseDoesGeometry||null!==this._whereClauseFunction)return null===s&&""===r&&null===a?this._manualStat(e,t,i,u).then(l.callback(function(e){h.resolve(e)},h),l.errback(h)):h.resolve({calculated:!1}),h.promise;var _=this._whereclause;return null!==s&&null!==this._whereclause&&(_=o.combine(this._whereclause,s)),this._parent._stat(e,t,r,a,_,i,u).then(l.callback(function(n){!1===n.calculated?null===s&&""===r&&null===a?c._manualStat(e,t,i,u).then(l.callback(function(e){h.resolve(e)},h),l.errback(h)):h.resolve({calculated:!1}):h.resolve(n)},h),l.errback(h)),h.promise},t.prototype._canDoAggregates=function(e,t,r,a,s){var i=new n;return!0===this._whereclauseDoesGeometry||null!==this._whereClauseFunction?(i.resolve(!1),i.promise):(null!==s?null!==this._whereclause&&(s=o.combine(this._whereclause,s)):s=this._whereclause,null===this._parent?(i.resolve(!1),i.promise):this._parent._canDoAggregates(e,t,r,a,s))},t.prototype._getAggregatePagesDataSourceDefinition=function(e,t,r,a,s,i,u){var l=new n;return null!==this._parent?(null!==s?null!==this._whereclause&&(s=o.combine(this._whereclause,s)):s=this._whereclause,this._parent._getAggregatePagesDataSourceDefinition(e,t,r,a,s,i,u)):(l.reject(new Error("Should never be called")),l.promise)},t.prototype.arcadeScriptStep=function(e,t,r){var n=this.arcadeAssignNextScriptStepIdentifiers(r),a=this._whereclause.toWhereClause(l.FeatureServiceDatabaseType.Standardised);return"var "+n.newFeatureSet+" = "+this.bigDataCachePipeline("filter( "+n.currentFeatureSet+',"'+a+'")')+";"},t}(i);return i._featuresetFunctions.filter=function(e,t){if(void 0===t&&(t=null),"function"==typeof e)return new c({parentfeatureset:this,whereclause:e});if(""===e)return this;var r=o.create(e);if(null!==t){var n={};for(var a in t)n[a.toLowerCase()]=t[a];r.setVariablesDictionary(n)}return new c({parentfeatureset:this,whereclause:r})},c});