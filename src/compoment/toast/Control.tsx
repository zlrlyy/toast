// Control是Toast父组件，容器
// 是动态插入和删除DOM节点的核心
// 同时也向上暴露给index重写改变自己的方法
import {
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import Toast, { ToastProps } from './Toast';

export interface ControlProps extends ToastProps {
  isSameContent?: boolean;
}
const Control = (props: any, ref: any) => {
  const [toasts, setToasts] = useState<ToastProps | null>();
  const timerRef = useRef<any>();

  const add = (toasts: ControlProps) => {
    // 添加toast
    setToasts({ ...toasts });
    timerRef.current && clearTimeout(timerRef.current);
    if (!toasts.isSameContent) {
      remove();
    }
    timerRef.current = setTimeout(() => remove(), toasts.duration);
  };

  const remove = () => {
    setToasts(null);
  };
  useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);
  const getToastDOM = useMemo(() => {
    if (toasts) {
      const closeCallback = () => {
        remove();

        // 如果有用户传入的onClose 执行
        if (toasts.onClose) toasts.onClose();
      };

      return <Toast {...toasts} onClose={closeCallback} />;
    }
    return null;
  }, [toasts]);

  useImperativeHandle(ref, () => ({
    add,
    remove,
    toasts,
  }));
  return (
    <div>
      {/*{maskDOM}*/}
      {getToastDOM}
    </div>
  );
};

export default forwardRef(Control);
