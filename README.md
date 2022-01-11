# wendigo_runtime

最后的温迪戈3的专用运行时

## 目的 - 重写显示层

基于vue开发全新的地图显示层

## 认怂

目前录像仅涉及地图移动，为工期考虑，地图绘制api仍为内核调用外部，且仍然以画布形式呈现，因此不需要修改现有的模块代码

事件模块同样为内部调起外部，因此会保留现有的内核框架，但是会去掉重写功能（已经彻底性重写了）

## 硬刚

音频及存储相关的代码，由于强耦合UI，考虑重构

filereader以及其他读写类UI也需要重构

与网站交互的SDK也需要分离

图像资源由外部管理

## 模块结构

public/
    main.js 标准运行时入口
    project/ 工程资源
    libs/ 标准运行时库文件
src/
    main.ts 专用运行时入口
    env.d.ts 环境定义
    constant.ts 常量
    view/
        main/ 主视图 包含地图和状态栏
        layers/
            loading/ 加载视图
            title/ 标题视图
            book/ 手册
            save/ 存档
            setting/ 设置
            event/ 事件
            browser/ 浏览地图
        App.vue 视图主容器
        view.ts 视图管理器
        keyboard.ts 键盘控制器
        resizer.ts 缩放控制
    modules/
        menifest/ 资源清单
        preloader/ 预加载器
        websiteSDK/ 与网站交互的套件
        audio/
            BGMplayer.ts BGM播放器
            SEplayer.ts SE播放器
        storage/ 存储管理
            config.ts 配置管理
            storage.ts 存档管理
        
    core/

## 数据流

内部大量使用响应式API来存储数据及完成监听逻辑

## 视图层概要

基于dom-Vue技术栈完成

### resizer 缩放器

整个视图的缩放依靠`rem`的调整来实现

resizer模块允许用户设置一个最大的缩放比例，缩放的实际比例为`min(用户设置的最大缩放比例，窗口允许的最大缩放比例)`

用户可以在设置界面自行调整这一比例，这一设置将被持久化，特别的，该配置的默认值为 1

```ts
class Resizer {
    /**
     * 获取当前的实际缩放比例的只读代理 
     */
    getRealRatio(): Ref<number>

    /**
     * 获取窗口允许的最大缩放比例的只读代理 
     */
    getMaxVaildRatio(): Ref<number>

    /**
     * 获取用户设置的最大缩放比例的只读代理 
     */
    getExpectRatio(): Ref<number>

    /**
     * 设置最大缩放比例
     */
    setExpectRatio(ratio: number): void
}
```

### view 视图控制器

视图的核心概念 - 视图栈

每一个视图被调用时都会叠加在之前的视图上方，这个操作

```ts
class ViewManager {
    async push(view: VueComponent): any
}
```

### keyboard 键盘控制器

键盘控制器使用类似于视图层的栈式结构，视图可以向键盘控制器申请键盘监听器，一个监听器激活后，之前的监听器会失效，而在该监听器失焦后，先前的监听器会自动重新获得焦点

```ts
class KeyboardListener {

    constructor(actions: Action[]): void 

    /**
     * 锁定监听器
     */
    lock(): void
    
    /**
     * 解锁监听器
     */
    unlock(): void
    
    /**
     * 聚焦监听器
     */
    focus(): void
    
    /**
     * 监听器失焦
     */
    blur(): void
}
```

### main 主视图

#### mapview 地图

- 提供基础api，用于申请canvas，绑定到内核指定接口上，具体绘制由内部实现

@todo 后续尝试进行高阶的抽象

```ts
class MapHost {
    createCanvas();
    removeCanvas();
    getCanvas();
    relocateCanvas();
}
```

#### statusbar 状态栏

- 提供基础api，包括弹出提醒和显隐/更新状态栏，绑定到内核指定接口上

```ts
class StatusBarHost {
    showTip();
    show();
    hide();
    update();
}
```

### loading 加载界面

显示资源的加载情况

 - 不包括核心文件——本运行时的代码部分会整体打包
 - 从preloader模块获取资源加载情况
 - 资源加载完毕后会自动关闭
 - 还在设计中

### title 标题界面

 - 支持键鼠操作
 - 包含难度选择界面
 - 游戏结束时会重新调用

### book 手册

 - 还在设计中

### save 存档

分为存-读档两块，但是技术类似因此并在一起

 - 不实现存档笔记
 - 注意到屏幕非常宽，可以考虑增加同屏存档数量，或者增加别的一些功能（似乎可以一页8个
 - 还在设计中

### browser 浏览地图

 - 有单独的canvas
 - 注意到屏幕非常宽，因此可以做小地图等功能

### setting 设置

 - 注意到，，，，总之可以做二级菜单，甚至多级菜单
 - 支持键鼠操作，因此要注意焦点在多级菜单间的转换

### event 事件

重头戏，很多不好搞的内容，以及要适配的内容

 - 还是注意到屏幕宽了，显示图片事件也许要重新设置坐标

 - 对话框得重写，

## 模块概要

### 网站SDK

包含上传游玩信息，成绩信息，以及存档的分享功能

### 音频

- 提供基础api，包括播放音乐，绑定到内核指定接口上

### 存储

## 内核概要

 - 会尽量保持和标准运行时的api兼容，目的是复用function.js 和 plugin.js
    以下列出function.js中各函数的复用情况
     - events
        resetGame: 修改后复用（去掉dom操作）
        win: 不复用
        lose: 不复用
        changingFloor: 复用
        afterChangeFloor: 复用
        flyTo: 不复用 // 涉及到UI操作，需要特殊方案兼容，但 wdg3 无楼传
        beforeBattle: 复用
        afterBattle: 复用
        afterGetItem: 复用
        afterPushBox: 复用
     - enemys
        getSpecials: 复用
        getEnemyInfo: 复用
        getDamageInfo: 复用
     - actions // 交互部分全部重写
        onKeyUp: 不复用
        onStatusBarClick: 不复用
     - control
        saveData: 复用
        loadData: 复用
        getStatusLabel: 复用
        triggerDebuff: 复用
        updateStatusBar: 不复用
        updateCheckBlock: 复用
        moveOneStep: 复用
        moveDirectly: 复用
        parallelDo: 复用
     - ui // ui部分全部重写
        drawStatusBar: 不复用
        drawStatistics: 复用 // 实质上是统计方面的api
        drawAbout: 不复用
    plugin.js 则不强制要求，能用则用，不能用则重新开发所需插件

- 部分功能会采用保留api签名，但具体实现为转发给外部api的方法实现

- UI方面的函数会直接剥离

- utils 保留以进行兼容，但是在编写新代码时不使用其中函数
