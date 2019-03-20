### Draggleble.js

> a simple draggleble layout

#### 功能列表

- 组件的添加删除
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
        rightClick: () => {
          console.log("右击");
        }
      }
    });
```
#### 一个简单的可拉伸拖拽画布
![画布](https://github.com/song111/Draggleble.js/blob/master/public/image/%E7%94%BB%E5%B8%83.gif)
