import { ReactNode } from 'react';
import './index.css';
export interface ToastProps {
  content: ReactNode | string;
  onClose?(): void;
  duration?: number;
  key?: string;
}
const Toast: React.FC<ToastProps> = ({ content }) => {
  return (
    <div className={'tips-toast-box'}>
      <div className={'tips-toast-content'}>{content}</div>
    </div>
  );
};
export default Toast;
