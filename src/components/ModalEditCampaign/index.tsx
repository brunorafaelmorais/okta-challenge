import React, { useCallback, useEffect, useRef } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormDataCampaign } from '../../pages/NewCampaign';
import Modal, { ModalProps } from '../Modal';
import { ContainerButtons, ContainerField, Container } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import Input from '../Input';
import TitlePage from '../TitlePage';
import Textarea from '../Textarea';
import Button from '../Button';
import isValidRangeDate from '../../utils/validadeRangeDate';

export type EditingCampaignFormData = Omit<FormDataCampaign, 'imgUrl'>;

interface ModalEditCampaignProps extends ModalProps {
  handleUpdateCampaign: (campaign: EditingCampaignFormData) => void;
  editingCampaign: EditingCampaignFormData;
}

const ModalEditCampaign: React.FC<ModalEditCampaignProps> = ({
  isOpen,
  editingCampaign,
  setIsOpen,
  handleUpdateCampaign,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  useEffect(() => {
    formRef.current?.setData(editingCampaign);
  }, [editingCampaign]);

  const handleSubmit: SubmitHandler<EditingCampaignFormData> = useCallback(
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

        if (!isValidRangeDate(data.dateBegin, data.dateEnd)) {
          addToast({
            type: 'warning',
            title: 'Warning',
            description: 'End date cannot be less than the start date.',
          });

          return;
        }

        handleUpdateCampaign(data);

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
    [addToast, handleUpdateCampaign, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <TitlePage text="Edit Campaign" />
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={editingCampaign}
        >
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
            <Button onClick={() => setIsOpen()} outlined>
              Cancel
            </Button>
            <Button type="submit">Save campaign</Button>
          </ContainerButtons>
        </Form>
      </Container>
    </Modal>
  );
};

export default ModalEditCampaign;
