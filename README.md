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

***初始化画布***
```javascript
    import Draggle from 'draggleble'

   // 传入组件id,宽高和位置信息
    const widgets = {
     '12345678': {
        id: "12345678", 
        left: 50,   
        top: 50,    
        width: 100,
        height: 100,
        content: `<b>组件1</b>`
     }
   };

   // 初始化画布
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

***添加/删除组件***
```javascript
// 添加组件
  addWidget() {
    this.draagle.addWidget(
       {
        id: id,
        left: 50,
        top: 50,
        width: 100,
        height: 100,
        content: `<b>组件1</b>`
      }
    );
  }

  // 删除组件
  deleteWidget() {
    let id = this.draagle.selectedId
    this.draagle.removeWidegt(id)
  }
```

 **注意：example 里面的 draggleble.js 包含了 jquery 打包的代码，假如需要纯 draggleble.js 代码，需要自己配置 webpack 代码分块打包，假如有类似需求可以自行修改源码。**

