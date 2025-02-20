# AynaLivePlayer OBS Web直播界面

该项目由Vue3结合Vite开发。

该项目给AynaLivePlayer提供了一个web界面。与播放器的连接通过WebSocket协议完成。如果你需要B站直播，你可以通过在本地部署该项目以获得一个简单的直播播放器界面。你也可以通过我们部署好的线上服务界面来进行直播。

链接： https://obsinfo.biliaudiobot.com/



## 推荐的IDE开发环境

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) （并且禁用Vetur）

[WebStorm](https://www.jetbrains.com/webstorm/) （对非商业用途免费）


## 项目安装

### 安装Node.js

你可以在[Node.js](https://nodejs.org/)的官网下载到安装包。

如果你在一个Linux环境中部署该项目，你可以使用[NVM](https://nvm.p6p.net/)进行Node.js多版本管理。

### 安装PNPM
在Node.js安装完毕后，你可以通过如下命令安装pnpm：
```sh
npm install pnpm -g
```

如果你的系统是Window10/11，你有可能会收到PowerShell发出如下报错：
```text
因为在此系统中禁止执行脚本。有关详细信息，请参阅 "get-help about_signing"。
```

你可以在PowerShell中输入如下命令解决该报错：
```sh
set-ExecutionPolicy RemoteSigned
```

### 安装项目前置环境
```sh
pnpm install
```

### 运行开发热更模式

```sh
pnpm dev
```

### 进行生产环境打包

```sh
pnpm build
```

## 开发指引

### 项目中向TS中导入`.vue`的类型支持

TypeScript默认无法处理`.vue`中导入的类型信息, 所以该项目用`vue-tsc`替代了`tsc`进行类型检查。 在VSCode中，需要[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)插件来使TS可以识别`.vue`类型。

### Vite项目自定义配置

参见[Vite配置参考](https://vitejs.dev/config/)。
