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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/Error","../core/Handles","../core/has","../core/Logger","../core/promiseUtils","../core/watchUtils","../core/workers","../core/accessorSupport/decorators","../geometry/ScreenPoint","./BreakpointsOwner","./MapViewBase","./2d/input/MapViewInputManager","./2d/support/HighlightOptions","./support/screenshotUtils","./support/WebGLRequirements","./ui/2d/DefaultUI2D"],function(e,t,r,i,n,a,s,o,p,h,u,c,l,g,d,w,y,f,v,_){var V,m,M,b,S=o.getLogger("esri.views.MapView");return function(t){function o(e){var r=t.call(this,e)||this;return r._graphicsView=null,r._mapViewHandles=new a,r._stage=null,r._resolveWhenReady=[],r.highlightOptions=new y,r.inputManager=new w({view:r}),r.mapViewNavigation=null,r.supersampleScreenhotsEnabled=!0,r.ui=new _,r.rendering=!1,u.initialize(),h.on(r,"graphics","change",function(e){for(var t=0,i=e.added;t<i.length;t++){var n=i[t];n.layer=r}for(var a=0,s=e.removed;a<s.length;a++){var n=s[a];n.layer=null}},function(e){e.forEach(function(e){return e.layer=r}),r._graphicsView&&(r._graphicsView.graphics=e)},function(e){e.forEach(function(e){return e.layer=null}),r._graphicsView&&(r._graphicsView.graphics=null)}),r}return r(o,t),Object.defineProperty(o.prototype,"interacting",{get:function(){return this.mapViewNavigation&&this.mapViewNavigation.interacting||!1},enumerable:!0,configurable:!0}),o.prototype.hitTest=function(e){if(e&&"esri.geometry.ScreenPoint"!==e.declaredClass&&(e=new l({x:e.x,y:e.y})),!this._setup||isNaN(e.x)||isNaN(e.y))return p.resolve({screenPoint:e,results:[]});var t=this.toMap(e),r=[this._graphicsView];return r.push.apply(r,this.allLayerViews.toArray().reverse()),p.all(r.map(function(t){return t&&t.hitTest?t.hitTest(e.x,e.y):null})).then(function(r){return{screenPoint:e,results:r.filter(function(e){return null!=e}).map(function(e){return{mapPoint:t,graphic:e}})}})},o.prototype.takeScreenshot=function(e){return this._setup?this._stage.takeScreenshot(f.toRenderSettings(e,this),this.allLayerViews):p.reject("Map view cannot be used before it is ready")},o.prototype.on=function(e,t,r){var i=this.inputManager&&this.inputManager.viewEvents.register(e,t,r);return i||this.inherited(arguments)},o.prototype.hasEventListener=function(e){return this.inherited(arguments)||this.inputManager&&this.inputManager.viewEvents.hasHandler(e)},o.prototype.graphicChanged=function(e){this._graphicsView&&this._graphicsView.graphicUpdateHandler(e)},o.prototype.whenReady=function(){var e=this;return p.create(function(t){e._setup?t(e):e._resolveWhenReady.push(t)})},o.prototype.validate=function(){var t=v.check({supportsMajorWebPerformanceCaveat:!0});return s("safari")&&s("safari")<9&&(t=new n("mapview:browser-not-supported","This browser is not supported by MapView (Safari < 9)",{type:"safari",requiredVersion:9,detectedVersion:s("safari")})),t?(S.warn("#validate()",t.message),p.reject(t)):p.create(function(t){e(["./2d/RenderingCore2D"],function(e){V=e.Stage,m=e.GraphicsView2D,M=e.LabelManager,b=e.MapViewNavigation,t()})})},o.prototype._startup=function(){var e=this;if(!this._setup){this.inherited(arguments);var t=new V(this.surface,{supersampleScreenshots:this.supersampleScreenhotsEnabled}),r=new m({view:this,graphics:this.graphics}),i=new b({view:this,animationManager:this.animationManager}),n=new M({view:this});this._stage=t,this._graphicsView=this._frameTask.graphicsView=r,this._set("mapViewNavigation",i),this._set("labelManager",n),this._mapViewHandles.add([this.allLayerViews.on("change",function(){return e._updateStageChildren()}),t.on("post-render",function(){return e._set("rendering",e.allLayerViews.some(function(e){return!0===e.rendering}))}),this.watch("stationary",function(e){return t.stationary=e},!0),this.watch("state.viewpoint",function(r){return t.state=e.state},!0)]),t.state=this.state,this._updateStageChildren();var a=this._resolveWhenReady;this._resolveWhenReady=[],a.forEach(function(t){return t(e)})}},o.prototype._tearDown=function(){this._setup&&(this.layerViewManager.clear(),this._graphicsView.destroy(),this._mapViewHandles.removeAll(),this._stage.destroy(),this.mapViewNavigation.destroy(),this._stage=null,this._graphicsView=null,this.labelManager.destroy(),this._set("labelManager",null),this._set("mapViewNavigation",null),this.inherited(arguments))},o.prototype._updateStageChildren=function(){var e=this;this._stage.removeAllChildren(),this.allLayerViews.filter(function(e){return null!=e.container}).forEach(function(t,r){e._stage.addChildAt(t.container,r)}),this._stage.addChild(this._graphicsView.container)},i([c.property({type:y})],o.prototype,"highlightOptions",void 0),i([c.property({readOnly:!0})],o.prototype,"inputManager",void 0),i([c.property({readOnly:!0})],o.prototype,"mapViewNavigation",void 0),i([c.property({dependsOn:["mapViewNavigation.interacting"],type:Boolean})],o.prototype,"interacting",null),i([c.property({type:Boolean,constructOnly:!0})],o.prototype,"supersampleScreenhotsEnabled",void 0),i([c.property({type:_})],o.prototype,"ui",void 0),i([c.property({readOnly:!0})],o.prototype,"rendering",void 0),o=i([c.subclass("esri.views.MapView")],o)}(c.declared(d,g))});