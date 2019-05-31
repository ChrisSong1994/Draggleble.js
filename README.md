### Draggleble.js

> a simple draggleble layout

####  使用 Draggleble
```javascript
sudo npm install draggleble --save
``` 


#### 功能列表

- 组件的添加删除
- 组件选中和取消
- 组件的右键事件
- 组件拖拽和拉伸

#### Draggleble 用法

```javascript
    import Draggle from 'draggleble'
    const el = document.queryselector('#wrap');
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

> 注意：example 里面的 draggleble.js 包含了 jquery 打包的代码，假如需要纯 draggleble.js 代码，需要自己配置 webpack 代码分块打包

