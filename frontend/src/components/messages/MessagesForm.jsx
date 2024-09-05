import { useSelector } from 'react-redux';
import * as filter from 'leo-profanity';
import Button from 'react-bootstrap/esm/Button';
import { Form, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAddMessageMutation } from '../../api/messages';

const MessagesForm = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const username = useSelector((state) => state.app.username);
  const [addMessage, { error }] = useAddMessageMutation();

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    const { message } = values;
    const data = {
      message: filter.clean(message),
      channelId: currentChannelId,
      username,
    };
    await addMessage(data);
    resetForm();

    if (error) {
      toast.error(t('toast.errorMessage'));
      throw error;
    }
    setSubmitting(false);
  };

  return (
    <div className="mt-auto py-3 px-5 ">
      <Formik initialValues={{ message: '' }} onSubmit={handleFormSubmit}>
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit} className="py-1 border-0 rounded-2">
            <InputGroup className="input-group has-validation">
              <Form.Control className=" p-0 ps-2" required placeholder={t('form.placeholders.message')} autoFocus id="new-message" aria-label={t('form.labels.newMessage')} value={values.message} onChange={handleChange} type="text" name="message" />
              <Button className="border-0 bg-red-brown" type="submit">
                {t('form.buttons.submit')}
              </Button>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessagesForm;
