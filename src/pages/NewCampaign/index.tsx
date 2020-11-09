import React, { useCallback, useRef } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { ContainerButtons, ContainerField, Container } from './styles';
import Layout from '../../components/Layout';
import ImageInput from '../../components/ImageInput';
import TitlePage from '../../components/TitlePage';
import GoBack from '../../components/GoBack';
import { useCampaign } from '../../hooks/campaign';

interface FormData {
  imgUrl: File;
  title: string;
  description: string;
  dateBegin: string;
  dateEnd: string;
}

const NewCampaign: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const { addToast } = useToast();
  const { createCampaign } = useCampaign();

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async (data, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          imgUrl: Yup.string().required('image is a required field'),
          title: Yup.string().required(),
          description: Yup.string().required(),
          dateBegin: Yup.string().required('initial date is a required field'),
          dateEnd: Yup.string().required('final date is a required field'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await createCampaign(data);

        reset();
        history.push('/campaigns');
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
    [addToast, createCampaign, history],
  );

  const handleResetForm = useCallback(() => {
    formRef.current?.reset();
    formRef.current?.setErrors({});
  }, []);

  return (
    <Layout title="Infinity War Campaign">
      <Container>
        <GoBack url="/campaigns" />
        <TitlePage text="Let's get started" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <ContainerField>
            <ImageInput name="imgUrl" label="Image" />
          </ContainerField>

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

export default NewCampaign;
