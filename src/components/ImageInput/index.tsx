import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { useField } from '@unform/core';
import { MdAddAPhoto } from 'react-icons/md';

import { Container, AddImage, Error, Label } from './styles';
import { TypoBody2, TypoCaption } from '../Typography';

interface Props {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const ImageInput: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue);

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreview(null);

      return;
    }

    const previewURL = URL.createObjectURL(file);

    setPreview(previewURL);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && (
        <Label>
          <TypoBody2>{label}</TypoBody2>
        </Label>
      )}
      <Container htmlFor={fieldName} hasError={!!error}>
        <div>
          {!preview && (
            <AddImage>
              <MdAddAPhoto size={50} />
            </AddImage>
          )}
          {preview && <img src={preview} alt="Preview" />}
        </div>
        <input
          id={fieldName}
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={handlePreview}
          {...rest}
        />
      </Container>
      {error && (
        <Error>
          <TypoCaption>{error}</TypoCaption>
        </Error>
      )}
    </>
  );
};

export default ImageInput;
