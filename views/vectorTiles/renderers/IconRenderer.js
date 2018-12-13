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

define(["require","exports","../../../core/libs/gl-matrix-2/gl-matrix","../GeometryUtils","./rendererUtils","../../webgl/VertexArrayObject"],function(e,t,i,r,o,a){return function(){function e(e){this._viewProjMat=i.mat4f32.create(),this._offsetVector=i.vec3f32.create(),this._spritesTextureSize=i.vec2f32.create(),this._color=i.vec4f32.create(),this._initialized=!1,this._programOptions={id:!1,dd:!1,sdf:!1},this._programCache=e}return e.prototype.dispose=function(){},e.prototype.render=function(e,t,a,n,s,f,c,l,m,u,d,_){var h=this;this._initialized||this._initialize(e);var v=l.hasDataDrivenIconSize?1:l.getLayoutValue("icon-size",a),p=l.hasDataDrivenIconColor?[1,1,1,1]:l.getPaintValue("icon-color",a),g=l.hasDataDrivenIconOpacity?1:l.getPaintValue("icon-opacity",a),y=p[3]*g*_;this._color[0]=y*p[0],this._color[1]=y*p[1],this._color[2]=y*p[2],this._color[3]=y;var x=l.getLayoutValue("icon-rotation-alignment",a);2===x&&(x=1===l.getLayoutValue("symbol-placement",a)?0:1);var V=0===x,z=t.isSDF,D=l.hasDataDrivenIcon,b=3===n,U=r.degToByte(s),A=c.tileTransform.transform,O=l.getPaintValue("icon-translate",a);if(0!==O[0]||0!==O[1]){i.mat4.copy(this._viewProjMat,c.tileTransform.transform);var P=O[0],j=O[1],M=0,w=0,I=c.coordRange/512,C=(1<<c.key.level)/Math.pow(2,a)*I;if(1===l.getPaintValue("icon-translate-anchor",a)){var S=-r.C_DEG_TO_RAD*s,T=Math.sin(S),L=Math.cos(S);M=C*(P*L-j*T),w=C*(P*T+j*L)}else M=C*P,w=C*j;this._offsetVector[0]=M,this._offsetVector[1]=w,this._offsetVector[2]=0,i.mat4.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),A=this._viewProjMat}var B=V?u:d,E=this._getIconVAO(e,c,D);if(E){e.bindVAO(E);var k=(b?1:0)<<2|(D?1:0)<<1|(z?1:0),R=this._programOptions;R.id=b,R.dd=D,R.sdf=z;var G=this._programCache.getProgram(4,k,R);if(e.bindProgram(G),z){var q=l.getPaintValue("icon-halo-color",a),F=l.getPaintValue("icon-halo-width",a);G.setUniform4f("u_outlineColor",q[0],q[1],q[2],q[3]),G.setUniform1f("u_outlineSize",F)}if(G.setUniformMatrix4fv("u_transformMatrix",A),G.setUniformMatrix4fv("u_extrudeMatrix",B),G.setUniform2fv("u_normalized_origin",c.tileTransform.displayCoord),G.setUniform1f("u_depth",l.z),G.setUniform1f("u_mapRotation",U),G.setUniform1f("u_keepUpright",0),G.setUniform1f("u_level",10*a),G.setUniform1f("u_fadeSpeed",10*f.fadeSpeed),G.setUniform1f("u_minfadeLevel",10*f.minfadeLevel),G.setUniform1f("u_maxfadeLevel",10*f.maxfadeLevel),G.setUniform1f("u_fadeChange",10*(a+f.fadeChange)),G.setUniform1i("u_texture",5),G.setUniform1f("u_size",v),G.setUniform4fv("u_color",this._color),b){var H=o.int32To4Bytes(t.layerID);G.setUniform4f("u_id",H[0],H[1],H[2],H[3])}t.markerPerPageElementsMap.forEach(function(t,i){h._spritesTextureSize[0]=m.getWidth(i)/4,h._spritesTextureSize[1]=m.getHeight(i)/4,G.setUniform2fv("u_mosaicSize",h._spritesTextureSize),m.bind(e,9729,i,5),e.drawElements(4,t[1],5125,12*t[0])}),e.bindVAO()}},e.prototype._initialize=function(e){return!!this._initialized||(this._vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:16,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:16,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}]},this._vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:24,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:24,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_size",count:1,type:5126,offset:20,stride:24,normalized:!1,divisor:0}]},this._initialized=!0,!0)},e.prototype._getIconVAO=function(e,t,i){if(i){if(t.iconDDVertexArrayObject)return t.iconDDVertexArrayObject;var r=t.iconDDVertexBuffer,o=t.iconIndexBuffer;return r&&o?(t.iconDDVertexArrayObject=new a(e,this._programCache.getProgramAttributes(4),this._vertexAttributesDD,{geometry:r},o),t.iconDDVertexArrayObject):null}if(t.iconVertexArrayObject)return t.iconVertexArrayObject;var r=t.iconVertexBuffer,o=t.iconIndexBuffer;return r&&o?(t.iconVertexArrayObject=new a(e,this._programCache.getProgramAttributes(4),this._vertexAttributes,{geometry:r},o),t.iconVertexArrayObject):null},e}()});