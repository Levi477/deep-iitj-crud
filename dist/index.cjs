"use strict";
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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CrudClient: () => CrudClient
});
module.exports = __toCommonJS(index_exports);
var import_console = require("console");
var CrudClient = class {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.apiUri = config.apiUri.replace(/\/+$/, "");
  }
  async request(method, path = "", data) {
    const BaseUrl = `${this.apiUri}${path}`;
    const add = `apiKey=${this.apiKey}`;
    let url;
    if (BaseUrl.includes("?")) {
      url = BaseUrl + "&" + add;
    } else {
      url = BaseUrl + "?" + add;
    }
    (0, import_console.log)(url);
    const options = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (data) {
      options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Error ${response.status}`);
    }
    return response.json();
  }
  async create(data) {
    return this.request("POST", "/api/create", data);
  }
  async read(id) {
    const path = id ? `/api/get?id=${id}` : "/api/get";
    return this.request("GET", path);
  }
  async update(id, data) {
    return this.request("PUT", `/api/update?id=${id}`, data);
  }
  async delete(id) {
    return this.request("DELETE", `/api/delete?id=${id}`);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CrudClient
});
