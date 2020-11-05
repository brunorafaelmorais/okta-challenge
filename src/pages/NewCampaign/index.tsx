import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { ContainerButtons, ContainerField, Container } from './styles';

const CustomPicker = ({ value, onClick }: any) => (
  <Button onClick={onClick}>{value || 'Choose date range'}</Button>
);

const NewCampaign: React.FC = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  const handleChangePicker = useCallback(dates => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
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

        <ContainerField>
          <DatePicker
            selected={startDate}
            onChange={handleChangePicker}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            shouldCloseOnSelect={false}
            customInput={<CustomPicker />}
          />
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
