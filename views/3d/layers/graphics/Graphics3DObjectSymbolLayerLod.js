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
// See http://js.arcgis.com/4.9/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","dojo/errors/CancelError","../../../../Color","../../../../core/asyncUtils","../../../../core/lang","../../../../core/screenUtils","../../../../geometry/support/aaBoundingBox","../../../../symbols/ObjectSymbol3DLayer","./ElevationAligners","./Graphics3DLodInstanceGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","./graphicUtils","./lodResourceUtils","./primitiveObjectSymbolUtils","../support/FastSymbolUpdates","../../lib/gl-matrix","../../support/projectionUtils","../../webgl-engine/Stage","../../webgl-engine/lib/Util","../../webgl-engine/lib/lodRendering/LodRenderer","../../webgl-engine/lib/lodRendering/LodResources","../../webgl-engine/materials/DefaultMaterial"],function(e,t,r,i,o,s,a,n,l,c,p,d,u,h,m,_,f,y,v,g,b,x,R,S,P){var U=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._instanceIndexToGraphicUid={},t}return r(t,e),Object.defineProperty(t.prototype,"lodRenderer",{get:function(){return this._lodRenderer},enumerable:!0,configurable:!0}),t.prototype._prepareResources=function(){var e=this.symbol,t=this._getStageIdHint();if(this._optionalFields=[],!this._isPropertyDriven("size")){var r=m.validateSymbolLayerSize(this.symbol);if(r)return this._logWarning(r),void this.reject()}if(e.resource&&e.resource.href)this._prepareModelResources(e.resource.href,t);else{var i=e.resource?e.resource.primitive:"sphere";this._preparePrimitiveResources(i,t)}},t.prototype._preparePrimitiveResources=function(e,t){if(!f.isValidPrimitive(e))return this._logWarning("Unknown object symbol primitive: "+e),void this.reject();var r=this.symbol,i=this._getMaterialOpacity(),s={specular:[0,0,0],opacity:i,transparent:i<1||this._isPropertyDriven("opacity"),instanced:["transformation"],ambient:L,diffuse:L},c=this.symbolContainer;if("point-3d"===c.type&&c.verticalOffset){var p=c.verticalOffset,d=p.screenLength,u=p.minWorldLength,h=p.maxWorldLength;s.verticalOffset={screenLength:n.pt2px(d),minWorldLength:u||0,maxWorldLength:null!=h?h:1/0},s.castShadows=!1}if(this._context.screenSizePerspectiveEnabled&&(s.screenSizePerspective=this._context.sharedResources.screenSizePerspectiveSettings),this._isPropertyDriven("color"))s.externalColor=O;else{var _=r.material?o.toUnitRGBA(r.material.color):O;s.externalColor=_}this._fastUpdates=y.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions()),this._fastUpdates.enabled?(a.mixin(s,this._fastUpdates.materialParameters),s.instanced.push("featureAttribute"),this._optionalFields.push("featureAttribute")):this._hasPerInstanceColor()&&(s.instanced.push("color"),this._optionalFields.push("color"));var v=new P(s,t+"_objectmat");if(this._lodResources=f.primitiveLodResources(e,v,t),!this._lodResources)return this._logWarning("Unknown object symbol primitive: "+e),void this.reject();this._resourceBoundingBox=l.create(f.primitiveBoundingBox(e)),this._resourceSize=l.size(this._resourceBoundingBox),this._symbolSize=m.computeSizeWithResourceSize(this._resourceSize,r),this.finalizeSymbolResources(),this.initializeLodRenderer(),this.resolve()},t.prototype._prepareModelResources=function(e,t){var r=this,o=["transformation"],c={instanced:o},p={materialParamsMixin:c,idHint:t,streamDataSupplier:this._context.streamDataSupplier};this._fastUpdates=y.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions()),this._fastUpdates.enabled?(a.mixin(p.materialParamsMixin,this._fastUpdates.materialParameters),o.push("featureAttribute"),this._optionalFields.push("featureAttribute")):this._hasPerInstanceColor()&&(o.push("color"),this._optionalFields.push("color"));var d=this.symbolContainer;if("point-3d"===d.type&&d.verticalOffset){var u=d.verticalOffset,h=u.screenLength,f=u.minWorldLength,v=u.maxWorldLength;p.materialParamsMixin.verticalOffset={screenLength:n.pt2px(h),minWorldLength:f||0,maxWorldLength:null!=v?v:1/0},p.materialParamsMixin.castShadows=!1}this._symbolLoaderPromise=s.safeCast(_.fetchObjectLodResources(e,p)),this._symbolLoaderPromise.then(function(e){if(r._symbolLoaderPromise=null,!r.isRejected()){_.fillEstimatedMinScreenSpaceRadius(e),r._lodResources=e;var t=r._context,i=r.symbol.material,o=r._getExternalColorParameters(i),s=r._getMaterialOpacity(),a=r._isPropertyDriven("opacity"),n=S.materialsFromLodResources(r._lodResources);r._originalOpacities=n.map(function(e){return e.getParameterValues().opacity||1}),n.forEach(function(e){var r=e.getParameterValues();e.setParameterValues(o);var i=r.opacity*s,n=i<1||a||r.transparent;e.setParameterValues({opacity:i,transparent:n}),t.screenSizePerspectiveEnabled&&e.setParameterValues({screenSizePerspective:t.sharedResources.screenSizePerspectiveSettings})}),r._resourceBoundingBox=S.computeBoundingBox(r._lodResources.levels[0]),r._resourceSize=l.size(r._resourceBoundingBox),r._pivotOffset=r._lodResources.levels[0].pivotOffset,r._symbolSize=m.computeSizeWithResourceSize(r._resourceSize,r.symbol),r.finalizeSymbolResources(),r.initializeLodRenderer(),y.updateFastSymbolUpdatesState(r._fastUpdates,r._context.renderer,r._fastVisualVariableConvertOptions())&&r._materials.forEach(function(e){return e.setParameterValues(r._fastUpdates.materialParameters)}),r.resolve()}},function(e){if(r._symbolLoaderPromise=null,!r.isFulfilled()){if(!(e instanceof i)){var t="ObjectSymbol3DLayer failed to load";e&&e.message&&(t+=" ("+e.message+")"),r._logWarning(t)}r.reject()}})},t.prototype.finalizeSymbolResources=function(){var e=this._context.stage;this._materials=S.materialsFromLodResources(this._lodResources),this._originalOpacities||(this._originalOpacities=this._materials.map(function(e){return e.getParameterValues().opacity||1})),this._materials.forEach(function(t){e.add(b.ModelContentType.MATERIAL,t)}),this._textures=S.texturesFromLodResources(this._lodResources),this._textures.forEach(function(t){e.add(b.ModelContentType.TEXTURE,t)}),this._geometries=S.geometriesFromLodResources(this._lodResources),this._geometries.forEach(function(t){e.add(b.ModelContentType.GEOMETRY,t)})},t.prototype.initializeLodRenderer=function(){var e=this,t=this._context.stage,r=function(t){return{layerUid:e._context.layer.uid,graphicUid:e._instanceIndexToGraphicUid[t]}};this._lodRenderer=new R.LodRenderer(this._lodResources,this._optionalFields,r),t.addRenderPlugin(this._lodRenderer.slots,this._lodRenderer)},t.prototype._getExternalColorParameters=function(e){var t={};return this._isPropertyDriven("color")?t.externalColor=O:e&&e.color?t.externalColor=o.toUnitRGBA(e.color):(t.externalColor=O,t.colorMixMode="ignore"),t},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.isFulfilled()||this.reject(),this._symbolLoaderPromise&&this._symbolLoaderPromise.cancel();var t=this._context.stage;this._lodRenderer&&(t.removeRenderPlugin(this._lodRenderer),this._lodRenderer.destroy()),this._materials&&this._materials.forEach(function(e){return t.remove(b.ModelContentType.MATERIAL,e.id)}),this._textures&&this._textures.forEach(function(e){return t.remove(b.ModelContentType.TEXTURE,e.id)}),this._geometries&&this._geometries.forEach(function(e){return t.remove(b.ModelContentType.GEOMETRY,e.id)})},t.prototype.createGraphics3DGraphic=function(e){var t=e.graphic;if(!this._validateGeometry(t.geometry))return null;var r=u.placePointOnGeometry(t.geometry);if(!r)return this._logWarning("unsupported geometry type for icon symbol: "+t.geometry.type),null;var i="graphic"+t.uid,o=this.getGraphicElevationContext(t),s=e.renderingInfo;return this._createAs3DShape(t,r,s,o,i,t.uid)},t.prototype.notifyDestroyGraphicLayer=function(e){delete this._instanceIndexToGraphicUid[e.instanceIndex]},t.prototype.graphicLayerToGraphicId=function(e){return 0},t.prototype.layerPropertyChanged=function(e,t,r){var i=this;if("opacity"===e){var o=this._isPropertyDriven("opacity");return this._materials.forEach(function(e,t){var r=i._getMaterialOpacity()*i._originalOpacities[t];e.setParameterValues({opacity:r,transparent:r<1||o})}),!0}if("elevationInfo"===e){this._updateElevationContext();for(var s in t){var a=t[s],n=r(a);if(n){var l=a.graphic,c=this.getGraphicElevationContext(l);n.needsElevationUpdates=u.needsElevationUpdates3D(c.mode),n.elevationContext.set(c)}}return!0}return!1},t.prototype.applyRendererDiff=function(e,t,r,i){var o=this;for(var s in e.diff)switch(s){case"visualVariables":if(!y.updateFastSymbolUpdatesState(this._fastUpdates,t,this._fastVisualVariableConvertOptions()))return!1;this._materials.forEach(function(e){return e.setParameterValues(o._fastUpdates.materialParameters)});break;default:return!1}return!0},Object.defineProperty(t.prototype,"numberOfVertices",{get:function(){return S.geometriesFromLodLevelResources(this._lodResources.levels[0]).reduce(function(e,t){return e+t.data.getIndices(x.VertexAttrConstants.POSITION).length},0)},enumerable:!0,configurable:!0}),t.prototype._createAs3DShape=function(e,t,r,i,o,s){var a=this.getFastUpdateAttrValues(e),n=!this._fastUpdates.enabled&&this._hasPerInstanceColor()?m.mixinColorAndOpacity(r.color,r.opacity):null,l=this._context.clippingExtent;if(g.pointToVector(t,E,this._context.elevationProvider.spatialReference),l&&!u.pointInBox2D(E,l))return null;g.pointToVector(t,E,this._context.renderSpatialReference);var c="absolute-height"!==i.mode,h=u.computeElevation(this._context.elevationProvider,t,i,this._context.renderCoordsHelper,c?T:null),_=z,f=B;v.mat4d.identity(z),this._applyObjectRotation(r,_),this._applyObjectRotation(this.symbol,_),this._applyObjectScale(r,_),this._applyAnchor(_),E[0]=t.x,E[1]=t.y,E[2]=h,g.computeLinearTransformation(t.spatialReference,E,f,this._context.renderSpatialReference)||console.warn("Could not locate symbol object properly, it might be misplaced");var y=this._lodRenderer.instanceData;v.mat4d.multiply(f,_,f);var b=y.addInstance();this._instanceIndexToGraphicUid[b]=s,y.setTransform(b,f),a&&y.setFeatureAttribute(b,a),n&&y.setColor(b,n);var x=p.perLodInstanceElevationAligner,R=new d(this,b,x,i);return c&&(R.alignedTerrainElevation=T.terrainElevation),R.needsElevationUpdates=u.needsElevationUpdates3D(i.mode),u.extendPointGraphicElevationContext(R,t,this._context.elevationProvider),R},t.prototype._applyObjectScale=function(e,t){if(!this._fastUpdates.enabled||!this._fastUpdates.customTransformation){var r=this._isPropertyDriven("size")&&e.size?e.size:this._symbolSize,i=m.computeObjectScale(r,this._symbolSize,this._resourceSize,this._context.renderCoordsHelper.unitInMeters);1===i[0]&&1===i[1]&&1===i[2]||v.mat4d.scale(t,i)}},t.prototype._applyObjectRotation=function(e,t){if(!(this._fastUpdates.enabled&&this._fastUpdates.customTransformation&&e instanceof c))return m.computeObjectRotation(e.heading,e.tilt,e.roll,t)},t.prototype._computeAnchor=function(){switch(this.symbol.anchor){case"center":return v.vec3d.scale(l.center(this._resourceBoundingBox),-1);case"top":var e=l.center(this._resourceBoundingBox);return[-e[0],-e[1],-this._resourceBoundingBox[5]];case"bottom":var e=l.center(this._resourceBoundingBox);return[-e[0],-e[1],-this._resourceBoundingBox[2]];case"origin":default:return this._pivotOffset?v.vec3d.scale(this._pivotOffset,-1,new Array(3)):C}},t.prototype._applyAnchor=function(e){if(!this._fastUpdates.enabled||!this._fastUpdates.customTransformation){var t=this._computeAnchor();t&&v.mat4d.translate(e,t)}},t.prototype._hasPerInstanceColor=function(){return this._isPropertyDriven("color")||this._isPropertyDriven("opacity")},t.prototype._fastVisualVariableConvertOptions=function(){var e=this._resourceBoundingBox?l.size(this._resourceBoundingBox):L,t=this._resourceBoundingBox?this._computeAnchor():C,r=this._context.renderCoordsHelper.unitInMeters,i=m.computeObjectScale(this._symbolSize,this._symbolSize,this._resourceSize,r),o=[this.symbol.tilt||0,this.symbol.roll||0,this.symbol.heading||0];return{modelSize:e,symbolSize:this._symbolSize||L,unitInMeters:r,transformation:{anchor:t,scale:i,rotation:o}}},t}(h),L=[1,1,1],O=[1,1,1,1],C=[0,0,0],E=v.vec3d.create(),z=v.mat4d.create(),B=v.mat4d.create(),T={verticalDistanceToGround:0,terrainElevation:0};return U});