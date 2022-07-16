# 脚手架使用说明

本脚手架用于搭建一个以webpack5相对成熟的配置来生成的一个关于vue插件的项目基础工程。

## 准备环境

* nodejs
* yarn(执行npm install -g yarn安装)
* yo(执行npm install -g yo安装)

## 全局初始命令

以下命令仅需第一次使用本脚手架前运行一次.

```bash
yarn global add generator-wp5-plugin-cli
```

也可以直接克隆该项目，通过yarn link的方式链接到全局
```bash
yarn

yarn link
```

## 生成项目

使用该脚手架生成项目。

```bash
yo wp5-plugin-cli
```

## 注意事项

* Windows下运行`yo wp5-plugin-cli`命令时只能在`cmd`或`PowerShell`下运行, 不可以在`git bash`, `CygWin`类型的shell等下运行. 否则会出现上下键不可用的问题.

## 更新本地脚手架

如需要更新脚手架, 仅需要运行以下命令即可

```bash
yarn global remove generator-wp5-plugin-cli
yarn global add generator-wp5-plugin-cli
```