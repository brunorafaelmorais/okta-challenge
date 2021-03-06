import React, { useCallback, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { ContainerButtons, ContainerField, Container } from './styles';
import Layout from '../../components/Layout';
import TitlePage from '../../components/TitlePage';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import GoBack from '../../components/GoBack';
import { useToast } from '../../hooks/toast';
import { useCampaign } from '../../hooks/campaign';
import isValidRangeDate from '../../utils/validadeRangeDate';

interface ParamTypes {
  id: string;
}

interface FormData {
  title: string;
  description: string;
  dateBegin: string;
  dateEnd: string;
}

const NewAction: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const {
    campaign: { actions },
    updateCampaign,
  } = useCampaign();

  const { id } = useParams<ParamTypes>();
  const history = useHistory();

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async (data, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required(),
          description: Yup.string().required(),
          dateBegin: Yup.string().required('start date is a required field'),
          dateEnd: Yup.string().required('end date is a required field'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!isValidRangeDate(data.dateBegin, data.dateEnd)) {
          addToast({
            type: 'warning',
            title: 'Warning',
            description: 'End date cannot be less than the start date.',
          });

          return;
        }

        const payloadActions = [...actions, data];

        await updateCampaign(id, { actions: payloadActions });

        reset();
        history.push(`/campaigns/${id}`);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: 'Error',
            description: 'Fill in the highlighted fields',
          });
        }
      }
    },
    [addToast, actions, history, id, updateCampaign],
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
              <Input type="date" name="dateBegin" label="Start date" />
            </div>
            <div>
              <Input type="date" name="dateEnd" label="End date" />
            </div>
          </ContainerField>

          <ContainerButtons>
            <Button onClick={handleResetForm} outlined>
              Cancel
            </Button>
            <Button type="submit">Create action</Button>
          </ContainerButtons>
        </Form>
      </Container>
    </Layout>
  );
};

export default NewAction;
