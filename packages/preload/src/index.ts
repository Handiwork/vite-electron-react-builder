import { contextBridge } from "electron";

export type ApiKey = "electron";
const apiKey: ApiKey = "electron";
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api = {
  versions: process.versions,
  hello() {
    return "hello world";
  },
};

export type ElectronAPI = typeof api;

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld(apiKey, api);
