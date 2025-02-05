# AynaLivePlayer OBS Info
[English](README.md) | [简体中文](doc/README_cn.md)

This project is developed by Vue 3 in Vite.
It's a web interface for AynaLivePlayer. The connection to Player is via WebSocket protocol. You can deploy this project on your localhost to get a Liveroom Player UI in a BiliBili living. Also, you can use our deployed web interface instead. 

Link: https://obsinfo.biliaudiobot.com/ 



## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

[WebStorm](https://www.jetbrains.com/webstorm/) (Free for non-commercial use)


## Project Setup

### Install Node.js

You can download the installation from [Node.js](https://nodejs.org/) project site.

If you want to deploy the project on a Linux platform, you also can use [NVM](https://nvm.p6p.net/) to manage multiple Node.js versions.

### Install pnpm
After installation of Node, you can install PNPM globally by following command.
```sh
npm install pnpm -g
```

If your OS is Windows 10/11, you may receive a warning from PowerShell like this:
```text
cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170
```

You can resolve this problem by following command in PowerShell:
```sh
set-ExecutionPolicy RemoteSigned
```

### Install Preset Environment of Project
```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

## Development Guidelines

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
