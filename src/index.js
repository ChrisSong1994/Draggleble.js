
import Draggle from "components/draggleble";
import { generateUUID } from "src/utils";

const widgets = {
  "80204546": {
    id: "80204546",
    left: 50,
    top: 50,
    width: 100,
    height: 100,
    content: `<b>组件1</b>`
  }
};

window.onload = () => {
  const $el = document.querySelector('.content-wrap')
  const $add_btn = document.querySelector('.add_btn')
  const $delete_btn = document.querySelector('.delete_btn')

  window.draagle = new Draggle($el, {
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

  $add_btn.addEventListener('click', addWidget)
  $delete_btn.addEventListener('click', deleteWidget)

  // 添加组件
  function addWidget() {
    window.draagle.addWidget({
      id: generateUUID(),
      left: 50,
      top: 50,
      width: 100,
      height: 100
    });
  }

  // 删除组件
  function deleteWidget() {
    let id = window.draagle.selectedId
    window.draagle.removeWidegt(id)
  }

}
