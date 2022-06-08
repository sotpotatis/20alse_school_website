var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Routes
});
module.exports = __toCommonJS(stdin_exports);
var import_index_3d85b0e4 = require("../../chunks/index-3d85b0e4.js");
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const matchName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const iconDefaults = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16,
  rotate: 0,
  vFlip: false,
  hFlip: false
});
function fullIcon(data) {
  return __spreadValues(__spreadValues({}, iconDefaults), data);
}
const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIcon(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIcon(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIcon(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIcon = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchName)) && icon.name.match(matchName));
};
function mergeIconData(icon, alias) {
  const result = __spreadValues({}, icon);
  for (const key in iconDefaults) {
    const prop = key;
    if (alias[prop] !== void 0) {
      const value = alias[prop];
      if (result[prop] === void 0) {
        result[prop] = value;
        continue;
      }
      switch (prop) {
        case "rotate":
          result[prop] = (result[prop] + value) % 4;
          break;
        case "hFlip":
        case "vFlip":
          result[prop] = value !== result[prop];
          break;
        default:
          result[prop] = value;
      }
    }
  }
  return result;
}
function getIconData$1(data, name, full = false) {
  function getIcon(name2, iteration) {
    if (data.icons[name2] !== void 0) {
      return Object.assign({}, data.icons[name2]);
    }
    if (iteration > 5) {
      return null;
    }
    const aliases = data.aliases;
    if (aliases && aliases[name2] !== void 0) {
      const item = aliases[name2];
      const result2 = getIcon(item.parent, iteration + 1);
      if (result2) {
        return mergeIconData(result2, item);
      }
      return result2;
    }
    const chars = data.chars;
    if (!iteration && chars && chars[name2] !== void 0) {
      return getIcon(chars[name2], iteration + 1);
    }
    return null;
  }
  const result = getIcon(name, 0);
  if (result) {
    for (const key in iconDefaults) {
      if (result[key] === void 0 && data[key] !== void 0) {
        result[key] = data[key];
      }
    }
  }
  return result && full ? fullIcon(result) : result;
}
function isVariation(item) {
  for (const key in iconDefaults) {
    if (item[key] !== void 0) {
      return true;
    }
  }
  return false;
}
function parseIconSet(data, callback, options) {
  options = options || {};
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const icons = data.icons;
  Object.keys(icons).forEach((name) => {
    const iconData = getIconData$1(data, name, true);
    if (iconData) {
      callback(name, iconData);
      names.push(name);
    }
  });
  const parseAliases = options.aliases || "all";
  if (parseAliases !== "none" && typeof data.aliases === "object") {
    const aliases = data.aliases;
    Object.keys(aliases).forEach((name) => {
      if (parseAliases === "variations" && isVariation(aliases[name])) {
        return;
      }
      const iconData = getIconData$1(data, name, true);
      if (iconData) {
        callback(name, iconData);
        names.push(name);
      }
    });
  }
  return names;
}
const optionalProperties = {
  provider: "string",
  aliases: "object",
  not_found: "object"
};
for (const prop in iconDefaults) {
  optionalProperties[prop] = typeof iconDefaults[prop];
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  for (const prop in optionalProperties) {
    if (obj[prop] !== void 0 && typeof obj[prop] !== optionalProperties[prop]) {
      return null;
    }
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchName) || typeof icon.body !== "string") {
      return null;
    }
    for (const prop in iconDefaults) {
      if (icon[prop] !== void 0 && typeof icon[prop] !== typeof iconDefaults[prop]) {
        return null;
      }
    }
  }
  const aliases = data.aliases;
  if (aliases) {
    for (const name in aliases) {
      const icon = aliases[name];
      const parent = icon.parent;
      if (!name.match(matchName) || typeof parent !== "string" || !icons[parent] && !aliases[parent]) {
        return null;
      }
      for (const prop in iconDefaults) {
        if (icon[prop] !== void 0 && typeof icon[prop] !== typeof iconDefaults[prop]) {
          return null;
        }
      }
    }
  }
  return data;
}
const storageVersion = 1;
let storage$1 = /* @__PURE__ */ Object.create(null);
try {
  const w = window || self;
  if (w && w._iconifyStorage.version === storageVersion) {
    storage$1 = w._iconifyStorage.storage;
  }
} catch (err) {
}
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ Object.create(null)
  };
}
function getStorage(provider, prefix) {
  if (storage$1[provider] === void 0) {
    storage$1[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerStorage = storage$1[provider];
  if (providerStorage[prefix] === void 0) {
    providerStorage[prefix] = newStorage(provider, prefix);
  }
  return providerStorage[prefix];
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  const t = Date.now();
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing[name] = t;
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = Object.freeze(fullIcon(icon));
      return true;
    }
  } catch (err) {
  }
  return false;
}
function getIconFromStorage(storage2, name) {
  const value = storage2.icons[name];
  return value === void 0 ? null : value;
}
let simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  return icon ? getIconFromStorage(getStorage(icon.provider, icon.prefix), icon.name) : null;
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = typeof data.provider === "string" ? data.provider : "";
  }
  if (simpleNames && provider === "" && (typeof data.prefix !== "string" || data.prefix === "")) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  if (typeof data.prefix !== "string" || !validateIcon({
    provider,
    prefix: data.prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, data.prefix);
  return !!addIconSet(storage2, data);
}
const defaults = Object.freeze({
  inline: false,
  width: null,
  height: null,
  hAlign: "center",
  vAlign: "middle",
  slice: false,
  hFlip: false,
  vFlip: false,
  rotate: 0
});
function mergeCustomisations(defaults2, item) {
  const result = {};
  for (const key in defaults2) {
    const attr = key;
    result[attr] = defaults2[attr];
    if (item[attr] === void 0) {
      continue;
    }
    const value = item[attr];
    switch (attr) {
      case "inline":
      case "slice":
        if (typeof value === "boolean") {
          result[attr] = value;
        }
        break;
      case "hFlip":
      case "vFlip":
        if (value === true) {
          result[attr] = !result[attr];
        }
        break;
      case "hAlign":
      case "vAlign":
        if (typeof value === "string" && value !== "") {
          result[attr] = value;
        }
        break;
      case "width":
      case "height":
        if (typeof value === "string" && value !== "" || typeof value === "number" && value || value === null) {
          result[attr] = value;
        }
        break;
      case "rotate":
        if (typeof value === "number") {
          result[attr] += value;
        }
        break;
    }
  }
  return result;
}
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision === void 0 ? 100 : precision;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function preserveAspectRatio(props) {
  let result = "";
  switch (props.hAlign) {
    case "left":
      result += "xMin";
      break;
    case "right":
      result += "xMax";
      break;
    default:
      result += "xMid";
  }
  switch (props.vAlign) {
    case "top":
      result += "YMin";
      break;
    case "bottom":
      result += "YMax";
      break;
    default:
      result += "YMid";
  }
  result += props.slice ? " slice" : " meet";
  return result;
}
function iconToSVG(icon, customisations) {
  const box = {
    left: icon.left,
    top: icon.top,
    width: icon.width,
    height: icon.height
  };
  let body = icon.body;
  [icon, customisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
      case 2:
        transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== 0 || box.top !== 0) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  let width, height;
  if (customisations.width === null && customisations.height === null) {
    height = "1em";
    width = calculateSize(height, box.width / box.height);
  } else if (customisations.width !== null && customisations.height !== null) {
    width = customisations.width;
    height = customisations.height;
  } else if (customisations.height !== null) {
    height = customisations.height;
    width = calculateSize(height, box.width / box.height);
  } else {
    width = customisations.width;
    height = calculateSize(width, box.height / box.width);
  }
  if (width === "auto") {
    width = box.width;
  }
  if (height === "auto") {
    height = box.height;
  }
  width = typeof width === "string" ? width : width.toString() + "";
  height = typeof height === "string" ? height : height.toString() + "";
  const result = {
    attributes: {
      width,
      height,
      preserveAspectRatio: preserveAspectRatio(customisations),
      viewBox: box.left.toString() + " " + box.top.toString() + " " + box.width.toString() + " " + box.height.toString()
    },
    body
  };
  if (customisations.inline) {
    result.inline = true;
  }
  return result;
}
const regex = /\sid="(\S+)"/g;
const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"), "$1" + newID + "$3");
  });
  return body;
}
const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    resources,
    path: source.path === void 0 ? "/" : source.path,
    maxURL: source.maxURL ? source.maxURL : 500,
    rotate: source.rotate ? source.rotate : 750,
    timeout: source.timeout ? source.timeout : 5e3,
    random: source.random === true,
    index: source.index ? source.index : 0,
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config2 = createAPIConfig(customConfig);
  if (config2 === null) {
    return false;
  }
  configStorage[provider] = config2;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
const mergeParams = (base, params) => {
  let result = base, hasParams = result.indexOf("?") !== -1;
  function paramToString(value) {
    switch (typeof value) {
      case "boolean":
        return value ? "true" : "false";
      case "number":
        return encodeURIComponent(value);
      case "string":
        return encodeURIComponent(value);
      default:
        throw new Error("Invalid parameter");
    }
  }
  Object.keys(params).forEach((key) => {
    let value;
    try {
      value = paramToString(params[key]);
    } catch (err) {
      return;
    }
    result += (hasParams ? "&" : "?") + encodeURIComponent(key) + "=" + value;
    hasParams = true;
  });
  return result;
};
const maxLengthCache = {};
const pathCache = {};
const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
  return null;
};
let fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
  const config2 = getAPIConfig(provider);
  if (!config2) {
    return 0;
  }
  let result;
  if (!config2.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config2.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = mergeParams(prefix + ".json", {
      icons: ""
    });
    result = config2.maxURL - maxHostLength - config2.path.length - url.length;
  }
  const cacheKey = provider + ":" + prefix;
  pathCache[provider] = config2.path;
  maxLengthCache[cacheKey] = result;
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  let maxLength = maxLengthCache[prefix];
  if (maxLength === void 0) {
    maxLength = calculateMaxLength(provider, prefix);
  }
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    if (pathCache[provider] === void 0) {
      const config2 = getAPIConfig(provider);
      if (!config2) {
        return "/";
      }
      pathCache[provider] = config2.path;
    }
    return pathCache[provider];
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      path += mergeParams(prefix + ".json", {
        icons: iconsList
      });
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        callback("next", defaultError);
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    if (storage2[provider] === void 0) {
      storage2[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerStorage = storage2[provider];
    if (providerStorage[prefix] === void 0) {
      providerStorage[prefix] = getStorage(provider, prefix);
    }
    const localStorage = providerStorage[prefix];
    let list;
    if (localStorage.icons[name] !== void 0) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing[name] !== void 0) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
const callbacks = /* @__PURE__ */ Object.create(null);
const pendingUpdates = /* @__PURE__ */ Object.create(null);
function removeCallback(sources, id) {
  sources.forEach((source) => {
    const provider = source.provider;
    if (callbacks[provider] === void 0) {
      return;
    }
    const providerCallbacks = callbacks[provider];
    const prefix = source.prefix;
    const items = providerCallbacks[prefix];
    if (items) {
      providerCallbacks[prefix] = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(provider, prefix) {
  if (pendingUpdates[provider] === void 0) {
    pendingUpdates[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerPendingUpdates = pendingUpdates[provider];
  if (!providerPendingUpdates[prefix]) {
    providerPendingUpdates[prefix] = true;
    setTimeout(() => {
      providerPendingUpdates[prefix] = false;
      if (callbacks[provider] === void 0 || callbacks[provider][prefix] === void 0) {
        return;
      }
      const items = callbacks[provider][prefix].slice(0);
      if (!items.length) {
        return;
      }
      const storage2 = getStorage(provider, prefix);
      let hasPending = false;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage2.icons[name] !== void 0) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage2.missing[name] !== void 0) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([
              {
                provider,
                prefix
              }
            ], item.id);
          }
          item.callback(icons.loaded.slice(0), icons.missing.slice(0), icons.pending.slice(0), item.abort);
        }
      });
    });
  }
}
let idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((source) => {
    const provider = source.provider;
    const prefix = source.prefix;
    if (callbacks[provider] === void 0) {
      callbacks[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerCallbacks = callbacks[provider];
    if (providerCallbacks[prefix] === void 0) {
      providerCallbacks[prefix] = [];
    }
    providerCallbacks[prefix].push(item);
  });
  return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, false, simpleNames2) : item;
    if (!validate || validateIcon(icon, simpleNames2)) {
      result.push({
        provider: icon.provider,
        prefix: icon.prefix,
        name: icon.name
      });
    }
  });
  return result;
}
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function sendQuery(config2, payload, query, done) {
  const resourcesCount = config2.resources.length;
  const startIndex = config2.random ? Math.floor(Math.random() * resourcesCount) : config2.index;
  let resources;
  if (config2.random) {
    let list = config2.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config2.resources.slice(startIndex).concat(config2.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config2.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config2.random) {
      const index = config2.resources.indexOf(item.resource);
      if (index !== -1 && index !== config2.index) {
        config2.index = index;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config2.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config2.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function setConfig(config2) {
  if (typeof config2 !== "object" || typeof config2.resources !== "object" || !(config2.resources instanceof Array) || !config2.resources.length) {
    throw new Error("Invalid Reduncancy configuration");
  }
  const newConfig = /* @__PURE__ */ Object.create(null);
  let key;
  for (key in defaultConfig) {
    if (config2[key] !== void 0) {
      newConfig[key] = config2[key];
    } else {
      newConfig[key] = defaultConfig[key];
    }
  }
  return newConfig;
}
function initRedundancy(cfg) {
  const config2 = setConfig(cfg);
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(config2, payload, queryCallback, (data, error) => {
      cleanup();
      if (doneCallback) {
        doneCallback(data, error);
      }
    });
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    const result = queries.find((value) => {
      return callback(value);
    });
    return result !== void 0 ? result : null;
  }
  const instance = {
    query,
    find,
    setIndex: (index) => {
      config2.index = index;
    },
    getIndex: () => config2.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
const redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (redundancyCache[provider] === void 0) {
    const config2 = getAPIConfig(provider);
    if (!config2) {
      return;
    }
    const redundancy = initRedundancy(config2);
    const cachedReundancy = {
      config: config2,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config2 = createAPIConfig(target);
    if (config2) {
      redundancy = initRedundancy(config2);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
const cache = {};
function emptyCallback() {
}
const pendingIcons = /* @__PURE__ */ Object.create(null);
const iconsToLoad = /* @__PURE__ */ Object.create(null);
const loaderFlags = /* @__PURE__ */ Object.create(null);
const queueFlags = /* @__PURE__ */ Object.create(null);
function loadedNewIcons(provider, prefix) {
  if (loaderFlags[provider] === void 0) {
    loaderFlags[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerLoaderFlags = loaderFlags[provider];
  if (!providerLoaderFlags[prefix]) {
    providerLoaderFlags[prefix] = true;
    setTimeout(() => {
      providerLoaderFlags[prefix] = false;
      updateCallbacks(provider, prefix);
    });
  }
}
const errorsCache = /* @__PURE__ */ Object.create(null);
function loadNewIcons(provider, prefix, icons) {
  function err() {
    const key = (provider === "" ? "" : "@" + provider + ":") + prefix;
    const time = Math.floor(Date.now() / 6e4);
    if (errorsCache[key] < time) {
      errorsCache[key] = time;
      console.error('Unable to retrieve icons for "' + key + '" because API is not configured properly.');
    }
  }
  if (iconsToLoad[provider] === void 0) {
    iconsToLoad[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerIconsToLoad = iconsToLoad[provider];
  if (queueFlags[provider] === void 0) {
    queueFlags[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerQueueFlags = queueFlags[provider];
  if (pendingIcons[provider] === void 0) {
    pendingIcons[provider] = /* @__PURE__ */ Object.create(null);
  }
  const providerPendingIcons = pendingIcons[provider];
  if (providerIconsToLoad[prefix] === void 0) {
    providerIconsToLoad[prefix] = icons;
  } else {
    providerIconsToLoad[prefix] = providerIconsToLoad[prefix].concat(icons).sort();
  }
  if (!providerQueueFlags[prefix]) {
    providerQueueFlags[prefix] = true;
    setTimeout(() => {
      providerQueueFlags[prefix] = false;
      const icons2 = providerIconsToLoad[prefix];
      delete providerIconsToLoad[prefix];
      const api = getAPIModule(provider);
      if (!api) {
        err();
        return;
      }
      const params = api.prepare(provider, prefix, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data, error) => {
          const storage2 = getStorage(provider, prefix);
          if (typeof data !== "object") {
            if (error !== 404) {
              return;
            }
            const t = Date.now();
            item.icons.forEach((name) => {
              storage2.missing[name] = t;
            });
          } else {
            try {
              const parsed = addIconSet(storage2, data);
              if (!parsed.length) {
                return;
              }
              const pending = providerPendingIcons[prefix];
              parsed.forEach((name) => {
                delete pending[name];
              });
              if (cache.store) {
                cache.store(provider, data);
              }
            } catch (err2) {
              console.error(err2);
            }
          }
          loadedNewIcons(provider, prefix);
        });
      });
    });
  }
}
const loadIcons = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) {
      setTimeout(() => {
        if (callCallback) {
          callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const provider = icon.provider;
    const prefix = icon.prefix;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push({
      provider,
      prefix
    });
    if (pendingIcons[provider] === void 0) {
      pendingIcons[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerPendingIcons = pendingIcons[provider];
    if (providerPendingIcons[prefix] === void 0) {
      providerPendingIcons[prefix] = /* @__PURE__ */ Object.create(null);
    }
    if (newIcons[provider] === void 0) {
      newIcons[provider] = /* @__PURE__ */ Object.create(null);
    }
    const providerNewIcons = newIcons[provider];
    if (providerNewIcons[prefix] === void 0) {
      providerNewIcons[prefix] = [];
    }
  });
  const time = Date.now();
  sortedIcons.pending.forEach((icon) => {
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const pendingQueue = pendingIcons[provider][prefix];
    if (pendingQueue[name] === void 0) {
      pendingQueue[name] = time;
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((source) => {
    const provider = source.provider;
    const prefix = source.prefix;
    if (newIcons[provider][prefix].length) {
      loadNewIcons(provider, prefix, newIcons[provider][prefix]);
    }
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
const cacheVersion = "iconify2";
const cachePrefix = "iconify";
const countKey = cachePrefix + "-count";
const versionKey = cachePrefix + "-version";
const hour = 36e5;
const cacheExpiration = 168;
const config = {
  local: true,
  session: true
};
let loaded = false;
const count = {
  local: 0,
  session: 0
};
const emptyList = {
  local: [],
  session: []
};
let _window = typeof window === "undefined" ? {} : window;
function getGlobal(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  config[key] = false;
  return null;
}
function setCount(storage2, key, value) {
  try {
    storage2.setItem(countKey, value.toString());
    count[key] = value;
    return true;
  } catch (err) {
    return false;
  }
}
function getCount(storage2) {
  const count2 = storage2.getItem(countKey);
  if (count2) {
    const total = parseInt(count2);
    return total ? total : 0;
  }
  return 0;
}
function initCache(storage2, key) {
  try {
    storage2.setItem(versionKey, cacheVersion);
  } catch (err) {
  }
  setCount(storage2, key, 0);
}
function destroyCache(storage2) {
  try {
    const total = getCount(storage2);
    for (let i = 0; i < total; i++) {
      storage2.removeItem(cachePrefix + i.toString());
    }
  } catch (err) {
  }
}
const loadCache = () => {
  if (loaded) {
    return;
  }
  loaded = true;
  const minTime = Math.floor(Date.now() / hour) - cacheExpiration;
  function load(key) {
    const func = getGlobal(key);
    if (!func) {
      return;
    }
    const getItem = (index) => {
      const name = cachePrefix + index.toString();
      const item = func.getItem(name);
      if (typeof item !== "string") {
        return false;
      }
      let valid = true;
      try {
        const data = JSON.parse(item);
        if (typeof data !== "object" || typeof data.cached !== "number" || data.cached < minTime || typeof data.provider !== "string" || typeof data.data !== "object" || typeof data.data.prefix !== "string") {
          valid = false;
        } else {
          const provider = data.provider;
          const prefix = data.data.prefix;
          const storage2 = getStorage(provider, prefix);
          valid = addIconSet(storage2, data.data).length > 0;
        }
      } catch (err) {
        valid = false;
      }
      if (!valid) {
        func.removeItem(name);
      }
      return valid;
    };
    try {
      const version = func.getItem(versionKey);
      if (version !== cacheVersion) {
        if (version) {
          destroyCache(func);
        }
        initCache(func, key);
        return;
      }
      let total = getCount(func);
      for (let i = total - 1; i >= 0; i--) {
        if (!getItem(i)) {
          if (i === total - 1) {
            total--;
          } else {
            emptyList[key].push(i);
          }
        }
      }
      setCount(func, key, total);
    } catch (err) {
    }
  }
  for (const key in config) {
    load(key);
  }
};
const storeCache = (provider, data) => {
  if (!loaded) {
    loadCache();
  }
  function store(key) {
    if (!config[key]) {
      return false;
    }
    const func = getGlobal(key);
    if (!func) {
      return false;
    }
    let index = emptyList[key].shift();
    if (index === void 0) {
      index = count[key];
      if (!setCount(func, key, index + 1)) {
        return false;
      }
    }
    try {
      const item = {
        cached: Math.floor(Date.now() / hour),
        provider,
        data
      };
      func.setItem(cachePrefix + index.toString(), JSON.stringify(item));
    } catch (err) {
      return false;
    }
    return true;
  }
  if (!Object.keys(data.icons).length) {
    return;
  }
  if (data.not_found) {
    data = Object.assign({}, data);
    delete data.not_found;
  }
  if (!store("local")) {
    store("session");
  }
};
const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function alignmentFromString(custom, align) {
  align.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "left":
      case "center":
      case "right":
        custom.hAlign = value;
        break;
      case "top":
      case "middle":
      case "bottom":
        custom.vAlign = value;
        break;
      case "slice":
      case "crop":
        custom.slice = true;
        break;
      case "meet":
        custom.slice = false;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
const svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
function render(icon, props) {
  const customisations = mergeCustomisations(defaults, props);
  const componentProps = __spreadValues({}, svgDefaults);
  let style = typeof props.style === "string" ? props.style : "";
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "onLoad":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "align":
        if (typeof value === "string") {
          alignmentFromString(customisations, value);
        }
        break;
      case "color":
        style = style + (style.length > 0 && style.trim().slice(-1) !== ";" ? ";" : "") + "color: " + value + "; ";
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (key.slice(0, 3) === "on:") {
          break;
        }
        if (defaults[key] === void 0) {
          componentProps[key] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  for (let key in item.attributes) {
    componentProps[key] = item.attributes[key];
  }
  if (item.inline) {
    style = "vertical-align: -0.125em; " + style;
  }
  if (style !== "") {
    componentProps.style = style;
  }
  let localCounter = 0;
  let id = props.id;
  if (typeof id === "string") {
    id = id.replace(/-/g, "_");
  }
  return {
    attributes: componentProps,
    body: replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifySvelte")
  };
}
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  cache.store = storeCache;
  loadCache();
  const _window2 = window;
  if (_window2.IconifyPreload !== void 0) {
    const preload = _window2.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (typeof item !== "object" || item === null || item instanceof Array || typeof item.icons !== "object" || typeof item.prefix !== "string" || !addCollection(item)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      });
    }
  }
  if (_window2.IconifyProviders !== void 0) {
    const providers = _window2.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (let key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === void 0) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      }
    }
  }
}
function checkIconState(icon, state, mounted, callback, onload) {
  function abortLoading() {
    if (state.loading) {
      state.loading.abort();
      state.loading = null;
    }
  }
  if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
    state.name = "";
    abortLoading();
    return { data: fullIcon(icon) };
  }
  let iconName;
  if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
    abortLoading();
    return null;
  }
  const data = getIconData(iconName);
  if (data === null) {
    if (mounted && (!state.loading || state.loading.name !== icon)) {
      abortLoading();
      state.name = "";
      state.loading = {
        name: icon,
        abort: loadIcons([iconName], callback)
      };
    }
    return null;
  }
  abortLoading();
  if (state.name !== icon) {
    state.name = icon;
    if (onload && !state.destroyed) {
      onload(icon);
    }
  }
  const classes = ["iconify"];
  if (iconName.prefix !== "") {
    classes.push("iconify--" + iconName.prefix);
  }
  if (iconName.provider !== "") {
    classes.push("iconify--" + iconName.provider);
  }
  return { data, classes };
}
function generateIcon(icon, props) {
  return icon ? render(icon, props) : null;
}
const Icon = (0, import_index_3d85b0e4.c)(($$result, $$props, $$bindings, slots) => {
  const state = {
    name: "",
    loading: null,
    destroyed: false
  };
  let mounted = false;
  let data;
  const onLoad = (icon) => {
    if (typeof $$props.onLoad === "function") {
      $$props.onLoad(icon);
    }
    const dispatch = (0, import_index_3d85b0e4.d)();
    dispatch("load", { icon });
  };
  function loaded2() {
  }
  (0, import_index_3d85b0e4.o)(() => {
    state.destroyed = true;
    if (state.loading) {
      state.loading.abort();
      state.loading = null;
    }
  });
  {
    {
      const iconData = checkIconState($$props.icon, state, mounted, loaded2, onLoad);
      data = iconData ? generateIcon(iconData.data, $$props) : null;
      if (data && iconData.classes) {
        data.attributes["class"] = (typeof $$props["class"] === "string" ? $$props["class"] + " " : "") + iconData.classes.join(" ");
      }
    }
  }
  return `${data !== null ? `<svg${(0, import_index_3d85b0e4.a)([(0, import_index_3d85b0e4.b)(data.attributes)], {})}><!-- HTML_TAG_START -->${data.body}<!-- HTML_TAG_END --></svg>` : ``}`;
});
const Button = (0, import_index_3d85b0e4.c)(($$result, $$props, $$bindings, slots) => {
  let { background_color } = $$props;
  let { border_color } = $$props;
  let { onclick_action } = $$props;
  let { text } = $$props;
  let { icon = null } = $$props;
  if ($$props.background_color === void 0 && $$bindings.background_color && background_color !== void 0)
    $$bindings.background_color(background_color);
  if ($$props.border_color === void 0 && $$bindings.border_color && border_color !== void 0)
    $$bindings.border_color(border_color);
  if ($$props.onclick_action === void 0 && $$bindings.onclick_action && onclick_action !== void 0)
    $$bindings.onclick_action(onclick_action);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  return `<button class="${"bg-" + (0, import_index_3d85b0e4.e)(background_color) + " border-4 border-" + (0, import_index_3d85b0e4.e)(border_color) + " pl-3 pr-3 pt-1 pb-1 text-white font-bold rounded-full"}"><span class="${"flex flex-row gap-2"}">${icon ? `
        ${(0, import_index_3d85b0e4.v)(Icon, "Icon").$$render($$result, { icon }, {}, {})}
    ` : ``}${(0, import_index_3d85b0e4.e)(text)}</span></button>`;
});
const Project_component = (0, import_index_3d85b0e4.c)(($$result, $$props, $$bindings, slots) => {
  let { image_link } = $$props;
  let { image_alt_text } = $$props;
  let { name } = $$props;
  let { description } = $$props;
  let { buttons } = $$props;
  let { tags } = $$props;
  const TAG_NAMES_TO_LINKS = { python: "https://python.org" };
  function tag_name_to_link(tag) {
    if (TAG_NAMES_TO_LINKS[tag] !== void 0) {
      return TAG_NAMES_TO_LINKS[tag];
    } else {
      return null;
    }
  }
  function tag_external_link(tag) {
    let tag_url = tag_name_to_link(tag);
    if (tag_url !== null) {
      location.href = tag_url;
    } else {
      alert("Hittade ingen l\xE4nk f\xF6r denna tagg.");
    }
  }
  if ($$props.image_link === void 0 && $$bindings.image_link && image_link !== void 0)
    $$bindings.image_link(image_link);
  if ($$props.image_alt_text === void 0 && $$bindings.image_alt_text && image_alt_text !== void 0)
    $$bindings.image_alt_text(image_alt_text);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.buttons === void 0 && $$bindings.buttons && buttons !== void 0)
    $$bindings.buttons(buttons);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  return `<div class="${"h-auto snap-center flex flex-col shadow-2xl shadow-inner min-h-full w-80 min-w-80 bg-gray-200 border-gray-300 border-2 p-3 rounded-lg text-gray-800"}"><img${(0, import_index_3d85b0e4.f)("src", image_link, 0)}${(0, import_index_3d85b0e4.f)("alt", image_alt_text, 0)} class="${"overflow-clip shadow-lg w-full h-auto max-h-1/5 mb-2"}">
    <h3 class="${"text-2xl font-bold pr-3 w-64 min-w-full"}">${(0, import_index_3d85b0e4.e)(name)}</h3>
    <p class="${"text-sm text-gray-600"}">${(0, import_index_3d85b0e4.g)(tags, (tag) => {
    return `<button class="${"hover:underline hover:cursor-poiner"}"${(0, import_index_3d85b0e4.f)("onclick", () => tag_external_link(tag), 0)}><span class="${"mr-2"}">${(0, import_index_3d85b0e4.e)(tag)}</span></button>`;
  })}</p>
    <p class="${"overflow-y-auto flex-grow"}">${(0, import_index_3d85b0e4.e)(description)}</p>
    <div class="${"self-end flex flex-row mt-auto"}">${(0, import_index_3d85b0e4.g)(buttons, (button) => {
    return `${(0, import_index_3d85b0e4.v)(Button, "Button").$$render($$result, {
      background_color: button.background_color,
      border_color: button.border_color,
      onclick_action: button.onclick_action,
      text: button.text,
      icon: button.icon
    }, {}, {})}`;
  })}</div></div>`;
});
const Projects_Wrapper = (0, import_index_3d85b0e4.c)(($$result, $$props, $$bindings, slots) => {
  let { projects } = $$props;
  if ($$props.projects === void 0 && $$bindings.projects && projects !== void 0)
    $$bindings.projects(projects);
  return `<div class="${"h-6xl flex flex-row snap-x basis-3/12 flex-shrink-0 flex-grow flex-nowrap items-stretch gap-4 overflow-x-scroll overflow-y-clip w-auto snap-mandatory snap-center snap-x p-3"}">${(0, import_index_3d85b0e4.g)(projects, (project) => {
    return `${(0, import_index_3d85b0e4.v)(Project_component, "Project_component").$$render($$result, {
      image_link: project.image.url,
      image_alt_text: project.image.alt_text,
      tags: project.tags,
      name: project.name,
      description: project.description,
      buttons: project.buttons
    }, {}, {})}`;
  })}</div>`;
});
const Routes = (0, import_index_3d85b0e4.c)(($$result, $$props, $$bindings, slots) => {
  let school_projects = [
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/dishwatcher.png",
        alt_text: "Sk\xE4rmdump som visar hemsidan"
      },
      name: "DishWatcher",
      description: "Projekt f\xF6r att h\xE5lla koll p\xE5 och visa statusen f\xF6r skolans diskmaskiner.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://dishwatch.ssis.nu/"
          },
          text: "Till hemsidan"
        }
      ],
      tags: [
        "python",
        "teknik 1",
        "\xF6ppet api",
        "flask",
        "tailwind",
        "pycom",
        "3d-modellering",
        "egen pcb"
      ]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/fishy.png",
        alt_text: "Sk\xE4rmdump som visar hemsidan"
      },
      name: "Fishy",
      description: "Ett spel d\xE4r m\xE5let \xE4r enkelt: f\xE5nga s\xE5 mycket fisk som m\xF6jligt!",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://github.com/sotpotatis/FishGame/releases/latest/download/FishGame.exe"
          },
          text: "Ladda ner",
          icon: "fluent:arrow-download-48-filled"
        },
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://github.com/sotpotatis/FishGame"
          },
          text: "K\xE4llkod",
          icon: "akar-icons:github-fill"
        }
      ],
      tags: ["c#", "monogame", "programmering 1"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/albins_vm.png",
        alt_text: "Sk\xE4rmdump som visar hemsidan"
      },
      name: "Apache2-hemsida",
      description: "Installation av Apache2 p\xE5 en Debian virtual machine",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://dishwatch.ssis.nu/"
          },
          text: "Till hemsidan"
        }
      ],
      tags: ["apache2", "debian", "linux", "dator- och n\xE4tverksteknik"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/filur.png",
        alt_text: "Sk\xE4rmdump som visar hemsidan"
      },
      name: "Filurhemsidan",
      description: "Min f\xE4rdiga version av hemsidan med den glada figuren p\xE5.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://20alse.ssis.nu/www/filursite/"
          },
          text: "Till hemsidan"
        }
      ],
      tags: ["html", "css", "dator- och n\xE4tverksteknik"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/uppgift1.png",
        alt_text: "Sk\xE4rmdump som visar hemsidan"
      },
      name: "Uppgift 1",
      description: "Min f\xE4rdiga version av Uppgift 1 i dator- och n\xE4tverksteknik. En tillagd funktion \xE4r att slumpvis bilder p\xE5 m\xE4nniskor h\xE4mtas.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: { type: "url", url: "" },
          text: "Till hemsidan"
        }
      ],
      tags: ["html", "css", "dator- och n\xE4tverksteknik"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/www_folder.png",
        alt_text: "Sk\xE4rmdump som visar hemsidan"
      },
      name: "/www/",
      description: "En mapp med massa HTML-filer gjort som en del i Dator- och n\xE4tverksteknik.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: { type: "url", url: "" },
          text: "Till hemsidan"
        }
      ],
      tags: ["html", "css", "dator- och n\xE4tverksteknik"]
    }
  ];
  let personal_projects = [
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/eatery_lunchmeny.png",
        alt_text: "test"
      },
      name: "Eatery Lunchmeny API",
      description: "Ett API f\xF6r att h\xE4mta lunchmenyn p\xE5 SSIS.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://lunchmeny.albins.website/"
          },
          text: "Till API:et",
          icon: ""
        },
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://github.com/sotpotatis/EateryCacher"
          },
          text: "K\xE4llkod",
          icon: "akar-icons:github-fill"
        }
      ],
      tags: ["python", "api", "flask", "beautifulsoup"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/ssis_pentryansvar_api.png",
        alt_text: "test"
      },
      name: "SSIS Pentryansvar API",
      description: "SNART TILLBAKA! API d\xE4r man kan h\xE4mta information om vem som har pentryansvar varje vecka. Anv\xE4nder data fr\xE5n SSIS servrar som g\xF6rs mer m\xE4nskligt l\xE4sbar!",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://pentryansvar.albins.website/api/pentryansvar"
          },
          text: "Till API.et",
          icon: ""
        },
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://github.com/sotpotatis/SSISPentryAnsvarServer"
          },
          text: "K\xE4llkod",
          icon: "akar-icons:github-fill"
        }
      ],
      tags: ["python", "api", "fastapi", "regex"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/click_the_happy_man.png",
        alt_text: "test"
      },
      name: "Click the happy man!",
      description: 'Ett ikoniskt och v\xE4ldigt enkelt spel med ett m\xE5l: "Click the happy man!". Med modernast m\xF6jliga webbdesign.',
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://20alse.ssis.nu/clicker/"
          },
          text: "Spela nu!",
          icon: ""
        }
      ],
      tags: ["html", "css", "javascript"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/lunchmeny_hemsida.png",
        alt_text: "test"
      },
      name: "Eatery-menyn",
      description: "En hemsida som visar veckomenyn p\xE5 Eatery. Bookmark this!",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://20alse.ssis.nu/lunch/"
          },
          text: "Se menyn!",
          icon: ""
        }
      ],
      tags: ["html", "css", "javascript"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/ssis_retro_theme.png",
        alt_text: "test"
      },
      name: "SSIS.nu CSS-teman",
      description: "CSS-teman som \xE4ndrar utseendet p\xE5 SSIS.nu-startsidan via webbl\xE4sarpluginet Stylebot.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://git.ssis.nu/20alse/ssis.nu-css-teman/-/blob/master/README.md"
          },
          text: "Mer information",
          icon: "logos:gitlab"
        }
      ],
      tags: ["css"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/pentryansvar_hemsida.png",
        alt_text: "test"
      },
      name: "Vem har pentryansvar?",
      description: "En enkel hemsida f\xF6r att se vem/vilka som har pentryansvar denna vecka.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://20alse.ssis.nu/pentryansvar"
          },
          text: "Till hemsidan"
        }
      ],
      tags: ["html", "css", "javascript"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/awesome_ssis.png",
        alt_text: "test"
      },
      name: "Awesome SSIS",
      description: "En hemsida som samlar ihop l\xE4nkar till h\xE4ftiga saker som folk p\xE5 SSIS har gjort.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://20alse.ssis.nu/awesome"
          },
          text: "Till hemsidan",
          icon: ""
        },
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://github.com/sotpotatis/Awesome_SSIS"
          },
          text: "K\xE4llkod",
          icon: "akar-icons:github-fill"
        }
      ],
      tags: ["jekyll", "html", "css", "javascript"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/homework_management_bot.png",
        alt_text: "test"
      },
      name: "20alse homework.json Management Bot",
      description: "En Discord-bot f\xF6r att hantera l\xE4xor som jag l\xE4gger in i en l\xE4xfil f\xF6r att sedan kunna anv\xE4nda till diverse automationer och skript.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://github.com/sotpotatis/20alse_homework_handler"
          },
          text: "K\xE4llkod",
          icon: "akar-icons:github-fill"
        },
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://20alse.ssis.nu/homework.json"
          },
          text: "Till l\xE4xfilen",
          icon: ""
        }
      ],
      tags: ["python", "discord", "bot"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/ssis_bot.png",
        alt_text: "test"
      },
      name: "SSIS-relaterad Discord-bot",
      description: "En Discord-bot som kan hantera klubbprenumerationer samt skicka ut information om meny och pentryansvar.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://github.com/sotpotatis/ssisrelateddiscordbot"
          },
          text: "K\xE4llkod",
          icon: "akar-icons:github-fill"
        }
      ],
      tags: ["python", "discord", "bot"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/distans.png",
        alt_text: "test"
      },
      name: "Vem har fj\xE4rr?",
      description: "Enkel hemsida f\xF6r att se vem som har fj\xE4rrundervisning den aktuella dagen. Inte l\xE4ngre relevant d\xE5 distansundervisningen \xE4r \xF6ver! :celebrating_emoji:",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://20alse.ssis.nu/distans/"
          },
          text: "K\xE4llkod",
          icon: "akar-icons:github-fill"
        }
      ],
      tags: ["arkiverad", "html", "css", "javascript"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/ssis_discord_rpc.png",
        alt_text: "test"
      },
      name: "SSIS Discord RPC",
      description: "En integration med Discord Rich Presence som visar vilken SSIS-lektion man \xE4r p\xE5 i sin status p\xE5 Discord-appen.",
      buttons: [],
      tags: [
        "python",
        "discord",
        "trayicon",
        "konfigurerbar",
        "fungerar med steelseeries engine"
      ]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/ssis_schedule_python.png",
        alt_text: "test"
      },
      name: "SSIS Schedule Python",
      description: "Ett Python-bibliotek f\xF6r att h\xE4mta schemat f\xF6r en klass, l\xE4rare, eller ett rum p\xE5 SSIS.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://github.com/sotpotatis/SSIS-Schedule-Python"
          },
          text: "K\xE4llkod",
          icon: "akar-icons:github-fill"
        }
      ],
      tags: ["python", "bibliotek", "schema"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/te20a_bot.png",
        alt_text: "test"
      },
      name: "Te20A Bot",
      description: "En Discord-bot med flera SSIS-relaterade funktioner till min klass.",
      buttons: [],
      tags: ["python", "discord", "bot"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/whatscomingup.png",
        alt_text: "test"
      },
      name: "WhatsComingUp",
      description: "Ett icke-f\xE4rdigt projekt som jag b\xF6rjade p\xE5 under skolans \xF6ppna hus f\xF6r att h\xE4mta in data fr\xE5n Canvas, Google Calendar, och andra k\xE4llor f\xF6r att samla alla ens skoluppgifter p\xE5 ett st\xE4lle. (du kanske \xE4nd\xE5 hittar n\xE5got anv\xE4ndbart h\xE4r?)",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://github.com/sotpotatis/WhatsComingUp"
          },
          text: "K\xE4llkod",
          icon: "akar-icons:github-fill"
        }
      ],
      tags: [
        "python",
        "flask",
        "canvas api",
        "google calendar api",
        "lunchbot api",
        "inloggningssystem",
        "\xF6ppet hus",
        "of\xE4rdigt"
      ]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/schedule_webhook.png",
        alt_text: "test"
      },
      name: "SSIS Schedule Webhook",
      description: "En Discord-webhook som skickar p\xE5minnelser om lektioner.",
      buttons: [],
      tags: ["python", "discord", "webhook"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/heldagsevent_webhook.png",
        alt_text: "test"
      },
      name: "SSIS Heldagsevent Webhook",
      description: "En Discord-webhook som skickar vilka heldagsevent som \xE4r i skolan.",
      buttons: [],
      tags: ["python", "discord", "webhook"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/kakservice_bot.png",
        alt_text: "test"
      },
      name: "Kakservice Discord-Webhook",
      description: "En Discord-webhook f\xF6r att skicka information om kakf\xF6rs\xE4ljningsm\xE5l med grafer och tydlig \xF6versikt om man s\xE4ljer kakor via Kakservice.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://github.com/sotpotatis/KakServiceBot"
          },
          text: "K\xE4llkod",
          icon: "akar-icons:github-fill"
        }
      ],
      tags: ["python", "discord", "webhook"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/coming_soon.png",
        alt_text: "test"
      },
      name: "SSIS Schedule Tray",
      description: "En tray-ikon till Windows som visar hur m\xE5nga minuter som \xE4r kvar p\xE5 den aktuella lektionen.",
      buttons: [],
      tags: ["python", "windows", "schema"]
    },
    {
      image: {
        url: "https://20alse.ssis.nu/start_page_assets/lunchbot_python.png",
        alt_text: "test"
      },
      name: "Lunchbot Python Library",
      description: "Ett Python-bibliotek till William Helmenius Lunchbot API. Eftersom den versionen av Lunchbot numera \xE4r nerst\xE4ngd, s\xE5 \xE4r \xE4ven detta bibliotek inte s\xE4rskilt relevant.",
      buttons: [
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://github.com/sotpotatis/Lunchbot-Python"
          },
          text: "K\xE4llkod",
          icon: "akar-icons:github-fill"
        },
        {
          background_color: "green-700",
          border_color: "green-600",
          onclick_action: {
            type: "url",
            url: "https://pypi.org/project/lunchbot-python/"
          },
          text: "PyPi",
          icon: "cib:pypi"
        }
      ],
      tags: ["python", "bibliotek", "lunchbot api"]
    }
  ];
  return `${$$result.head += `${$$result.title = `<title>albins hemsida</title>`, ""}`, ""}

<body class="${"bg-green-600 min-h-screen p-3 font-main"}"><div id="${"header"}" class="${"p-3 min-w-full border-8 text-white border-green-500 bg-green-700 flex flex-col items-center justify-center mb-10"}"><h1 class="${"text-7xl font-bold"}">albin seijmer!</h1>
	<p class="${"text-sm pt-2 flex flex-wrap flex-row flex-shrink gap-3"}">20alse | <span class="${"flex flex-row flex-wrap gap-2"}">${(0, import_index_3d85b0e4.v)(Icon, "Icon").$$render($$result, { icon: "clarity:email-solid" }, {}, {})}<a class="${"hover:underline hover:cursor-pointer"}" href="${"mailto:20alse@stockholmscience.se"}">20alse@stockholmscience.se</a></span>
		| <span class="${"flex flex-row flex-wrap gap-2"}">${(0, import_index_3d85b0e4.v)(Icon, "Icon").$$render($$result, { icon: "akar-icons:github-fill" }, {}, {})} <a class="${"hover:pointer hover:underline"}" target="${"_blank"}" href="${"https://github.com/sotpotatis/"}">sotpotatis</a></span></p></div>
<div id="${"skolprojekt"}" class="${"p-3 min-w-full border-8 text-white border-green-500 bg-green-700 mb-10"}"><h1 class="${"text-5xl font-bold mb-3"}">skolprojekt</h1>
	<p>nedan hittar du mina projekt som jag gjort under skoltid.</p>
	${(0, import_index_3d85b0e4.v)(Projects_Wrapper, "Projects_Wrapper").$$render($$result, { projects: school_projects }, {}, {})}</div>
<div id="${"personliga-projekt"}" class="${"p-3 min-w-full border-8 text-white border-green-500 bg-green-700 mb-10"}"><h1 class="${"text-5xl font-bold mb-3"}">personliga projekt</h1>
	<p>nedan hittar du mina projekt som \xE4r skolrelaterade men som jag gjort utanf\xF6r skoltid.</p>
	${(0, import_index_3d85b0e4.v)(Projects_Wrapper, "Projects_Wrapper").$$render($$result, { projects: personal_projects }, {}, {})}</div>
<div id="${"footer"}" class="${"p-3 min-w-full border-8 text-white border-green-500 bg-green-700 mb-10"}"><p>om du vill kontakta mig s\xE5 finns jag tillg\xE4nglig via mail (se l\xE4ngst upp p\xE5 sidan). jag finns \xE4ven tillg\xE4nglig via discord,
	min tagg \xE4r s\xF6tpotatis!#5212.
	<br>
	\xE4r du sugen p\xE5 att se fler projekt jag gjort som inte har med ssis att g\xF6ra kan du
	kolla in min <a href="${"https://github.com/sotpotatis"}" target="${"_blank"}" class="${"underline hover:cursor-pointer"}">github</a> och/eller min <a href="${"https://albins.website"}" target="${"_blank"}" class="${"underline hover:cursor-pointer"}">personliga hemsida</a>.
		<span class="${"flex flex-row flex-wrap gap-2"}">om du l\xE4ser detta, hoppas att du f\xE5r en bra dag idag!${(0, import_index_3d85b0e4.v)(Icon, "Icon").$$render($$result, { icon: "ant-design:heart-filled" }, {}, {})}</span></p></div></body>`;
});
