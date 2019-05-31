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
        onStart: (id, size) => {
          console.log(id, size, 'resize start');
        },
        onResize: (id, size) => {
          console.log(id, size, 'resizing');
        },
        onStop: (id, size) => {
          console.log(id, size, 'resize end');
        },
      },
      draggable: {
        onStart: (id, pos) => {
          console.log(id, pos, 'move start');
        },
        onDrag: (id, pos) => {
          console.log(id, pos, 'moving');
        },
        onStop: (id, pos) => {
          console.log(id, pos, 'move end');
        }
      },
      click: {
         rightClick: (id) => {
          console.log("右击", id)
        },
        selectedClick: (id, player) => {
          console.log(id, player)
        }
      }
    });
```

> 注意：example 里面的 draggleble.js 包含了 jquery 打包的代码，假如需要纯 draggleble.js 代码，需要自己配置 webpack 代码分块打包

