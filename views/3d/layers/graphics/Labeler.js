// COPYRIGHT © 2019 Esri
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
// See http://js.arcgis.com/4.14/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/Accessor","../../../../core/asyncUtils","../../../../core/Handles","../../../../core/maybe","../../../../core/promiseUtils","../../../../core/accessorSupport/decorators","../../../../layers/graphics/dehydratedFeatures","../../../../layers/support/labelFormatUtils","../../../../layers/support/layerUtils","../../../../symbols/callouts/calloutUtils","./Graphics3DCalloutSymbolLayerFactory","./graphicSymbolUtils","./labelPlacement","../../support/debugFlags","../../webgl-engine/lib/Layer","../../webgl-engine/lib/MaterialCollection","../../webgl-engine/lib/TextRenderer","../../webgl-engine/lib/TextRenderParameters","../../webgl-engine/lib/TextTextureAtlas","../../../support/index"],function(e,t,a,r,l,i,s,n,o,c,h,u,p,b,d,y,f,g,v,C,x,m,L,T,D,G){Object.defineProperty(t,"__esModule",{value:!0});var w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.idHint="__labeler",t._dirty=!1,t.labels=new Map,t.labelsToAdd=new Map,t.labelsToRemove=new Map,t.labelingContexts=[],t}return a(t,e),t.prototype.setup=function(){var e=this;this.handles||(this.handles=new o,this.handles.add([this.view.watch("state.camera",function(){return e.setDirty()}),this.view.watch("pixelRatio",function(){return e.resetAllLabels()})])),this.textTextureAtlas||(this.textTextureAtlas=new D.default({idHint:this.idHint+"_atlas",view:this.view}),this.hudMaterialCollection=new m(this.view._stage),this.calloutMaterialCollection=new m(this.view._stage));var t=this.view.resourceController.scheduler;this.handles.add(t.registerTask(G.Task.LABELER,function(t){return e.update(t)},function(){return e.needsUpdate()}))},t.prototype.dispose=function(){this.handles&&(this.handles.destroy(),this.handles=null),this.textTextureAtlas&&(this.textTextureAtlas.dispose(),this.textTextureAtlas=null),this.hudMaterialCollection&&(this.hudMaterialCollection.dispose(),this.hudMaterialCollection=null),this.calloutMaterialCollection&&(this.calloutMaterialCollection.dispose(),this.calloutMaterialCollection=null),this.labelingContexts=[],this.labels.clear(),this.labelsToAdd.clear(),this.labelsToRemove.clear()},t.prototype.isActiveLabelingContext=function(e){return e.active&&d.areLabelsVisible(e.layer)},t.prototype.activateLabelingContext=function(e){var t=this;e.labels.forEach(function(e,a){t.labels.set(a,e),e.graphics3DGraphic.setVisibilityFlag(0,!0,1)}),e.active=!0},t.prototype.deactivateLabelingContext=function(e){var t=this;e.labels.forEach(function(e,a){e.graphics3DGraphic.setVisibilityFlag(0,!1,1),e.rendered&&t.labelsToRemove.set(a,e),t.labels.delete(a),t.labelsToAdd.delete(a)}),e.active=!1},t.prototype.addLabelTextureToAtlas=function(e){for(var t=0;t<e.graphics3DGraphic._labelGraphics.length;t++){var a=e.graphics3DGraphic._labelGraphics[t];if(a._labelClass){var r=e.textRenderers[a._labelIndex];r&&this.textTextureAtlas.addTextTexture(r,a.stageObject)}}e.rendered=!0},t.prototype.removeLabelTextureFromAtlas=function(e){for(var t=e.graphics3DGraphic,a=0;a<t._labelGraphics.length;a++){var r=t._labelGraphics[a];if(r._labelClass){var l=e.textRenderers[r._labelIndex];l&&this.textTextureAtlas.removeTextTexture(l,t._labelGraphics[a].stageObject)}}e.rendered=!1},t.prototype.needsUpdate=function(){return this.view.ready&&this.isDirty},t.prototype.update=function(e){var t=this;this._dirty=!1;for(var a=!1,r=this,l=0,i=this.labelingContexts;l<i.length;l++){var s=i[l];!function(l){if(!r.isActiveLabelingContext(l))return"continue";if(!r.hasValidLabelClassContext(l)){if(r.hasInvalidLabelClassContext(l))return r.deactivateLabelingContext(l),"continue";if(r.createLabelClassContext(l),r.hasPendingLabelClassContext(l))return r._dirty=!0,"continue";if(!r.hasValidLabelClassContext(l))return"continue"}l.labelsToInitialize.forEach(function(r,i){if(t.ensureGraphics3DResources(r)&&(t.labels.set(i,r),a=!0),(r.visible&&r.hasTextTextureResources||!r.visible&&r.hasGraphics3DResources)&&l.labelsToInitialize.delete(i),e&&(e.madeProgress(),e.done))return void(t._dirty=!0)})}(s)}e&&a&&this.view.deconflictor.setDirty(),this.labelsToRemove.forEach(function(e){return t.removeLabelTextureFromAtlas(e)}),this.labelsToRemove.clear(),this.labelsToAdd.forEach(function(e){return t.addLabelTextureToAtlas(e)}),this.labelsToAdd.clear(),this._dirty||this.notifyChange("updating")},t.prototype.hasPendingLabelClassContext=function(e){return e.labelClassPromise&&!!e.labelClassAbortController},t.prototype.hasValidLabelClassContext=function(e){return e.labelClassContexts&&e.labelClassContexts.length},t.prototype.hasInvalidLabelClassContext=function(e){return null===e.labelClassContexts},t.prototype.createLabelClassContextAsync=function(e){return i(this,void 0,void 0,function(){var t,a,r,s,o,c=this;return l(this,function(u){switch(u.label){case 0:return t=e.labelClassAbortController.signal,[4,e.layer.when()];case 1:return u.sent(),(h.throwIfAborted(t),e.scaleVisibility&&e.scaleVisibility.updateScaleRangeActive(),a=e.graphics3DCore,r=a.layer,(s=r.labelingInfo&&r.labelingInfo.filter(function(e){return!!e.symbol}))&&0!==s.length)?(o=new Array(s.length),[4,n.forEach(s,function(r,s){return i(c,void 0,void 0,function(){var i,c,u,p;return l(this,function(l){switch(l.label){case 0:return i=r.symbol,c=g.getGraphics3DSymbol(a.getOrCreateGraphics3DSymbol(i)),[4,c.load()];case 1:return l.sent(),(h.throwIfAborted(t),u=null,y.isCalloutSupport(i)&&i.hasVisibleCallout())?(u=f.make(i,a.symbolCreationContext),[4,u.load()]):[3,3];case 2:l.sent(),h.throwIfAborted(t),l.label=3;case 3:return[4,n.result(b.createLabelFunction(r,e.layer.fields.map(function(e){return e.toJSON()}),this.view.spatialReference))];case 4:return p=l.sent(),h.throwIfAborted(t),!0===p.ok&&(o[s]={labelClass:r,labelFunction:p.value,graphics3DSymbol:c,graphics3DCalloutSymbolLayer:u,calloutSymbolLayerIndex:0,textRenderParameters:this.createTextRenderParameters(c.symbol)}),[2]}})})})]):[2,null];case 2:return u.sent(),h.throwIfAborted(t),e.labelClassContexts=o,[2]}})})},t.prototype.createLabelClassContext=function(e){return i(this,void 0,void 0,function(){var t=this;return l(this,function(a){return e.labelClassPromise||(e.labelClassPromise=this.createLabelClassContextAsync(e).catch(function(t){if(h.isAbortError(t))throw t;e.labelClassContexts=null}).then(function(){e.labelClassAbortController=null,t.notifyChange("updating")}),this.notifyChange("updating")),[2,e.labelClassPromise]})})},t.prototype.createTextRenderParameters=function(e){var t=e.symbolLayers.getItemAt(0);return t&&"text"===t.type?T.default.fromSymbol(t,this.view.pixelRatio):null},t.prototype.destroyLabelClassContext=function(e){for(var t=0,a=e.labelClassContexts;t<a.length;t++){var r=a[t];--r.graphics3DSymbol.referenced,r.graphics3DSymbol=null}var l=e.labelClassAbortController;e.labelClassAbortController=h.createAbortController(),l&&l.abort(),e.labelClassContexts=[],e.labelClassPromise=null,this.notifyChange("updating")},t.prototype.createTextSymbolGraphic=function(e,t,a,r,l){var i={text:e.text,centerOffset:a.centerOffset,translation:a.translation,elevationOffset:a.elevationOffset,screenOffset:a.screenOffset,anchor:a.anchor,centerOffsetUnits:a.centerOffsetUnits,verticalOffset:a.verticalOffset,debugDrawBorder:C.LABELS_SHOW_BORDER,displayWidth:e.displayWidth,displayHeight:e.displayHeight};return A.graphic=t,A.renderingInfo=null,A.layer=r,l.createLabel(A,i,this.hudMaterialCollection,this.textTextureAtlas)},t.prototype.createLineCalloutGraphic=function(e,t,a,r,l){var i={symbol:t,translation:r.translation,elevationOffset:r.elevationOffset,screenOffset:r.screenOffset,centerOffset:r.centerOffset,centerOffsetUnits:r.centerOffsetUnits,materialCollection:this.calloutMaterialCollection};return A.graphic=e,A.renderingInfo=i,A.layer=l,a.createGraphics3DGraphic(A)},t.prototype.ensureGraphics3DResources=function(e){var t=e.graphics3DGraphic;if(t.destroyed)return!1;if(e.hasGraphics3DResources)return!1;this.ensureTextTextureResources(e);var a=e.labelingContext,r=!1,l=t.graphic,i=a.labelClassContexts,s=a.layer,n=d.areLabelsVisible(a.layer);if(!i||0===i.length||!a.emptySymbolLabelSupported&&0===t._graphics.length)return!1;for(var o=0;o<i.length;o++){var h=i[o],u=h.labelClass,p=e.textRenderers[o];if(p){var b=h.graphics3DSymbol,y=null;b.symbol&&"label-3d"===b.symbol.type&&(y=b.symbol);var f=b.symbolLayers[0],g=v.get({graphics3DGraphic:t,labelSymbol:y,labelClass:h.labelClass,disablePlacement:a.disablePlacement});if(f&&!c.isNone(g)){f.setElevationInfoOverride(a.elevationInfoOverride);var C=this.createTextSymbolGraphic(p,l,g,s,f);if(!C)return!1;if(C._labelClass=u,C._labelIndex=o,t.addLabelGraphic(C,a.stageLayer,this.view._stage),t.setVisibilityFlag(0,n,1),t.clearVisibilityFlag(1,1),t.setVisibilityFlag(3,!1,1),r=!0,h.graphics3DCalloutSymbolLayer&&g.hasLabelVerticalOffset){var x=this.createLineCalloutGraphic(l,y,h.graphics3DCalloutSymbolLayer,g,s);x&&(h.calloutSymbolLayerIndex=t._labelGraphics.length,t.addLabelGraphic(x,a.stageLayer,this.view._stage))}break}}}return a.scaleVisibility&&r&&a.scaleVisibility.updateGraphicLabelScaleVisibility(t),e.hasGraphics3DResources=!0,!0},t.prototype.destroyGraphics3DResources=function(e){for(var t=e.labelingContext,a=t.labelClassContexts,r=0,l=e.graphics3DGraphic._labelGraphics;r<l.length;r++){var i=l[r];if(null!=i._labelClass){var s=a[i._labelIndex],n=s.graphics3DSymbol,o=n.symbolLayers[0];null!=o&&o.onRemoveGraphic(i)}}e.graphics3DGraphic.clearLabelGraphics(),e.hasGraphics3DResources=!1},t.prototype.ensureTextTextureResources=function(e){if(!e.hasTextTextureResources){var t=e.labelingContext,a=e.graphics3DGraphic,r=t.labelClassContexts,l=a.graphic;if(r&&0!==r.length){for(var i=0;i<r.length;i++){var s=r[i];if(e.textRenderers[i]=null,s.textRenderParameters){var n=s.labelFunction,o=void 0;if("arcade"===n.type){var h=p.hydrateGraphic(l,t.layer);try{o=n.evaluate(h)}catch(e){o=null}}else o=n.evaluate(l);c.isNone(o)||""===o||(e.textRenderers[i]=new L.default(o,s.textRenderParameters))}}e.hasTextTextureResources=!0}}},t.prototype.destroyTextTextureResources=function(e){e.textRenderers=[],e.hasTextTextureResources=!1},t.prototype.addGraphic=function(e,t){var a={hasGraphics3DResources:!1,hasTextTextureResources:!1,visible:!1,rendered:!1,labelingContext:e,graphics3DGraphic:t,textRenderers:[]},r=t.graphic.uid;e.labels.set(r,a),this.isActiveLabelingContext(e)&&this.hasValidLabelClassContext(e)&&this.ensureGraphics3DResources(a)?this.labels.set(r,a):e.labelsToInitialize.set(r,a);var l=e.graphics3DCore.asyncUpdates;this.setDirty(l),this.view.deconflictor.setDirty()},t.prototype.removeGraphic=function(e,t){var a=t.graphic.uid,r=e.labels.get(a);if(r){this.destroyGraphic(r,a),e.labels.delete(a),e.labelsToInitialize.delete(a);var l=e.graphics3DCore.asyncUpdates;this.setDirty(l),this.view.deconflictor.setDirty()}},t.prototype.destroyGraphic=function(e,t){this.labels.has(t)&&(this.labels.delete(t),this.labelsToAdd.delete(t),this.labelsToRemove.delete(t)),e.hasTextTextureResources&&(this.removeLabelTextureFromAtlas(e),this.destroyTextTextureResources(e)),e.hasGraphics3DResources&&this.destroyGraphics3DResources(e)},t.prototype.labelingInfoChange=function(e,t){return i(this,void 0,void 0,function(){var a,r,i,s;return l(this,function(l){if(t){for(a=0,r=t;a<r.length;a++)i=r[a],(s=e.labels.get(i))&&(this.removeGraphic(e,s.graphics3DGraphic),this.addGraphic(e,s.graphics3DGraphic));return[2]}return this.visibilityInfoChange(e),this.resetLabels(e),[2,this.createLabelClassContext(e)]})})},t.prototype.globalPropertyChanged=function(e,t){for(var a=0,r=t.labelClassContexts;a<r.length;a++){var l=r[a];!function(a){var r=new Map;t.labels.forEach(function(e){var t=e.graphics3DGraphic;r.set(t.graphic.uid,t)});var l=function(e){return e._labelGraphics[0]};if(c.expect(a.graphics3DSymbol.symbolLayers[0]).globalPropertyChanged(e,r,l),a.graphics3DCalloutSymbolLayer){var i=function(e){return e._labelGraphics[a.calloutSymbolLayerIndex]};a.graphics3DCalloutSymbolLayer.globalPropertyChanged(e,r,i)}}(l)}},t.prototype.visibilityInfoChange=function(e){var t=e.layer.labelsVisible;t&&!e.active&&this.activateLabelingContext(e),!t&&e.active&&this.deactivateLabelingContext(e);var a=e.graphics3DCore.asyncUpdates;this.setDirty(a)},t.prototype.resetAllLabels=function(){for(var e=0,t=this.labelingContexts;e<t.length;e++){var a=t[e];this.resetLabels(a)}},t.prototype.resetLabels=function(e){var t=this;e.labels.forEach(function(a,r){t.destroyGraphic(a,r),a.visible=!1,a.rendered=!1,e.labelsToInitialize.set(r,a)}),this.destroyLabelClassContext(e);var a=e.graphics3DCore.asyncUpdates;this.setDirty(a),this.view.deconflictor.setDirty()},t.prototype.findLabelingContext=function(e){for(var t=0,a=this.labelingContexts;t<a.length;t++){var r=a[t];if(r.graphics3DCore===e)return r}return null},t.prototype.addGraphicsOwner=function(e,t,a){var r=this,l=a&&a.emptySymbolLabelSupported||!1,i=a&&a.elevationInfoOverride||null,s=a&&a.disablePlacement||null;if(!this.findLabelingContext(e)){var n=e.layer,o={graphics3DCore:e,layer:n,scaleVisibility:t,emptySymbolLabelSupported:l,elevationInfoOverride:i,disablePlacement:s,active:e.layer.labelsVisible,labelClassPromise:null,labelClassAbortController:h.createAbortController(),labelClassContexts:[],labels:new Map,labelsToInitialize:new Map,stageLayer:new x(this.idHint+"_"+n.uid,{isPickable:!0},n.uid)};return this.view._stage.add(0,o.stageLayer),this.view._stage.addToViewContent([o.stageLayer.id]),this.labelingContexts.push(o),this.setDirty(),{addGraphic:function(e){return r.addGraphic(o,e)},removeGraphic:function(e){return r.removeGraphic(o,e)},featureReductionChange:function(){},layerLabelsEnabled:function(){return d.areLabelsVisible(o.layer)},labelingInfoChange:function(e){return r.labelingInfoChange(o,e)},elevationInfoChange:function(){return r.globalPropertyChanged("elevationInfo",o)},slicePlaneEnabledChange:function(){return r.globalPropertyChanged("slicePlaneEnabled",o)},visibilityInfoChange:function(){return r.visibilityInfoChange(o)},reset:function(){return r.resetLabels(o)},clear:function(){},processStageDirty:function(){return r.view._stage.processDirtyLayer(o.stageLayer.id)}}}},t.prototype.removeGraphicsOwner=function(e){var t=this,a=this.findLabelingContext(e);if(a){var r=this.labelingContexts.indexOf(a);this.labelingContexts.splice(r,1),a.labels.forEach(function(e){return t.removeGraphic(a,e.graphics3DGraphic)});var l=a.stageLayer.id;this.view._stage.removeFromViewContent([l]),this.view._stage.remove(0,l),a.stageLayer=null,this.setDirty()}},t.prototype.setLabelGraphicVisibility=function(e,t){var a=e.graphic.uid,r=this.labels.get(a);if(r){t&&!r.rendered?(this.labelsToAdd.set(a,r),this.labelsToRemove.delete(a),r.hasTextTextureResources||r.labelingContext.labelsToInitialize.set(a,r)):!t&&r.rendered&&(this.labelsToRemove.set(a,r),this.labelsToAdd.delete(a)),r.visible=t;var l=r.labelingContext.graphics3DCore.asyncUpdates;this.setDirty(l)}},Object.defineProperty(t.prototype,"isDirty",{get:function(){return this._dirty||this.textTextureAtlas&&this.textTextureAtlas.isDirty},enumerable:!0,configurable:!0}),t.prototype.setDirty=function(e){void 0===e&&(e=!0);var t=this._dirty;this._dirty||(this._dirty=!0),e||this.update(null),t!==this._dirty&&this.notifyChange("updating")},Object.defineProperty(t.prototype,"updating",{get:function(){var e=this;return this._dirty||this.textTextureAtlas&&this.textTextureAtlas.updating||this.labelingContexts.some(function(t){return e.hasPendingLabelClassContext(t)})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"test",{get:function(){return{textTextureAtlas:this.textTextureAtlas}},enumerable:!0,configurable:!0}),r([u.property({constructOnly:!0})],t.prototype,"view",void 0),r([u.property()],t.prototype,"textTextureAtlas",void 0),r([u.property({type:Boolean,readOnly:!0,dependsOn:["textTextureAtlas.updating"]})],t.prototype,"updating",null),t=r([u.subclass("esri.views.3d.layers.graphics.Labeler")],t)}(u.declared(s));t.Labeler=w;var A={graphic:null,renderingInfo:null,layer:null}});