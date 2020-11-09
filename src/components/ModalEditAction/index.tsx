import React, { useCallback, useRef } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { CampaignAction } from '../../models/CampaignAction';
import Modal, { ModalProps } from '../Modal';
import { ContainerButtons, ContainerField, Container } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import Input from '../Input';
import GoBack from '../GoBack';
import TitlePage from '../TitlePage';
import Textarea from '../Textarea';
import Button from '../Button';

interface ModalEditActionProps extends ModalProps {
  handleUpdateAction: (action: CampaignAction) => void;
  editingAction: CampaignAction;
}

type FormData = CampaignAction;

const ModalEditAction: React.FC<ModalEditActionProps> = ({
  isOpen,
  editingAction,
  setIsOpen,
  handleUpdateAction,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async data => {
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

        handleUpdateAction(data);
        setIsOpen();
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
    [addToast, handleUpdateAction, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <GoBack />
        <TitlePage text="Edit Action" />
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingAction}>
          <ContainerField>
            <Input name="title" label="Title" />
          </ContainerField>

          <ContainerField>
            <Textarea name="description" label="Description" />
          </ContainerField>

          <ContainerField dateRange>
            <div>
              <Input type="date" name="dateBegin" label="Start date" disabled />
            </div>
            <div>
              <Input type="date" name="dateEnd" label="End date" disabled />
            </div>
          </ContainerField>

          <ContainerButtons>
            <Button onClick={() => setIsOpen()} outlined>
              Cancel
            </Button>
            <Button type="submit">Save action</Button>
          </ContainerButtons>
        </Form>
      </Container>
    </Modal>
  );
};

export default ModalEditAction;
