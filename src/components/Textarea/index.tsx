import { useField } from '@unform/core';
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Container, Label } from './styles';
import { TypoBody2 } from '../Typography';
import FieldError from '../FieldError';

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
}

const Textarea: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <>
      {label && (
        <Label htmlFor={fieldName}>
          <TypoBody2>{label}</TypoBody2>
        </Label>
      )}
      <Container isFilled={isFilled} isFocused={isFocused} hasError={!!error}>
        <textarea
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          defaultValue={defaultValue}
          id={fieldName}
          {...rest}
        />
      </Container>
      {error && <FieldError text={error} />}
    </>
  );
};

export default Textarea;
