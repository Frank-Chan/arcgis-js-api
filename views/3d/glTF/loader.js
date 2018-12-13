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

define(["require","exports","../../../core/tsSupport/awaiterHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/assignHelper","../../../core/lang","../../../core/promiseUtils","../../../core/libs/gl-matrix-2/gl-matrix","../../../geometry/support/aaBoundingBox","./DefaultErrorContext","./esriProvidedModelParameters","./internal/indexUtils","./internal/Resource","../support/mathUtils","../support/buffer/BufferView","../support/buffer/math","../support/buffer/utils","../webgl-engine/lib/Geometry","../webgl-engine/lib/GeometryData","../webgl-engine/lib/Texture","../webgl-engine/materials/DefaultMaterial"],function(e,r,t,n,a,o,i,s,u,l,c,f,d,p,m,v,g,h,x,w,b){function T(e,r,o){return void 0===o&&(o={}),t(this,void 0,void 0,function(){var i,l,c,f,p,w,T,_,C=this;return n(this,function(N){switch(N.label){case 0:return[4,d.Resource.load(e,L,r)];case 1:return i=N.sent(),l={textures:new Map,materials:new Map},c=[],f=0,p=i.json.asset.extras&&"symbolResource"===i.json.asset.extras.ESRI_type,w=null,[4,S(i,function(e,r,d,T){return t(C,void 0,void 0,function(){var t,S,I,_,C,N,F,E,P,D,O,z,G,j,k,H,q,H,W,H,K,J,Q,X,Y;return n(this,function(n){switch(n.label){case 0:return!w&&T&&(w=T.split("__")[0]),(t="gltf_"+f++,S=e.mode||4,V(S))?e.attributes.NORMAL?(I=p?B(T,i.uri):void 0,_=I?{treeRendering:!0,vertexColors:!0}:{},[4,i.getMaterial(e)]):(L.warnUnsupported("Vertex normals are required. Skipping primitive."),[2]):(L.warnUnsupported("Unsupported primitive mode ("+R[S]+"). Skipping primitive."),[2]);case 1:return C=n.sent(),N=A(l,C,a({},_,o.materialParamsMixin)),F=N.engineMaterial,E=N.engineTextures,P=b.getVertexBufferLayout(F.getParams()),D={},[4,i.getPositionData(e)];case 2:return O=n.sent(),z=new Float32Array(3*O.count),D.position={data:z,size:3},v.vec3.transformMat4(new m.BufferViewVec3f(z.buffer),O,r),j=M,[4,i.getIndexData(e)];case 3:return G=j.apply(void 0,[n.sent()||O.count,S]),P.hasField("normal")?[4,i.getNormalData(e)]:[3,5];case 4:k=n.sent(),H=new Float32Array(3*k.count),D.normal={data:H,size:3},s.mat4.invert(U,r),s.mat4.transpose(U,U),v.vec3.transformMat4(new m.BufferViewVec3f(H.buffer),k,U),n.label=5;case 5:return P.hasField("uv0")?[4,i.getTextureCoordinates(e)]:[3,7];case 6:q=n.sent(),H=new Float32Array(2*q.count),D.uv0={data:H,size:2},g.vec2.copy(new m.BufferViewVec2f(H.buffer),q),n.label=7;case 7:return i.hasVertexColors(e)?[4,i.getVertexColors(e)]:[3,9];case 8:W=n.sent(),H=new Uint8Array(4*W.count),D.color={data:H,size:4},W instanceof m.BufferViewVec4f?v.vec4.scale(new m.BufferViewVec4u8(H.buffer),W,255):g.vec4.copy(new m.BufferViewVec4u8(H.buffer),W),n.label=9;case 9:I&&y(D,I),K={};for(J in D)K[J]=G;return Q=new x(D,K),X=new h(Q,t),c[d]=c[d]||{components:[],boundingBox:u.empty(),meshName:T,lodThreshold:null,numVertices:0},c[d].components.push({geometry:X,material:F,textures:E}),c[d].numVertices+=O.count,Y=X.boundingInfo,u.expand(c[d].boundingBox,Y.getBBMin()),u.expand(c[d].boundingBox,Y.getBBMax()),[2]}})})})];case 2:if(N.sent(),p&&w)for(T=0;T<c.length;++T)_=c[T],_.lodThreshold=I(w,_.numVertices,T,c.length);return[2,{lods:c}]}})})}function V(e){switch(e){case 4:case 5:case 6:return!0}return!1}function M(e,r){switch(r){case 4:return f.trianglesToTriangles(e);case 5:return f.triangleStripToTriangles(e);case 6:return f.triangleFanToTriangles(e)}}function S(e,r){return t(this,void 0,void 0,function(){function a(i,s){return t(this,void 0,void 0,function(){var t,u,l,c,f,d,p,m,v;return n(this,function(n){switch(n.label){case 0:if(t=o.nodes[i],u=e.getNodeTransform(i),L.warnUnsupportedIf(null!=t.weights,"Morph targets are not supported."),null==t.mesh)return[3,4];l=o.meshes[t.mesh],c=0,f=l.primitives,n.label=1;case 1:return c<f.length?(d=f[c],[4,r(d,u,s,l.name)]):[3,4];case 2:n.sent(),n.label=3;case 3:return c++,[3,1];case 4:p=0,m=t.children||[],n.label=5;case 5:return p<m.length?(v=m[p],[4,a(v,s)]):[3,8];case 6:n.sent(),n.label=7;case 7:return p++,[3,5];case 8:return[2]}})})}var o,s,u,l,c,f,d,p,m,v;return n(this,function(r){switch(r.label){case 0:o=e.json,s=o.scenes[o.scene||0],u=s.nodes,l=u.length>1,c=0,f=u,r.label=1;case 1:return c<f.length?(d=f[c],p=o.nodes[d],m=[a(d,0)],_(p)&&!l&&(v=p.extensions.MSFT_lod.ids,m.push.apply(m,v.map(function(e,r){return a(e,r+1)}))),[4,i.all(m)]):[3,4];case 2:r.sent(),r.label=3;case 3:return c++,[3,1];case 4:return[2]}})})}function B(e,r){void 0===e&&(e=""),void 0===r&&(r="");var t=o.endsWith(e,"Imposter"),n=e.split("__")[0];if(-1!==r.indexOf("/RealisticTrees/")){var a=c.treeParamsTable[n];if(a)return{crownCenter:a.center,crownDimensions:a.radius,imposter:t}}}function y(e,r){var t=new m.BufferViewVec3f(e.normal.data.buffer),n=new m.BufferViewVec3f(e.position.data.buffer),a=t.count,o=g.createBuffer(m.BufferViewVec4u8,a);e.color={data:o.typedBuffer,size:4};for(var i=s.vec3f64.create(),u=s.vec3f64.create(),l=s.vec3f64.create(),c=0;c<a;c++){n.getVec(c,u),t.getVec(c,i),s.vec3.subtract(l,u,r.crownCenter),s.vec3.divide(l,l,r.crownDimensions);var f=p.clamp(s.vec3.length(l),0,1),d=.6+.4*f*f;s.vec3.lerp(l,l,i,.2),t.setVec(c,l),o.set(c,0,255*d),o.set(c,1,255*d),o.set(c,2,255*d),o.set(c,3,255)}}function I(e,r,t,n){if(void 0===e&&(e=""),1===n)return null;if(e in c.lodThresholdLUT){var a=c.lodThresholdLUT[e].vertexCounts,o=c.lodThresholdLUT[e].thresholds,i=a.length,s=r;if(i<=1)return null;if(s<=a[0]){var u=(a[1]-a[0])/(o[1]-o[0]),l=s-a[0];return Math.max(0,o[0]+l*u)}if(s>=a[i-1]){var u=(a[i-1]-a[i-2])/(o[i-1]-o[i-2]),l=s-a[i-1];return o[i-1]+l*u}for(var f=1;f<a.length;++f){var d=a[f-1],p=a[f],m=o[f-1],v=o[f];if(s<p){var g=(s-d)/(p-d);return m*(1-g)+v*g}}}return null}function _(e){return e.extensions&&e.extensions.MSFT_lod&&Array.isArray(e.extensions.MSFT_lod.ids)}function A(e,r,t){var n=e.materials.get(r);if(!n){var o=e.textures.get(r.colorTexture);if(!o&&r.colorTexture){var i=r.colorTexture;o=new w(i.data,i.name,{wrap:{s:C(i.wrapS),t:C(i.wrapT)},mipmap:N.some(function(e){return e===i.minFilter}),noUnpackFlip:!0}),e.textures.set(r.colorTexture,o)}var s=a({transparent:"BLEND"===r.alphaMode,textureAlphaTest:"MASK"===r.alphaMode,textureAlphaCutoff:r.alphaCutoff,diffuse:[r.color[0],r.color[1],r.color[2]],ambient:[r.color[0],r.color[1],r.color[2]],opacity:r.color[3],doubleSided:r.doubleSided,doubleSidedType:"winding-order",vertexColors:r.vertexColors,castShadows:!0,receiveSSAO:!0,textureId:o?o.id:void 0,colorMixMode:r.ESRI_externalColorMixMode},t);n=new b(s,r.name||""),e.materials.set(r,n)}var u=[];return r.colorTexture&&u.push(e.textures.get(r.colorTexture)),{engineMaterial:n,engineTextures:u}}function C(e){if(33071===e||33648===e||10497===e)return e;L.error("Unexpected TextureSampler WrapMode: "+e)}Object.defineProperty(r,"__esModule",{value:!0}),r.load=T;var L=new l.DefaultErrorContext,N=[9987,9985],R=["POINTS","LINES","LINE_LOOP","LINE_STRIP","TRIANGLES","TRIANGLE_STRIP","TRIANGLE_FAN"],U=s.mat4f64.create()});