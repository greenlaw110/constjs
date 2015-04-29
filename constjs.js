"use strict";function isArray(e){return _.isArray(e)}function isObject(e){return e instanceof Object&&!isArray(e)}function isString(e){return _.isString(e)}function ensureValidEnumKeyName(e){if(!e||"string"!=typeof e||!isNaN(parseInt(e)))throw"bad enum key: "+e}function keysFromArray(e){for(var r=[],n=0,t=e.length;t>n;++n){var s=e[n];ensureValidEnumKeyName(s),r.push(e[n])}return r}function keysFromObject(e){var r=[];for(var n in e)e.hasOwnProperty(n)&&(ensureValidEnumKeyName(n),r.push(n));return r}function keysFromString(e){for(var r=e.split(/[,;:\s]+/),n=0,t=r.length;t>n;++n)ensureValidEnumKeyName(r[n]);return r}function getIsFuncName(e){return ensureValidEnumKeyName(e),"is"+_.capitalize(_.camelCase(e))}function buildEnum(e,r,n){for(var t=0,s=e.length;s>t;++t){var i=e[t],u=getIsFuncName(i);r[i]={_id:i,_seq:t},n.push(u)}}function extendIsFuncsToEnum(e,r,n){_.forEach(e,function(e,t){extendIsFuncsToEnumItem(e,r,n)})}function extendIsFuncsToEnumItem(e,r,n){e.toString=function(){return e._id},e.name=e.toString,e.__is_func_nm__=getIsFuncName(e._id),n&&(e.__is_func_list__=r),_.forEach(r,function(r){e[r]=function(){return r===e.__is_func_nm__}}),e.is=function(r){return r===e?!0:r===e._seq?!0:"string"==typeof r?r.toUpperCase()===e._id.toUpperCase():!1}}function freeze(e){return Object&&Object.freeze?Object.freeze(e):e}var _=require("lodash"),genEnum=function(e){var r=[];if(arguments.length>1)r=keysFromArray(arguments);else if(isArray(e))r=keysFromArray(e);else if(isObject(e))r=keysFromObject(e);else{if(!isString(e))throw new Error("Argument must be a string or an array of strings.");r=keysFromString(e)}var n={},t=[];return buildEnum(r,n,t),extendIsFuncsToEnum(n,t,!0),freeze(n)},genConst=function(e){var r=[];if(arguments.length>1)r=keysFromArray(arguments);else if(isArray(e))r=keysFromArray(e);else if(isObject(e))r=keysFromObject(e);else{if(!isString(e))throw new Error("Argument must be a string or an array of strings.");r=keysFromString(e)}for(var n={},t=0,s=r.length;s>t;++t){var i=r[t];n[i]=i}return freeze(n)},genBitmap=function(e){var r=[],n=!1,t=!1;if(arguments.length>1)if("boolean"==typeof arguments[0]){n=arguments[0];var s=[];if(Array.prototype.push.apply(s,arguments),s.shift(),1==s.length)if(e=s[0],isString(e))r=keysFromString(e);else if(isObject(e))t=e,r=keysFromObject(e);else{if(!isArray(e))throw new Error("Argument must be a string or an array of strings.");r=keysFromArray(e)}else r=keysFromArray(s)}else r=keysFromArray(arguments);else if(isArray(e))r=keysFromArray(e);else if(isObject(e))t=e,r=keysFromObject(e);else{if(!isString(e))throw new Error("Argument must be a string or an array of strings.");r=keysFromString(e)}for(var i={},u=0,a=r.length;a>u;++u){var o=r[u];i[o]=t&&"boolean"==typeof t[o]?t[o]:n}return freeze(i)},_unJSON=function(e){if(e&&e._id&&e.__is_func_list__&&e.__is_func_nm__)extendIsFuncsToEnumItem(e,e.__is_func_list__,!0);else if(isObject(e))for(var r in e)e.hasOwnProperty(r)&&_unJSON(e[r])},unJSON=function(e){return"string"==typeof e&&(e=JSON.parse(e)),_unJSON(e),e};module.exports={"enum":genEnum,"const":genConst,bitmap:genBitmap,unJSON:unJSON};