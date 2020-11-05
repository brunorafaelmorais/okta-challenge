import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { ContainerButtons, ContainerField, Container } from './styles';

const NewCampaign: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required(),
          description: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Error',
          description: 'Bad request',
        });
      }
    },
    [addToast],
  );

  const handleResetForm = useCallback(() => {
    formRef.current?.reset();
    formRef.current?.setErrors({});
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <ContainerField>
          <Input name="title" label="Title" />
        </ContainerField>

        <ContainerField>
          <Textarea name="description" label="Description" />
        </ContainerField>

        <ContainerButtons>
          <Button onClick={handleResetForm} outlined>
            Cancel
          </Button>
          <Button type="submit">Create campaign</Button>
        </ContainerButtons>
      </Form>
    </Container>
  );
};

export default NewCampaign;
