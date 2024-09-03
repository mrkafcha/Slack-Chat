import { Formik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../api/auth';
import { appPaths } from '../routes';
import useAuth from '../hooks';

const Login = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const handleFormSubmit = async (values, { setErrors }) => {
    const { nickname, password } = values;
    const user = {
      username: nickname,
      password,
    };
    const { data, error } = await login(user);
    if (data) {
      logIn(data.token, nickname);
      navigate(appPaths.home());
    }
    if (error) {
      switch (error.status) {
        case 401: {
          setErrors({ password: t('form.errors.password') });
          break;
        }
        case 'FETCH_ERROR': {
          toast.error(t('toast.errorNetwork'));
          break;
        }
        default: {
          setErrors({ password: t('form.errors.password') });
        }
      }
    }
  };
  return (
    <div className="container-fluid m-auto ">
      <Col className="row justify-content-center align-content-center ">
        <Card
          className="m-5 w-50 p-5 background"
          style={{
            maxWidth: '500px', minWidth: '250px', background: '#831d0b', borderRadius: '50px',
          }}
        >
          <Card.Header as="h1" className="text-center text-white m-2 border-1 flex-nowrap">
            {t('loginPage.title')}
          </Card.Header>
          <Card.Body className="justify-content-center">
            <Formik
              initialValues={{ nickname: '', password: '' }}
              onSubmit={handleFormSubmit}
            >
              {({
                handleSubmit, handleChange, values, errors,
              }) => (
                <Form onSubmit={handleSubmit} className="form">
                  <Form.Group className="text-white mb-2">
                    <Form.Label htmlFor="nickname">{t('loginPage.nickname')}</Form.Label>
                    <Form.Control className=" border-0" style={{ background: '#dad5b5' }} id="nickname" required value={values.nickname} onChange={handleChange} type="text" name="nickname" isInvalid={!!errors.password} autoFocus />
                  </Form.Group>
                  <Form.Group className="text-white mb-5">
                    <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
                    <Form.Control className=" border-0" style={{ background: '#dad5b5' }} id="password" required value={values.password} onChange={handleChange} type="password" name="password" isInvalid={!!errors.password} />
                    <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="w-100 border-0"
                    style={{
                      color: '#831d0b', background: '#dad5b5', borderRadius: '50px', borderColor: 'none',
                    }}
                    variant="outline-primary"
                  >
                    {t('loginPage.button')}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
          <Card.Footer className="text-center text-white">
            <div className="text-center">
              <span>{t('loginPage.footer.text')}</span>
              <br />
              <Link to={appPaths.signup()}>{t('loginPage.footer.link')}</Link>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </div>
  );
};

export default Login;
