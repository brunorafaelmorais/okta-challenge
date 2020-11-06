import React, { useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { ContainerButtons, ContainerField, Container } from './styles';
import Layout from '../../components/Layout';
import TitlePage from '../../components/TitlePage';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import GoBack from '../../components/GoBack';

interface ParamTypes {
  id: string;
}

const NewAction: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const { id } = useParams<ParamTypes>();

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required(),
          description: Yup.string().required(),
          dateBegin: Yup.string().required('initial date is a required field'),
          dateEnd: Yup.string().required('final date is a required field'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        reset();
        console.log(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: 'Error',
            description: 'Fill in the highlighted fields',
          });

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
    <Layout title="Infinity War Campaign">
      <Container>
        <GoBack />
        <TitlePage text="New Action" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <ContainerField>
            <Input name="title" label="Title" />
          </ContainerField>

          <ContainerField>
            <Textarea name="description" label="Description" />
          </ContainerField>

          <ContainerField dateRange>
            <div>
              <Input type="date" name="dateBegin" label="Initial date" />
            </div>
            <div>
              <Input type="date" name="dateEnd" label="Final date" />
            </div>
          </ContainerField>

          <ContainerButtons>
            <Button onClick={handleResetForm} outlined>
              Cancel
            </Button>
            <Button type="submit">Create campaign</Button>
          </ContainerButtons>
        </Form>
      </Container>
    </Layout>
  );
};

export default NewAction;
