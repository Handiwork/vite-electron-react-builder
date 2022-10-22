import type { ElectronAPI } from "../src";

declare global {
  declare interface Window {
    electron: Readonly<ElectronAPI>;
    electronRequire?: NodeRequire;
  }
}

export {};
