import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import Draggle from "components/draggleble";
import { generateUUID } from "src/utils";

// console.log(typeof React); // object

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

class Editer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const el = findDOMNode(this.refs.wrap);
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
  }

  // 添加组件
  addWidget() {
    this.draagle.addWidget({
      id: generateUUID(),
      left: 50,
      top: 50,
      width: 100,
      height: 100
    });
  }

  // 删除组件
  deleteWidget() {
    let id = this.draagle.selectedId
    this.draagle.removeWidegt(id)
  }


  render() {
    return (
      <div>
        <div className="tool">
          <button onClick={this.addWidget.bind(this)}>添加</button> <br />
          <button onClick={this.deleteWidget.bind(this)}>删除</button>
        </div>
        <div ref="wrap" className="content-wrap" />
      </div>
    );
  }
}
export default Editer;
