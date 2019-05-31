require('./index.css')
const $ = require('jquery')
const defaults = {
  //   widget_selector: ".dragger",
  //   draggable: {
  //   resizeStart:()=>{
  //   },
  //     onResize: datas => {
  //       console.log(datas);
  //     },
  //     onStop: () => {}
  //   },
  //   resizeable: {
  //     onStart: () => {},
  //     onDrag: datas => {
  //       console.log(datas);
  //     },
  //     onStop: () => {}
  //   },
  // click:{
  //   rightClick:()=>{
  //     console.log("右击")
  //   },
  // selectedClick: (id, player) => {
  //   console.log(id, player);
  // }
  // }
};

class Draggle {
  constructor(el, options) {
    this.el = el;
    this.options = Object.assign({}, defaults, options);
    this.scale = options.scale || 1; // 默认缩放为1
    this.widgets = this.options.widgets;
    this.$document = $(document);
    this.$container = $(this.el); // 容器
    this.$player = null; // 选中组件
    this.selectedId = ""; // 选中组件ID
    this.isMoving = false;
    this.isResizing = false;
    this.addWidgets(this.widgets);
    this.init();
  }

  // 初始化拖拽环境
  init() {
    this.$widgets = this.$container.children(this.options.widget_selector);
    this.$resHandles = this.$container.find(this.options.resizeable.handle);
    // 先解绑，避免重复绑定带来的多次触发副作用
    this.$widgets.off();
    this.$resHandles.off();
    this.$document.off();

    // 监听document
    this.$document.on("mousemove", e => {
      if (this.isMoving) {
        const posix = !this.$player ? { x: 0, y: 0 } : this.getWidgetOffset(e);
        this.dragging(posix);
      } else if (this.isResizing) {
        const size = !this.$player ? { w: 100, h: 100 } : this.getWidgetSize(e);
        this.resizing(size);
      }
    });

    this.$document.on("mouseup", e => {
      if (this.isMoving) {
        const posix = this.getWidgetOffset(e);
        this.dragStop(posix);
        this.isMoving = false;
      }
      if (this.isResizing) {
        const size = this.getWidgetSize(e);
        this.resizeStop(size);
        this.isResizing = false;
      }
    });

    this.$widgets.on("contextmenu", e => {
      // 阻止浏览器默认右击事件
      return false;
    });

    this.$widgets.on("mousedown", e => {
      e.stopPropagation();
      // 这里用箭头函数避免this指向被替换（this始终保持指向Draggle实例）
      this.clearPlayer($(e.currentTarget));
      this.setPlayer($(e.currentTarget));
      this.$player.addClass("selected");
      this.el_init_pos = this.get_actual_pos(this.$player);
      this.mouse_init_pos = this.get_mouse_pos(e);
      this.offset_pos = {
        x: this.mouse_init_pos.left - this.el_init_pos.left,
        y: this.mouse_init_pos.top - this.el_init_pos.top
      };
      if (e.button === 0) {
        this.isMoving = true;
        this.dragStart();
      } else if (e.button === 2) {
        this.rightClick();
      }
    });

    this.$resHandles.on("mousedown", e => {
      // 右下角拖拽图标
      e.stopPropagation();
      this.clearPlayer($(e.currentTarget).parent());
      this.setPlayer($(e.currentTarget).parent());
      this.$player.addClass("selected");
      this.isResizing = true;
      this.mouse_init_pos = this.get_mouse_pos(e);
      this.el_init_size = this.get_actual_size(this.$player);
      this.resizeStart();
    });

    this.$container.on("mousedown", e => {
      this.clearPlayer();
    });
  }

  // 清除选中项
  clearPlayer(player) {
    if (this.$player || !player) {
      this.$player.removeClass("selected");
      this.$player = null;
      this.selectedId = "";
      this.options.click.selectedClick.call(this, "", null);
    }
  }

  //获取选中项的id
  setPlayer(player) {
    let selectedID = player.find(".chart").attr("id");
    if (this.selectedId !== selectedID) {
      this.$player = player;
      this.selectedId = player.find(".chart").attr("id");
      this.options.click.selectedClick.call(
        this,
        this.selectedId,
        this.$player
      );
    }
  }

  // 右击事件
  rightClick() {
    if (this.options.click.rightClick) {
      this.options.click.rightClick.call(this);
    }
  }

  // 拖拽开始
  dragStart() {
    if (this.$player === null) {
      return false;
    }
    this.set_limits();
    if (this.options.draggable.onStart) {
      this.options.draggable.onStart.call(this);
    }
  }

  // 拖拽中
  dragging(pos) {
    if (this.$player === null) {
      return false;
    }
    if (this.options.draggable.onDrag) {
      this.options.draggable.onDrag.call(this, pos);
    }
    this.$player.css({
      top: pos.y,
      left: pos.x
    });
  }

  // 拖拽结束
  dragStop(pos) {
    if (this.options.draggable.onStop) {
      this.options.draggable.onStop.call(this, pos);
    }
  }

  // 拉伸开始
  resizeStart() {
    if (this.$player === null) {
      return false;
    }
    if (this.options.resizeable.onStart) {
      this.options.resizeable.onStart.call(this);
    }
  }

  // 拉伸中
  resizing(size) {
    this.$player.css({
      width: size.w,
      height: size.h
    });
    if (this.$player === null) {
      return false;
    }
    if (this.options.resizeable.onResize) {
      this.options.resizeable.onResize.call(this, size);
    }
  }

  // 拉伸结束
  resizeStop(size) {
    if (this.options.resizeable.onStop) {
      this.options.resizeable.onStop.call(this, size);
    }
  }

  // 获取组件的相对容器位置
  getWidgetOffset(e) {
    let x = e.pageX - this.offset_pos.x - this.$container.offset().left;
    let y = e.pageY - this.offset_pos.y - this.$container.offset().top;
    if (x > this.player_max_left) {
      x = this.player_max_left;
    } else if (x <= 0) {
      x = 0;
    }
    if (y > this.player_max_top) {
      y = this.player_max_top;
    } else if (y <= 0) {
      y = 0;
    }
    return { x, y };
  }

  // 获取组件resize尺寸
  getWidgetSize(e) {
    let $container_width = this.$container.width();
    let $container_height = this.$container.height();
    let $container_offset = this.$container.offset();
    let $player_offset = this.$player.offset();
    let _left = this.get_mouse_pos(e).left;
    let _top = this.get_mouse_pos(e).top;
    if (_left > $container_width + $container_offset.left) {
      _left = $container_width + $container_offset.left;
    }
    if (_top > $container_height + $container_offset.top) {
      _top = $container_height + $container_offset.top;
    }
    let _x = _left - this.mouse_init_pos.left;
    let _y = _top - this.mouse_init_pos.top;

    let w = _x + this.el_init_size.width;
    let h = _y + this.el_init_size.height;

    // 判断组件拉伸的宽高是否超出界限
    if (w < 10) {
      w = 10;
    } else if (
      w >
      $container_width + $container_offset.left - $player_offset.left
    ) {
      w = $container_width + $container_offset.left - $player_offset.left;
    }
    if (h < 10) {
      h = 10;
    } else if (
      h >
      $container_height + $container_offset.top - $player_offset.top
    ) {
      h = $container_height + $container_offset.top - $player_offset.top;
    }

    return { w, h };
  }

  // 获取鼠标位置
  get_mouse_pos(e) {
    if (e.originalEvent && e.originalEvent.touches) {
      var oe = e.originalEvent;
      e = oe.touches.length ? oe.touches[0] : oe.changedTouches[0];
    }
    return {
      left: e.pageX,
      top: e.pageY
    };
  }

  // 获取当前组件位置
  get_actual_pos($el) {
    return $el.offset();
  }

  // 获取当前组件的尺寸
  get_actual_size($el) {
    return {
      width: $el.width(),
      height: $el.height()
    };
  }

  // 设置移动范围
  set_limits() {
    const player_width = this.$player.width();
    const player_height = this.$player.height();
    const container_width = this.$container.width();
    const container_height = this.$container.height();
    this.player_max_left = container_width - player_width;
    this.player_max_top = container_height - player_height;
  }

  // 添加组件
  addWidget(widget) {
    this.widgets[widget.id] = widget;
    const { top, left, width, height } = widget;
    let widgetDom = `<div class="dragger" id=${
      widget.id
      } style="top:${top}px;left:${left}px;width:${width}px;height:${height}px;"><div class="chart" id="chart_${
      widget.id
      }"></div> <span class="resize-handle" /></div>`;
    this.$container.append(widgetDom);
    this.init();
  }

  /**
   * @param {object} widgets  组件参数
   **/
  addWidgets(widgets) {
    for (let key in widgets) {
      this.addWidget(widgets[key]);
    }
  }

  // 删除组件
  removeWidegt(id) {
    delete this.widgets[id];
    this.$container.children(`#${id}`).remove();
    this.init;
  }

  // 获取全部的组件
  getWidgets() {
    return this.widgets;
  }
}

export default Draggle;