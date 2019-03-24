### Draggleble.js

> a simple draggleble layout

#### 启动 Draggleble

`npm install`
`npm run start`
然后访问 9000 端口

#### 功能列表

- 组件的添加删除
- 组件选中和取消
- 组件的右键事件
- 组件拖拽和拉伸

#### Draggleble 用法

```
 const el = findDOMNode(this.refs.wrap);
    window.draagle = this.draagle = new Draggle(el, {
      widgets: widgets,
      widget_selector: ".dragger",
      resizeable: {
        handle: ".resize-handle",
        onStart: () => {
          console.log("start resizing");
        },
        onResize: datas => {
          console.log(datas);
        },
        onStop: () => {
          console.log("stop resizing");
        }
      },
      draggable: {
        onStart: () => {
          console.log("start moving");
        },
        onDrag: datas => {
          console.log(datas);
        },
        onStop: datas => {
          console.log("stop moving", datas);
        }
      },
      click: {
        rightClick: () => {   // 组件右键事件
          console.log("右击");
        },
        selectedClick:(id,player)=>{  // 组件的选中
          console.log(id,player)
        }
      }
    });
```

> 注意：dist 里面的 draggleble.js 包含了 loadsh 和 jquery 打包的代码，假如需要纯 draggleble.js 代码，需要自己配置 webpack 代码分块打包

#### 一个简单的可拉伸拖拽画布

![画布](https://github.com/song111/Draggleble.js/blob/master/public/image/%E7%94%BB%E5%B8%83.gif)
