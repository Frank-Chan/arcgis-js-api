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

define(["require","exports","dojo/sniff","../config","./global","../views/webgl/context-util"],(function(e,r,t,a,n,i){if("object"==typeof a.has){for(var o=0,s=Object.keys(a.has);o<s.length;o++){var d=s[o];t.add(d,a.has[d],!1,!0)}delete a.has}!function(){if(!t("host-node")){var e=navigator.userAgent,r=e.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i),a=e.match(/iPhone/i);r&&t.add("esri-mobile",r),a&&t.add("esri-iPhone",a),t.add("esri-geolocation",(function(){return!!navigator.geolocation})),t.add("esri-canvas-svg-support",(function(){return!(t("trident")||t("ie"))})),t.add("esri-secure-context",(function(){return"isSecureContext"in n?n.isSecureContext:n.location&&n.location.origin?0===n.location.origin.indexOf("https:"):void 0})),t.add("esri-wasm","WebAssembly"in n),t.add("esri-shared-array-buffer",(function(){var e="SharedArrayBuffer"in n,r=!1===n.crossOriginIsolated;return e&&!r})),t.add("esri-atomics","Atomics"in n),t.add("esri-workers","Worker"in n),t.add("esri-text-decoder","TextDecoder"in n),t.add("esri-deprecation-warnings",!0),t.add("esri-native-promise",!t("disable-feature:esri-native-promise")),t("host-webworker")||(t.add("esri-abortable-fetch","fetch"in n&&"signal"in new Request("https://www.arcgis.com")),t.add("esri-image-decode",(function(){if("decode"in new Image){var e=new Image;return e.src='data:image/svg+xml;charset=UTF-8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>',void e.decode().then((function(){t.add("esri-image-decode",!0,!0,!0)})).catch((function(){t.add("esri-image-decode",!1,!0,!0)}))}return!1})),t.add("esri-url-encodes-apostrophe",(function(){var e=n.document.createElement("a");return e.href="?'",e.href.indexOf("?%27")>-1})),t.add("esri-webgl",(function(){return l().available})),t.add("esri-webgl-high-precision-fragment",(function(){return l().supportsHighPrecisionFragment})),t.add("esri-webgl-vertex-shader-samplers",(function(){return l().supportsVertexShaderSamplers})),t.add("esri-webgl-element-index-uint",(function(){return l().supportsElementIndexUint})),t.add("esri-webgl-standard-derivatives",(function(){return l().supportsStandardDerivatives})),t.add("esri-webgl-texture-float",(function(){return l().supportsTextureFloat})),t.add("esri-webgl-color-buffer-float",(function(){return l().supportsColorBufferFloat})),t.add("esri-webgl-instanced-arrays",(function(){return l().supportsInstancedArrays})),t.add("esri-webgl-major-performance-caveat",(function(){return l().majorPerformanceCaveat})),t.add("esri-featurelayer-webgl",!0),t.add("esri-featurelayer-webgl-labeling",!0),t.add("esri-webgl2",(function(){return function(){if(c)return c;if(c={available:!1,version:0},void 0===typeof WebGL2RenderingContext)return c;var e=document.createElement("canvas");if(!e)return c;var r=i.createContext(e,{},"webgl2");if(!r)return c;c.available=!0;var t=r.getParameter(r.VERSION);if(!t)return c;var a=t.match(/^WebGL\s+([\d.]*)/);a&&(c.version=parseFloat(a[1]));return c}().available})),t.add("esri-webgl-max-texture-size",(function(){return l().maxTextureSize})))}}();var u=null;function l(){if(u)return u;if(u={available:!1,majorPerformanceCaveat:!1,maxTextureSize:0,supportsHighPrecisionFragment:!1,supportsVertexShaderSamplers:!1,supportsElementIndexUint:!1,supportsStandardDerivatives:!1,supportsInstancedArrays:!1,supportsTextureFloat:!1,supportsColorBufferFloat:!1,version:0},void 0===typeof WebGLRenderingContext)return u;var e=document.createElement("canvas");if(!e)return u;var r=i.createContext(e,{failIfMajorPerformanceCaveat:!0},"webgl");if(r||(r=i.createContext(e,{},"webgl"))&&(u.majorPerformanceCaveat=!0),!r)return u;var t=r.getParameter(r.VERSION);if(!t)return u;var a=t.match(/^WebGL\s+([\d.]*)/);if(a){u.version=parseFloat(a[1]),u.available=u.version>=.94;var n=r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT);n&&(u.supportsHighPrecisionFragment=n.precision>0),u.supportsVertexShaderSamplers=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS)>0,u.supportsElementIndexUint=null!==r.getExtension("OES_element_index_uint"),u.supportsStandardDerivatives=null!==r.getExtension("OES_standard_derivatives"),u.supportsInstancedArrays=null!==r.getExtension("ANGLE_instanced_arrays"),u.supportsTextureFloat=null!==r.getExtension("OES_texture_float"),u.supportsColorBufferFloat=null!==r.getExtension("WEBGL_color_buffer_float")}return u.maxTextureSize=r.getParameter(r.MAX_TEXTURE_SIZE),u}var c=null;return t}));