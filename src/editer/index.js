import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import "./index.css";
import Draggle from "components/draggleable";

// console.log(typeof React); // object

const widgets = {
  "80204546": {
    left: 50,
    top: 50,
    width: 100,
    height: 100
  }
};

class Editer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const el = findDOMNode(this.refs.wrap);
    this.draagle = new Draggle(el, {
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
      }
    });
  }


  render() {
    return (
      <div ref="wrap" className="content-wrap">
        <div
          className="dragger"
          style={{ background: "blue", width: 100, height: 100 }}
        >
          <span className="resize-handle" />
        </div>
        <div
          className="dragger"
          style={{ background: "blue", width: 100, height: 100 }}
        >
          <span className="resize-handle" />
        </div>
      </div>
    );
  }
}
export default Editer;
