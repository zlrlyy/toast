import Control from './Control';
import ReactDOM from 'react-dom';
import React, { RefObject } from 'react';
import { ControlProps } from './Control';
import './index.css';
// Toast组件比较特殊
// 因为<Toast />不会被直接渲染在DOM中
// 而是动态插入页面中
// Toast组件核心就是通过Control暴露的重写方法 动态改变Control
let ref: RefObject<any> = React.createRef();
const createDom = () => {
  let myToastDiv = document.getElementById('my-mobile-toast');

  if (!myToastDiv) {
    myToastDiv = document.createElement('div');
    myToastDiv.setAttribute('id', 'my-mobile-toast');
    document.body.appendChild(myToastDiv);
  }

  ReactDOM.render(<Control ref={ref} />, myToastDiv);
  return {
    toast(propsProps: ControlProps) {
      ref.current?.add?.(propsProps);
    },
    removeToast() {
      ref.current?.remove?.();
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(myToastDiv!);
      document.body.removeChild(myToastDiv!);
    },
  };
};

// toast方法实际上就是集合参数 完成对Control的改变
const toast = (content: any, duration = 3000, onClose: any) => {
  if (!content) return;
  let isSameContent = false;
  //第一次提交或者提交内容一致
  if (!ref.current?.toasts?.content || ref.current?.toasts?.content === content)
    isSameContent = true;
  let controlInstance = createDom();

  controlInstance.toast({
    duration,
    isSameContent,
    content,
    onClose: () => {
      if (onClose) onClose();
    },
  });
};

export default {
  info(content: any, duration: number, onClose: any = () => { }) {
    return toast(content, duration, onClose);
  },
  //删除dom
  hide() {
    const dom = createDom();
    dom.destroy();
  },
};
