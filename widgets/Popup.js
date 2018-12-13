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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","dojo/dom-geometry","dojo/i18n!../nls/common","dojo/i18n!./Popup/nls/Popup","dojo/keys","../core/Handles","../core/lang","../core/Logger","../core/watchUtils","../core/accessorSupport/decorators","./Feature","./Spinner","./Widget","./Popup/PopupViewModel","./support/widget","./support/widgetUtils"],function(e,t,o,i,n,r,s,a,l,u,p,c,d,h,g,f,_,v,b,y){function w(e,t){return void 0===t?k+"__"+e:k+"__"+e+"-"+t}var M={iconLeftTriangleArrow:"esri-icon-left-triangle-arrow",iconRightTriangleArrow:"esri-icon-right-triangle-arrow",iconDockToTop:"esri-icon-maximize",iconDockToBottom:"esri-icon-dock-bottom",iconDockToLeft:"esri-icon-dock-left",iconDockToRight:"esri-icon-dock-right",iconClose:"esri-icon-close",iconUndock:"esri-icon-minimize",iconCheckMark:"esri-icon-check-mark",iconLoading:"esri-icon-loading-indicator",iconDefaultAction:"esri-icon-default-action",iconActionsMenu:"esri-icon-handle-horizontal",rotating:"esri-rotating",base:"esri-popup",widget:"esri-widget",main:"esri-popup__main-container",loadingContainer:"esri-popup__loading-container",isCollapsible:"esri-popup--is-collapsible",isCollapsed:"esri-popup--is-collapsed",shadow:"esri-popup--shadow",isDocked:"esri-popup--is-docked",isDockedTopLeft:"esri-popup--is-docked-top-left",isDockedTopCenter:"esri-popup--is-docked-top-center",isDockedTopRight:"esri-popup--is-docked-top-right",isDockedBottomLeft:"esri-popup--is-docked-bottom-left",isDockedBottomCenter:"esri-popup--is-docked-bottom-center",isDockedBottomRight:"esri-popup--is-docked-bottom-right",alignTopCenter:"esri-popup--aligned-top-center",alignBottomCenter:"esri-popup--aligned-bottom-center",alignTopLeft:"esri-popup--aligned-top-left",alignBottomLeft:"esri-popup--aligned-bottom-left",alignTopRight:"esri-popup--aligned-top-right",alignBottomRight:"esri-popup--aligned-bottom-right",isFeatureMenuOpen:"esri-popup--feature-menu-open",isActionsMenuOpen:"esri-popup--actions-menu-open",hasFeatureUpdated:"esri-popup--feature-updated",header:"esri-popup__header",headerButtons:"esri-popup__header-buttons",headerContainer:"esri-popup__header-container",headerContainerButton:"esri-popup__header-container--button",headerTitle:"esri-popup__header-title",content:"esri-popup__content",footer:"esri-popup__footer",button:"esri-popup__button",buttonDisabled:"esri-popup__button--disabled",buttonDock:"esri-popup__button--dock",icon:"esri-popup__icon",iconDock:"esri-popup__icon--dock-icon",singleActionContainer:"esri-popup__single-action-container",actionsMenuButton:"esri-popup__actions-menu-button",actions:"esri-popup__actions",action:"esri-popup__action",actionImage:"esri-popup__action-image",actionText:"esri-popup__action-text",actionToggle:"esri-popup__action-toggle",actionToggleOn:"esri-popup__action-toggle--on",pointer:"esri-popup__pointer",pointerDirection:"esri-popup__pointer-direction",navigation:"esri-popup__navigation",navigationWithSingleAction:"esri-popup__navigation--with-single-action",paginationPrevious:"esri-popup__pagination-previous",paginationNext:"esri-popup__pagination-next",paginationPreviousIconLTR:"esri-popup__pagination-previous-icon",paginationPreviousIconRTL:"esri-popup__pagination-previous-icon--rtl",paginationNextIconLTR:"esri-popup__pagination-next-icon",paginationNextIconRTL:"esri-popup__pagination-next-icon--rtl",featureMenu:"esri-popup__feature-menu",featureMenuList:"esri-popup__feature-menu-list",featureMenuItem:"esri-popup__feature-menu-item",featureMenuViewport:"esri-popup__feature-menu-viewport",featureMenuHeader:"esri-popup__feature-menu-header",featureMenuNote:"esri-popup__feature-menu-note",featureMenuSelected:"esri-popup__feature-menu-item--selected",featureMenuButton:"esri-popup__feature-menu-button",featureMenuTitle:"esri-popup__feature-menu-title",collapseButton:"esri-popup__collapse-button"},m={buttonEnabled:!0,position:"auto",breakpoint:{width:544}},k="esri-popup",x=c.getLogger("esri.widgets.Popup");return function(e){function t(t){var o=e.call(this)||this;return o._blurContainer=!1,o._containerNode=null,o._mainContainerNode=null,o._featureMenuNode=null,o._actionsMenuNode=null,o._focusContainer=!1,o._focusDockButton=!1,o._focusFeatureMenuButton=!1,o._focusActionsMenuButton=!1,o._focusFirstFeature=!1,o._focusFirstAction=!1,o._handles=new u,o._pointerOffsetInPx=16,o._spinner=null,o.actions=null,o.alignment="auto",o.autoCloseEnabled=null,o.autoOpenEnabled=null,o.content=null,o.collapsed=!1,o.collapseEnabled=!0,o.dockEnabled=!1,o.featureCount=null,o.features=null,o.featureNavigationEnabled=!0,o.goToOverride=null,o.highlightEnabled=null,o.location=null,o.featureWidgets=[],o.promises=null,o.selectedFeature=null,o.selectedFeatureIndex=null,o.selectedFeatureWidget=null,o.spinnerEnabled=!0,o.title=null,o.updateLocationEnabled=null,o.view=null,o.viewModel=new v,o.visible=null,o._addSelectedFeatureIndexHandle(),o.own([d.watch(o,"viewModel.screenLocation",function(){return o._positionContainer()}),d.watch(o,["viewModel.visible","dockEnabled"],function(){return o._toggleScreenLocationEnabled()}),d.watch(o,"viewModel.screenLocation",function(e,t){!!e!=!!t&&o.reposition()}),d.watch(o,"viewModel.features",function(e){return o._createFeatureWidgets(e)}),d.watch(o,["viewModel.view.padding","viewModel.view.size","viewModel.visible","viewModel.waitingForResult","viewModel.location","alignment"],function(){return o.reposition()}),d.watch(o,"spinnerEnabled",function(e){return o._spinnerEnabledChange(e)}),d.watch(o,"viewModel.view.size",function(e,t){return o._updateDockEnabledForViewSize(e,t)}),d.watch(o,"viewModel.view",function(e,t){return o._viewChange(e,t)}),d.watch(o,"viewModel.view.ready",function(e,t){return o._viewReadyChange(e,t)}),d.watch(o,["viewModel.waitingForResult","viewModel.location"],function(){return o._displaySpinner()}),d.watch(o,["featureWidgets","viewModel.selectedFeatureIndex"],function(){return o._updateFeatureWidget()}),d.watch(o,"selectedFeatureWidget.viewModel.title",function(e){return o._setTitleFromFeatureWidget(e)}),d.watch(o,["selectedFeatureWidget.viewModel.content","selectedFeatureWidget.viewModel.waitingForContent"],function(){return o._setContentFromFeatureWidget()}),d.whenFalse(o,"collapsed",function(){"xsmall"===o.get("viewModel.view.widthBreakpoint")&&o.visible&&o.collapseEnabled&&o.viewModel.centerAtLocation()})]),o}return o(t,e),t.prototype.destroy=function(){this._destroyFeatureWidgets(),this._destroySpinner(),this._handles&&this._handles.destroy(),this._handles=null},Object.defineProperty(t.prototype,"actionsMenuOpen",{get:function(){return!!this.viewModel.visible&&this._get("actionsMenuOpen")},set:function(e){this._set("actionsMenuOpen",!!e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"currentAlignment",{get:function(){return this._getCurrentAlignment()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"currentDockPosition",{get:function(){return this._getCurrentDockPosition()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"dockOptions",{get:function(){return this._get("dockOptions")||m},set:function(e){var t=n({},m),o=this.get("viewModel.view.breakpoints"),i={};o&&(i.width=o.xsmall,i.height=o.xsmall);var r=n({},t,e),s=n({},t.breakpoint,i),a=r.breakpoint;!0===a?r.breakpoint=s:"object"==typeof a&&(r.breakpoint=n({},s,a)),this._set("dockOptions",r),this._setCurrentDockPosition(),this.reposition()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"featureMenuOpen",{get:function(){return!!this.viewModel.visible&&this._get("featureMenuOpen")},set:function(e){this._set("featureMenuOpen",!!e)},enumerable:!0,configurable:!0}),t.prototype.blur=function(){this.visible||x.warn("Popup cannot be blurred while visible is false"),this._blurContainer=!0,this.scheduleRender()},t.prototype.clear=function(){},t.prototype.close=function(){this.visible=!1},t.prototype.focus=function(){this.visible||x.warn("Popup cannot be focused while visible is false"),this._focusContainer=!0,this.scheduleRender()},t.prototype.next=function(){return null},t.prototype.open=function(e){this._handles.remove("selected-index");var t=!!e&&!!e.featureMenuOpen,o=!!e&&!!e.actionsMenuOpen,i=!!e&&!!e.collapsed,n={collapsed:i,actionsMenuOpen:o,featureMenuOpen:t};"xsmall"===this.get("viewModel.view.widthBreakpoint")&&(n.collapsed=!0,e.updateLocationEnabled=!0),this.set(n),this.viewModel.open(e),this._addSelectedFeatureIndexHandle()},t.prototype.previous=function(){return null},t.prototype.reposition=function(){this.renderNow(),this._positionContainer(),this._setCurrentAlignment()},t.prototype.triggerAction=function(e){return null},t.prototype.render=function(){var e,t,o,i,n,r,l,u=this,c=u.actionsMenuOpen,d=u.collapsed,h=u.collapseEnabled,g=u.dockEnabled,f=u.featureMenuOpen,_=u.featureNavigationEnabled,v=u.featureWidgets,m=u.visible,k=this.viewModel,x=k.allActions,C=k.content,F=k.featureCount,O=k.pendingPromisesCount,A=k.selectedFeatureIndex,T=k.title,E=x&&x.length,D=F>1&&_,N=F>1&&f,P=E>1&&c,B=h&&!N&&d,L=D&&this._getPageText(F,A),I=this._renderContent(),W=y.isRTL(),R=this.get("selectedFeatureWidget")?this.get("selectedFeatureWidget.viewModel.waitingForContent")||this.get("selectedFeatureWidget.viewModel.content"):I,S=this.get("viewModel.view.widthBreakpoint"),U=g?a.undock:a.dock,H=this,V=H.currentAlignment,z=H.currentDockPosition,K=O?b.tsx("div",{key:w("loading-container"),role:"presentation",class:M.loadingContainer,"aria-label":s.loading,title:s.loading},b.tsx("span",{"aria-hidden":"true",class:this.classes(M.icon,M.iconLoading,M.rotating)})):null,j=(e={},e[M.iconRightTriangleArrow]=W,e[M.paginationPreviousIconRTL]=W,e[M.iconLeftTriangleArrow]=!W,e[M.paginationPreviousIconLTR]=!W,e),q=b.tsx("span",{"aria-hidden":"true",class:this.classes(M.icon,j)}),G=b.tsx("div",{role:"button",tabIndex:0,bind:this,onclick:this._previous,onkeydown:this._previous,class:this.classes(M.button,M.paginationPrevious),"aria-label":a.previous,title:a.previous},q),J=(t={},t[M.iconLeftTriangleArrow]=W,t[M.paginationNextIconRTL]=W,t[M.iconRightTriangleArrow]=!W,t[M.paginationNextIconLTR]=!W,t),Q=b.tsx("span",{"aria-hidden":"true",class:this.classes(M.icon,J)}),X=b.tsx("div",{role:"button",tabIndex:0,bind:this,onclick:this._next,onkeydown:this._next,class:this.classes(M.button,M.paginationNext),"aria-label":a.next,title:a.next},Q),Y=y.cssTransition("enter",M.hasFeatureUpdated),Z=this.id+"-feature-menu",$=b.tsx("div",{role:"button",tabIndex:0,bind:this,onclick:this._toggleFeatureMenu,onkeydown:this._toggleFeatureMenu,afterCreate:this._focusFeatureMenuButtonNode,afterUpdate:this._focusFeatureMenuButtonNode,class:this.classes(M.button,M.featureMenuButton),"aria-haspopup":"true","aria-controls":Z,"aria-expanded":f,"aria-label":s.menu,title:s.menu},L),ee=D?[G,K||$,X]:null,te=this._wouldDockTo(),oe=(o={},o[M.iconUndock]=g,o[M.iconDock]=!g,o[M.iconDockToRight]=!g&&("top-right"===te||"bottom-right"===te),o[M.iconDockToLeft]=!g&&("top-left"===te||"bottom-left"===te),o[M.iconDockToTop]=!g&&"top-center"===te,o[M.iconDockToBottom]=!g&&"bottom-center"===te,o),ie=b.tsx("span",{"aria-hidden":"true",class:this.classes(oe,M.icon)}),ne="xsmall"!==S&&this.get("dockOptions.buttonEnabled")?b.tsx("div",{role:"button","aria-label":U,title:U,tabIndex:0,bind:this,onclick:this._toggleDockEnabled,onkeydown:this._toggleDockEnabled,afterCreate:this._focusDockButtonNode,afterUpdate:this._focusDockButtonNode,class:this.classes(M.button,M.buttonDock)},ie):null,re=!!(h&&T&&(R||E||D)),se=(i={},i[M.headerContainerButton]=re,i),ae=re?"button":"heading",le=re?B?s.expand:s.collapse:"",ue=this.id+"-popup-title",pe=T?b.tsx("div",{class:this.classes(M.headerContainer,se),key:T,enterAnimation:Y,id:ue,role:ae,"aria-label":le,title:le,tabIndex:re?0:-1,bind:this,onclick:this._toggleCollapsed,onkeydown:this._toggleCollapsed},b.tsx("h2",{class:M.headerTitle,innerHTML:T})):null,ce=b.tsx("span",{"aria-hidden":"true",class:this.classes(M.icon,M.iconClose)}),de=b.tsx("div",{role:"button",tabIndex:0,bind:this,onclick:this._close,onkeydown:this._close,class:M.button,"aria-label":s.close,title:s.close},ce),he=b.tsx("header",{class:M.header},pe,b.tsx("div",{class:M.headerButtons},ne,de)),ge=this.id+"-popup-content",fe=R&&!B?b.tsx("article",{key:C,enterAnimation:Y,id:ge,class:M.content},I):null,_e="bottom-left"===V||"bottom-center"===V||"bottom-right"===V||"top-left"===z||"top-center"===z||"top-right"===z,ve="top-left"===V||"top-center"===V||"top-right"===V||"bottom-left"===z||"bottom-center"===z||"bottom-right"===z,be=c?s.close:s.open,ye=this._getSingleAction(),we=ye&&this._renderAction({action:ye,index:0,key:"actions",singleButton:!0}),Me=we?b.tsx("div",{key:"single-action-container",class:M.singleActionContainer},we):null,me=!we&&E?b.tsx("div",{key:w("actions-menu-button"),class:this.classes(M.button,M.actionsMenuButton),role:"button",id:this.id+"-actions-menu-button","aria-haspopup":"true","aria-controls":c?this.id+"-actions-menu":null,tabIndex:0,bind:this,onclick:this._toggleActionsMenu,onkeydown:this._toggleActionsMenu,afterCreate:this._focusActionsMenuButtonNode,afterUpdate:this._focusActionsMenuButtonNode,"aria-label":be,title:be},b.tsx("span",{"aria-hidden":"true",class:M.iconActionsMenu})):null,ke=(n={},n[M.navigationWithSingleAction]=1===E,n),xe=b.tsx("section",{key:w("navigation"),class:this.classes(M.navigation,ke)},ee),Ce=D||E?b.tsx("div",{key:w("feature-buttons"),class:M.footer},xe,me,Me):null,Fe=E&&c?b.tsx("ul",{id:this.id+"-actions-menu",role:"menu","aria-labelledby":this.id+"-actions-menu-button",key:w("actions"),class:M.actions,bind:this,onkeyup:this._handleActionMenuKeyup,afterCreate:this._actionsMenuNodeUpdated,afterUpdate:this._actionsMenuNodeUpdated},this._renderActions()):null,Oe=this._renderFeatureMenuNode(v,A,Z),Ae=p.substitute({total:v.length},a.selectedFeatures),Te=b.tsx("section",{key:w("menu"),class:M.featureMenu},b.tsx("h2",{class:M.featureMenuHeader},Ae),b.tsx("nav",{class:M.featureMenuViewport,afterCreate:this._featureMenuViewportNodeUpdated,afterUpdate:this._featureMenuViewportNodeUpdated},Oe)),Ee=g?null:b.tsx("div",{key:w("pointer"),class:M.pointer,role:"presentation"},b.tsx("div",{class:this.classes(M.pointerDirection,M.shadow)})),De=this.get("selectedFeature.layer.title"),Ne=this.get("selectedFeature.layer.id"),Pe=(r={},r[M.shadow]=g,r[M.isCollapsible]=re,r[M.isCollapsed]=B,r),Be=(l={},l[M.alignTopCenter]=m&&"top-center"===V,l[M.alignBottomCenter]=m&&"bottom-center"===V,l[M.alignTopLeft]=m&&"top-left"===V,l[M.alignBottomLeft]=m&&"bottom-left"===V,l[M.alignTopRight]=m&&"top-right"===V,l[M.alignBottomRight]="bottom-right"===V,l[M.isDocked]=m&&g,l[M.shadow]=m&&!g,l[M.isDockedTopLeft]=m&&"top-left"===z,l[M.isDockedTopCenter]=m&&"top-center"===z,l[M.isDockedTopRight]=m&&"top-right"===z,l[M.isDockedBottomLeft]=m&&"bottom-left"===z,l[M.isDockedBottomCenter]=m&&"bottom-center"===z,l[M.isDockedBottomRight]=m&&"bottom-right"===z,l[M.isFeatureMenuOpen]=m&&N,l[M.isActionsMenuOpen]=m&&P,l),Le=_e?[Te,Fe]:null,Ie=ve?[Te,Fe]:null,We=_e?Ce:null,Re=ve?Ce:null,Se=b.tsx("div",{class:this.classes(M.main,M.widget,Pe),tabIndex:-1,role:"dialog","aria-labelledby":pe?ue:"","aria-describedby":fe?ge:"",bind:this,onkeyup:this._handleMainKeyup,afterCreate:this._mainContainerNodeUpdated,afterUpdate:this._mainContainerNodeUpdated},We,Le,he,fe,Re,Ie);return b.tsx("div",{key:w("base"),class:this.classes(M.base,Be),role:"presentation","data-layer-title":De,"data-layer-id":Ne,bind:this,afterCreate:this._positionContainer,afterUpdate:this._positionContainer},m?[Se,Ee]:null)},t.prototype._getSingleAction=function(){var e=this.viewModel.allActions;if(1===e.length)return e.find(function(e){return"button"===e.type})},t.prototype._featureMenuOpenChanged=function(e){e?this._focusFirstFeature=!0:this._focusFeatureMenuButton=!0},t.prototype._actionsMenuOpenChanged=function(e){e?this._focusFirstAction=!0:this._focusActionsMenuButton=!0},t.prototype._setTitleFromFeatureWidget=function(e){this.selectedFeatureWidget&&(this.viewModel.title=e||"")},t.prototype._setContentFromFeatureWidget=function(){var e=this.selectedFeatureWidget;e&&(this.viewModel.content=e)},t.prototype._handleFeatureMenuKeyup=function(e){e.keyCode===l.ESCAPE&&(e.stopPropagation(),this._focusFeatureMenuButton=!0,this.featureMenuOpen=!1,this.scheduleRender())},t.prototype._handleActionMenuKeyup=function(e){e.keyCode===l.ESCAPE&&(e.stopPropagation(),this._focusActionsMenuButton=!0,this.actionsMenuOpen=!1,this.scheduleRender())},t.prototype._handleFeatureMenuItemKeyup=function(e){var t=e.keyCode,o=this._featureMenuNode,i=e.currentTarget,n=i["data-feature-index"];if(o){var r=o.querySelectorAll("li"),s=r.length;if(t===l.UP_ARROW){e.stopPropagation();var a=n-1,u=(a+s)%s;return void r[u].focus()}if(t===l.DOWN_ARROW){e.stopPropagation();var p=n+1,u=(p+s)%s;return void r[u].focus()}if(t===l.HOME){e.stopPropagation();return void r[0].focus()}if(t===l.END){e.stopPropagation();return void r[r.length-1].focus()}}},t.prototype._handleActionMenuItemKeyup=function(e){var t=e.keyCode,o=this._actionsMenuNode,i=e.currentTarget,n=i["data-action-index"];if(o){var r=o.querySelectorAll("li"),s=r.length;if(t===l.UP_ARROW){e.stopPropagation();var a=n-1,u=(a+s)%s;return void r[u].focus()}if(t===l.DOWN_ARROW){e.stopPropagation();var p=n+1,u=(p+s)%s;return void r[u].focus()}if(t===l.HOME){e.stopPropagation();return void r[0].focus()}if(t===l.END){e.stopPropagation();return void r[r.length-1].focus()}}},t.prototype._handleMainKeyup=function(e){var t=e.keyCode;t===l.LEFT_ARROW&&(e.stopPropagation(),this.previous()),t===l.RIGHT_ARROW&&(e.stopPropagation(),this.next())},t.prototype._spinnerEnabledChange=function(e){if(this._destroySpinner(),e){var t=this.get("viewModel.view");this._createSpinner(t)}},t.prototype._displaySpinner=function(){var e=this._spinner;if(e){var t=this.viewModel,o=t.location;if(t.waitingForResult)return void e.show({location:o});e.hide()}},t.prototype._getIconStyles=function(e){return{"background-image":e?"url("+e+")":""}},t.prototype._renderAction=function(e){var t,o,i=this,n=e.action,r=e.index,s=e.key,a=e.singleButton,l=d.watch(n,["active","className","disabled","id","title","image","visible"],function(){return i.scheduleRender()});this._handles.add(l,s);var u=this.get("selectedFeature.attributes"),c=n.title,h=n.className,g=n.image,f=g||h?h:M.iconDefaultAction,_=c&&u?p.substitute(u,c):c,v=f&&u?p.substitute(u,f):f,y=g&&u?p.substitute(u,g):g,w=(t={},t[M.iconLoading]=n.active,t[M.rotating]=n.active,t[M.icon]=!!f,t[M.actionImage]=!n.active&&!!y,t);v&&(w[v]=!n.active);var m=(o={},o[M.action]="toggle"!==n.type,o[M.actionToggle]="toggle"===n.type,o[M.actionToggleOn]="toggle"===n.type&&n.value,o[M.buttonDisabled]=n.disabled,o),k=b.tsx("span",{key:"text",class:M.actionText},_),x=b.tsx("span",{key:"icon","aria-hidden":"true",class:this.classes(M.icon,w),styles:this._getIconStyles(y)}),C=[x,k],F=a?b.tsx("div",{key:n,role:"button",tabIndex:0,title:_,"aria-label":_,class:this.classes(M.button,m),onkeyup:this._handleActionMenuItemKeyup,bind:this,"data-action-index":r,onclick:this._triggerAction,onkeydown:this._triggerAction},C):b.tsx("li",{key:n,role:"menuitem",tabIndex:0,title:_,"aria-label":_,class:this.classes(M.button,m),onkeyup:this._handleActionMenuItemKeyup,bind:this,"data-action-index":r,onclick:this._triggerAction,onkeydown:this._triggerAction},C);return n.visible?F:null},t.prototype._renderActions=function(){var e=this;this._handles.remove("actions");var t=this.viewModel.allActions;if(t){return t.map(function(t,o){return e._renderAction({action:t,index:o,key:"actions"})}).toArray()}},t.prototype._addSelectedFeatureIndexHandle=function(){var e=this,t=d.watch(this,"viewModel.selectedFeatureIndex",function(t,o){return e._selectedFeatureIndexUpdated(t,o)});this._handles.add(t,"selected-index")},t.prototype._selectedFeatureIndexUpdated=function(e,t){this.featureCount&&e!==t&&-1!==e&&(this.actionsMenuOpen=!1,this.featureMenuOpen=!1)},t.prototype._updateFeatureWidget=function(){var e=this.featureWidgets,t=this.viewModel.selectedFeatureIndex,o=e[t]||null;o&&!o.contentEnabled&&(o.contentEnabled=!0),this._set("selectedFeatureWidget",o)},t.prototype._destroyFeatureWidgets=function(){this.featureWidgets.forEach(function(e){return e.destroy()}),this._set("featureWidgets",[])},t.prototype._createFeatureWidgets=function(e){var t=this.featureWidgets,o=t.slice(0),i=this.get("viewModel.view"),n=[];e.forEach(function(e,t){if(e){var r=null;o.some(function(t,i){return t&&t.graphic===e&&(r=t,o.splice(i,1)),!!r}),n[t]=r||new g({contentEnabled:!1,graphic:e,view:i})}}),o.forEach(function(e){return e&&e.destroy()}),this._set("featureWidgets",n)},t.prototype._isScreenLocationWithinView=function(e,t){return e.x>-1&&e.y>-1&&e.x<=t.width&&e.y<=t.height},t.prototype._isOutsideView=function(e){var t=e.popupHeight,o=e.popupWidth,i=e.screenLocation,n=e.side,r=e.view;if(isNaN(o)||isNaN(t)||!r||!i)return!1;var s=r.padding;return"right"===n&&i.x+o/2>r.width-s.right||("left"===n&&i.x-o/2<s.left||("top"===n&&i.y-t<s.top||"bottom"===n&&i.y+t>r.height-s.bottom))},t.prototype._determineCurrentAlignment=function(){function e(e){return parseInt(e.replace(/[^-\d\.]/g,""),10)}var t=this,o=t._pointerOffsetInPx,i=t._containerNode,n=t._mainContainerNode,s=t.viewModel,a=s.screenLocation,l=s.view;if(!a||!l||!i)return"top-center";if(!this._isScreenLocationWithinView(a,l))return this._get("currentAlignment")||"top-center";var u=n?window.getComputedStyle(n,null):null,p=u?e(u.getPropertyValue("max-height")):0,c=u?e(u.getPropertyValue("height")):0,d=r.getContentBox(i),h=d.w+o,g=Math.max(d.h,p,c)+o,f=this._isOutsideView({popupHeight:g,popupWidth:h,screenLocation:a,side:"right",view:l}),_=this._isOutsideView({popupHeight:g,popupWidth:h,screenLocation:a,side:"left",view:l}),v=this._isOutsideView({popupHeight:g,popupWidth:h,screenLocation:a,side:"top",view:l}),b=this._isOutsideView({popupHeight:g,popupWidth:h,screenLocation:a,side:"bottom",view:l});return _?v?"bottom-right":"top-right":f?v?"bottom-left":"top-left":v?b?"top-center":"bottom-center":"top-center"},t.prototype._getCurrentAlignment=function(){var e=this,t=e.alignment;return e.dockEnabled?null:"auto"===t?this._determineCurrentAlignment():"function"==typeof t?t.call(this):t},t.prototype._setCurrentAlignment=function(){this._set("currentAlignment",this._getCurrentAlignment())},t.prototype._setCurrentDockPosition=function(){this._set("currentDockPosition",this._getCurrentDockPosition())},t.prototype._getDockPosition=function(){var e=this.get("dockOptions.position");return"auto"===e?this._determineCurrentDockPosition():"function"==typeof e?e.call(this):e},t.prototype._getCurrentDockPosition=function(){return this.dockEnabled?this._getDockPosition():null},t.prototype._wouldDockTo=function(){return this.dockEnabled?null:this._getDockPosition()},t.prototype._renderFeatureMenuItemNode=function(e,t,o){var i,n=t===o,r=(i={},i[M.featureMenuSelected]=n,i),l=n?b.tsx("span",{key:w("feature-menu-selected-feature-"+o),title:a.selectedFeature,"aria-label":a.selectedFeature,class:M.iconCheckMark}):null,u=b.tsx("span",{innerHTML:e.title||s.untitled});return b.tsx("li",{role:"menuitem",tabIndex:-1,key:w("feature-menu-feature-"+o),class:this.classes(r,M.featureMenuItem),bind:this,"data-feature-index":t,onkeyup:this._handleFeatureMenuItemKeyup,onclick:this._selectFeature,onkeydown:this._selectFeature},b.tsx("span",{class:M.featureMenuTitle},u,l))},t.prototype._renderFeatureMenuNode=function(e,t,o){var i=this;return e.length>1?b.tsx("ol",{class:M.featureMenuList,id:o,bind:this,afterCreate:this._featureMenuNodeUpdated,afterUpdate:this._featureMenuNodeUpdated,onkeyup:this._handleFeatureMenuKeyup,role:"menu"},e.map(function(e,o){return i._renderFeatureMenuItemNode(e,o,t)})):null},t.prototype._determineCurrentDockPosition=function(){var e=this.get("viewModel.view"),t=y.isRTL()?"top-left":"top-right";if(!e)return t;var o=e.padding||{left:0,right:0,top:0,bottom:0},i=e.width-o.left-o.right,n=e.get("breakpoints");return n&&i<=n.xsmall?"bottom-center":t},t.prototype._renderContent=function(){var e=this.get("viewModel.content");return"string"==typeof e?b.tsx("div",{key:e,innerHTML:e}):b.isWidget(e)?b.tsx("div",{key:e},e.render()):e instanceof HTMLElement?b.tsx("div",{key:e,bind:e,afterCreate:this._attachToNode}):b.isWidgetBase(e)?b.tsx("div",{key:e,bind:e.domNode,afterCreate:this._attachToNode}):void 0},t.prototype._attachToNode=function(e){var t=this;e.appendChild(t)},t.prototype._positionContainer=function(e){if(void 0===e&&(e=this._containerNode),e&&(this._containerNode=e),e){var t=this.viewModel.screenLocation,o=r.getContentBox(e),i=this._calculatePositionStyle(t,o);i&&(e.style.top=i.top,e.style.left=i.left,e.style.bottom=i.bottom,e.style.right=i.right)}},t.prototype._calculateFullWidth=function(e){var t=this,o=t.currentAlignment,i=t._pointerOffsetInPx;return"top-left"===o||"bottom-left"===o||"top-right"===o||"bottom-right"===o?e+i:e},t.prototype._calculateAlignmentPosition=function(e,t,o,i){var n=this,r=n.currentAlignment,s=n._pointerOffsetInPx,a=i/2,l=o.height-t,u=o.width-e,p=this.view.padding;return"bottom-center"===r?{top:t+s-p.top,left:e-a-p.left}:"top-left"===r?{bottom:l+s-p.bottom,right:u+s-p.right}:"bottom-left"===r?{top:t+s-p.top,right:u+s-p.right}:"top-right"===r?{bottom:l+s-p.bottom,left:e+s-p.left}:"bottom-right"===r?{top:t+s-p.top,left:e+s-p.left}:"top-center"===r?{bottom:l+s-p.bottom,left:e-a-p.left}:void 0},t.prototype._calculatePositionStyle=function(e,t){var o=this,i=o.dockEnabled,n=o.view;if(n){if(i)return{left:"",top:"",right:"",bottom:""};if(e&&t){var r=this._calculateFullWidth(t.w),s=this._calculateAlignmentPosition(e.x,e.y,n,r);if(s)return{top:void 0!==s.top?s.top+"px":"auto",left:void 0!==s.left?s.left+"px":"auto",bottom:void 0!==s.bottom?s.bottom+"px":"auto",right:void 0!==s.right?s.right+"px":"auto"}}}},t.prototype._viewChange=function(e,t){e&&t&&(this.close(),this.clear())},t.prototype._viewReadyChange=function(e,t){if(e){var o=this.get("viewModel.view");return void this._wireUpView(o)}t&&(this.close(),this.clear())},t.prototype._wireUpView=function(e){if(this._destroySpinner(),e){this.spinnerEnabled&&this._createSpinner(e),this._setDockEnabledForViewSize(this.dockOptions)}},t.prototype._dockingThresholdCrossed=function(e,t,o){var i=e[0],n=e[1],r=t[0],s=t[1],a=o.width,l=o.height;return i<=a&&r>a||i>a&&r<=a||n<=l&&s>l||n>l&&s<=l},t.prototype._updateDockEnabledForViewSize=function(e,t){if(e&&t){var o=this.get("viewModel.view.padding")||{left:0,right:0,top:0,bottom:0},i=o.left+o.right,n=o.top+o.bottom,r=[],s=[];r[0]=e[0]-i,r[1]=e[1]-n,s[0]=t[0]-i,s[1]=t[1]-n;var a=this.dockOptions,l=a.breakpoint;this._dockingThresholdCrossed(r,s,l)&&this._setDockEnabledForViewSize(a),this._setCurrentDockPosition()}},t.prototype._focusDockButtonNode=function(e){this._focusDockButton&&(this._focusDockButton=!1,e.focus())},t.prototype._mainContainerNodeUpdated=function(e){return this._mainContainerNode=e,this._focusContainer?(this._focusContainer=!1,void e.focus()):this._blurContainer?(this._blurContainer=!1,void e.blur()):void 0},t.prototype._featureMenuNodeUpdated=function(e){if(this._featureMenuNode=e,e&&this._focusFirstFeature){this._focusFirstFeature=!1;var t=e.querySelectorAll("li");if(t.length){t[0].focus()}}},t.prototype._actionsMenuNodeUpdated=function(e){if(this._actionsMenuNode=e,e&&this._focusFirstAction){this._focusFirstAction=!1;var t=e.querySelectorAll("li");if(t.length){t[0].focus()}}},t.prototype._focusFeatureMenuButtonNode=function(e){this._focusFeatureMenuButton&&(this._focusFeatureMenuButton=!1,e.focus())},t.prototype._focusActionsMenuButtonNode=function(e){this._focusActionsMenuButton&&(this._focusActionsMenuButton=!1,e.focus())},t.prototype._featureMenuViewportNodeUpdated=function(e){e&&(e.scrollTop=0)},t.prototype._toggleScreenLocationEnabled=function(){var e=this,t=e.dockEnabled,o=e.visible,i=e.viewModel;if(i){var n=o&&!t;i.screenLocationEnabled=n}},t.prototype._shouldDockAtCurrentViewSize=function(e){var t=e.breakpoint,o=this.get("viewModel.view.ui"),i=o.width,n=o.height;if(isNaN(i)||isNaN(n))return!1;var r=t.hasOwnProperty("width")&&i<=t.width,s=t.hasOwnProperty("height")&&n<=t.height;return r||s},t.prototype._setDockEnabledForViewSize=function(e){e.breakpoint&&(this.dockEnabled=this._shouldDockAtCurrentViewSize(e))},t.prototype._getPageText=function(e,t){return p.substitute({index:t+1,total:e},a.pageText)},t.prototype._destroySpinner=function(){var e=this,t=e._spinner,o=e.view;t&&(o&&o.ui.remove(this._spinner,"popup-spinner"),t.destroy(),this._spinner=null)},t.prototype._createSpinner=function(e){e&&(this._spinner=new f({view:e}),e.ui.add(this._spinner,{key:"popup-spinner",position:"manual"}))},t.prototype._toggleCollapsed=function(){this.collapsed=!this.collapsed},t.prototype._close=function(){this.close(),this.view&&this.view.focus()},t.prototype._toggleDockEnabled=function(){this.dockEnabled=!this.dockEnabled,this._focusDockButton=!0,this.scheduleRender()},t.prototype._toggleFeatureMenu=function(){var e=!this.featureMenuOpen;this._featureMenuOpenChanged(e),this.actionsMenuOpen=!1,this.featureMenuOpen=e},t.prototype._toggleActionsMenu=function(){var e=!this.actionsMenuOpen;this._actionsMenuOpenChanged(e),this.featureMenuOpen=!1,this.actionsMenuOpen=e},t.prototype._triggerAction=function(e){var t=e.currentTarget,o=t["data-action-index"],i=this.viewModel.allActions.getItemAt(o);i&&"toggle"===i.type&&(i.value=!i.value),this.actionsMenuOpen=!1,this.viewModel.triggerAction(o)},t.prototype._selectFeature=function(e){var t=e.currentTarget,o=t["data-feature-index"];isNaN(o)||(this.viewModel.selectedFeatureIndex=o),this._focusFeatureMenuButton=!0,this.scheduleRender()},t.prototype._next=function(){this.next()},t.prototype._previous=function(){this.previous()},i([h.aliasOf("viewModel.actions"),b.renderable()],t.prototype,"actions",void 0),i([h.property({dependsOn:["viewModel.visible"]}),b.renderable()],t.prototype,"actionsMenuOpen",null),i([h.property()],t.prototype,"alignment",void 0),i([h.aliasOf("viewModel.autoCloseEnabled")],t.prototype,"autoCloseEnabled",void 0),i([h.aliasOf("viewModel.autoOpenEnabled")],t.prototype,"autoOpenEnabled",void 0),i([h.aliasOf("viewModel.content"),b.renderable()],t.prototype,"content",void 0),i([h.property(),b.renderable()],t.prototype,"collapsed",void 0),i([h.property(),b.renderable()],t.prototype,"collapseEnabled",void 0),i([h.property({readOnly:!0,dependsOn:["dockEnabled","alignment"]}),b.renderable()],t.prototype,"currentAlignment",null),i([h.property({readOnly:!0,dependsOn:["viewModel.view.ready","dockEnabled","dockOptions"]}),b.renderable()],t.prototype,"currentDockPosition",null),i([h.property(),b.renderable()],t.prototype,"dockOptions",null),i([h.property(),b.renderable()],t.prototype,"dockEnabled",void 0),i([h.aliasOf("viewModel.featureCount"),b.renderable()],t.prototype,"featureCount",void 0),i([h.property({dependsOn:["viewModel.visible"]}),b.renderable()],t.prototype,"featureMenuOpen",null),i([h.aliasOf("viewModel.features"),b.renderable()],t.prototype,"features",void 0),i([h.property(),b.renderable()],t.prototype,"featureNavigationEnabled",void 0),i([h.aliasOf("viewModel.goToOverride")],t.prototype,"goToOverride",void 0),i([h.aliasOf("viewModel.highlightEnabled")],t.prototype,"highlightEnabled",void 0),i([h.aliasOf("viewModel.location"),b.renderable()],t.prototype,"location",void 0),i([h.property({readOnly:!0}),b.renderable()],t.prototype,"featureWidgets",void 0),i([h.aliasOf("viewModel.promises")],t.prototype,"promises",void 0),i([h.aliasOf("viewModel.selectedFeature"),b.renderable()],t.prototype,"selectedFeature",void 0),i([h.aliasOf("viewModel.selectedFeatureIndex"),b.renderable()],t.prototype,"selectedFeatureIndex",void 0),i([h.property({readOnly:!0}),b.renderable()],t.prototype,"selectedFeatureWidget",void 0),i([h.property()],t.prototype,"spinnerEnabled",void 0),i([h.aliasOf("viewModel.title"),b.renderable()],t.prototype,"title",void 0),
i([h.aliasOf("viewModel.updateLocationEnabled")],t.prototype,"updateLocationEnabled",void 0),i([h.aliasOf("viewModel.view")],t.prototype,"view",void 0),i([h.property({type:v}),b.renderable(["viewModel.view.widthBreakpoint","viewModel.allActions","viewModel.screenLocation","viewModel.screenLocationEnabled","viewModel.state","viewModel.pendingPromisesCount","viewModel.promiseCount","viewModel.waitingForResult"]),b.vmEvent(["triggerAction","trigger-action"])],t.prototype,"viewModel",void 0),i([h.aliasOf("viewModel.visible"),b.renderable()],t.prototype,"visible",void 0),i([h.aliasOf("viewModel.clear")],t.prototype,"clear",null),i([h.aliasOf("viewModel.next")],t.prototype,"next",null),i([h.aliasOf("viewModel.previous")],t.prototype,"previous",null),i([h.aliasOf("viewModel.triggerAction")],t.prototype,"triggerAction",null),i([b.accessibleHandler()],t.prototype,"_toggleCollapsed",null),i([b.accessibleHandler()],t.prototype,"_close",null),i([b.accessibleHandler()],t.prototype,"_toggleDockEnabled",null),i([b.accessibleHandler()],t.prototype,"_toggleFeatureMenu",null),i([b.accessibleHandler()],t.prototype,"_toggleActionsMenu",null),i([b.accessibleHandler()],t.prototype,"_triggerAction",null),i([b.accessibleHandler()],t.prototype,"_selectFeature",null),i([b.accessibleHandler()],t.prototype,"_next",null),i([b.accessibleHandler()],t.prototype,"_previous",null),t=i([h.subclass("esri.widgets.Popup")],t)}(h.declared(_))});