# Vite Electron React Builder Boilerplate

[![Required Node.JS >= v16.13](https://img.shields.io/static/v1?label=node&message=%3E=16.13&logo=node.js&color)](https://nodejs.org/about/releases/)
[![Required npm >= v8.1](https://img.shields.io/static/v1?label=npm&message=%3E=8.1&logo=npm&color)](https://github.com/npm/cli/releases)

> Vite+Electron+React

This template is forked from [Vite Electron Builder Boilerplate](https://github.com/cawa-93/vite-electron-builder), now prepared for react.

[Vite] is used for compilation, and [electron-builder] for packaging.


___
### Support
- This fork is maintained by [Autumn][handiwork-github]. 

- Found a problem? Pull requests are welcome.

___




## Get started

Follow these steps to get started with this template:

1. Click the **[Use this template](https://github.com/cawa-93/vite-electron-builder/generate)** button (you must be logged in) or just clone this repo.
2. If you want use another package manager don't forget edit [`.github/workflows`](/.github/workflows) -- it uses `npm` by default.

That's all you need. 

**Note**: This template uses npm v7 feature — [**Installing Peer Dependencies Automatically**](https://github.com/npm/rfcs/blob/latest/implemented/0025-install-peer-deps.md). If you are using a different package manager, you may need to install some peerDependencies manually.




## Features

### [Electron ![Electron version](https://img.shields.io/github/package-json/dependency-version/handiwork/vite-electron-react-builder/dev/electron?label=%20)][electron]
- Template use the latest electron version with all the latest security patches.
- The architecture of the application is built according to the security [guids](https://www.electronjs.org/docs/tutorial/security) and best practices.
- The latest version of the [electron-builder] is used to compile the application.


### [Vite ![Vite version](https://img.shields.io/github/package-json/dependency-version/handiwork/vite-electron-react-builder/dev/vite?label=%20)][vite]
- Vite is used to bundle all source codes. This is an extremely fast packer that has a bunch of great features. You can learn more about how it is arranged in [this](https://youtu.be/xXrhg26VCSc) video.
- Vite [supports](https://vitejs.dev/guide/env-and-mode.html) reading `.env` files. You can also specify types of your environment variables in [`types/vite-env.d.ts`](types/vite-env.d.ts).

Vite provides you with many useful features, such as: `TypeScript`, `TSX/JSX`, `CSS/JSON Importing`, `CSS Modules`, `Web Assembly` and much more.

[See all Vite features here](https://vitejs.dev/guide/features.html).


### [TypeScript ![TypeScript version](https://img.shields.io/github/package-json/dependency-version/handiwork/vite-electron-react-builder/dev/typescript?label=%20)][typescript]
- The Latest TypeScript is used for all source code. 
- **Vite** supports TypeScript out of the box. However, it does not support type checking.
- Code formatting rules follow the latest TypeScript recommendations and best practices thanks to [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).



### [React ![React version](https://img.shields.io/github/package-json/dependency-version/handiwork/vite-electron-react-builder/react?label=%20)][react] (optional)
- By default, web pages are built using [React][react]. However, you can easily change it. Or do not use additional frameworks at all. See [examples of web pages for different frameworks](https://github.com/vitejs/vite/tree/main/packages/create-vite).
- Code formatting rules follow the latest Vue recommendations and best practices thanks to [eslint-plugin-react].

## How it works
The template required a minimum [dependencies](package.json). Only **Vite** is used for building, nothing more.

### Project Structure

The structure of this template is very similar to the structure of a monorepo.

The entire source code of the program is divided into three modules (packages) that are bundled each independently:
- [`packages/main`](packages/main)
Electron [**main script**](https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file).
- [`packages/preload`](packages/preload)
Used in `BrowserWindow.webPreferences.preload`. See [Checklist: Security Recommendations](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content).
- [`packages/renderer`](packages/renderer)
Electron [**web page**](https://www.electronjs.org/docs/tutorial/quick-start#create-a-web-page).

### Build web resources

Packages `main` and `preload` are built in [library mode](https://vitejs.dev/guide/build.html#library-mode) as it is a simple javascript.
`renderer` package build as regular web app.

The build of web resources is performed in the [`scripts/build.js`](scripts/build.js). Its analogue is a sequential call to `vite build` for each package.

### Compile App
Next step is run  packaging and compilation a ready for distribution Electron app for macOS, Windows and Linux with "auto update" support out of the box. 

To do this, using the [electron-builder]:
- In npm script `compile`: This script is configured to compile the application as quickly as possible. It is not ready for distribution, is compiled only for the current platform and is used for debugging.
- In GitHub Action: The application is compiled for any platform and ready-to-distribute files are automatically added to the draft GitHub release. 


### Using Node.js API in renderer
According to [Electron's security guidelines](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content), Node.js integration is disabled for remote content. This means that **you cannot call any Node.js api in the `packages/renderer` directly**. To do this, you **must** describe the interface in the `packages/preload` where Node.js api is allowed:
```ts
// packages/preload/src/index.ts
import {readFile} from 'fs/promises'

// Please considering using ipcMain and ipcRenderer instead
const api = {
  readConfig: () =>  readFile('/path/to/config.json', {encoding: 'utf-8'}),
}

contextBridge.exposeInMainWorld('electron', api)
```

```ts
// source under packages/renderer/

const {readConfig} = window.electron
```

[Read more about Security Considerations](https://www.electronjs.org/docs/tutorial/context-isolation#security-considerations).


### Modes and Environment Variables
All environment variables set as part of the `import.meta`, so you can access them as follows: `import.meta.env`. 

You can also specify types of your environment variables in [`types/vite-env.d.ts`](types/vite-env.d.ts).

The mode option is used to specify the value of `import.meta.env.MODE` and the corresponding environment variables files that needs to be loaded.

By default, there are two modes:
  - `production` is used by default
  - `development` is used by `npm run watch` script

When running building, environment variables are loaded from the following files in your project root:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified env mode
.env.[mode].local   # only loaded in specified env mode, ignored by git
```

**Note:** only variables prefixed with `VITE_` are exposed to your code (e.g. `VITE_SOME_KEY=123`) and `SOME_KEY=123` will not. You can access `VITE_SOME_KEY` using `import.meta.env.VITE_SOME_KEY`. This is because the `.env` files may be used by some users for server-side or build scripts and may contain sensitive information that should not be exposed in code shipped to browsers.



## Contribution

See [Contributing Guide](contributing.md).


[vite]: https://github.com/vitejs/vite/
[electron]: https://github.com/electron/electron
[electron-builder]: https://github.com/electron-userland/electron-builder
[typescript]: https://github.com/microsoft/TypeScript/
[playwright]: https://playwright.dev
[handiwork-github]: https://github.com/handiwork/
[react]: https://github.com/facebook/react
[eslint-plugin-react]: https://github.com/yannickcr/eslint-plugin-react

