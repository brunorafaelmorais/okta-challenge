import React, { useEffect } from 'react';

import { FiX } from 'react-icons/fi';
import { MdCheckCircle, MdError, MdInfo, MdWarning } from 'react-icons/md';

import * as S from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface Toastprops {
  message: ToastMessage;
  style: object;
}

const icons = {
  success: <MdCheckCircle size={24} />,
  error: <MdError size={24} />,
  info: <MdInfo size={24} />,
  warning: <MdWarning size={24} />,
};

const Toast: React.FC<Toastprops> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <S.Container key={message.id} type={message.type} style={style}>
      {icons[message.type || 'info']}
      <div className="content">
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <FiX onClick={() => removeToast(message.id)} size={20} />
    </S.Container>
  );
};

export default Toast;
