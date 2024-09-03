import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useSignupMutation } from '../api/auth';
import { setUserData } from '../store/slices/appSlice';
import { appPaths } from '../routes';
import useAuth from '../hooks';

const Signup = () => {
    const { t } = useTranslation();
    const { logIn } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signup] = useSignupMutation();
    const signupSchema = Yup.object().shape({
        nickname: Yup.string().required(t('form.errors.required')).min(3, t('form.errors.range')).max(20, t('form.errors.range')),
        password: Yup.string().required(t('form.errors.required')).min(6, t('form.errors.min')),
        passwordConfirm: Yup.string().required(t('form.errors.required')).oneOf([Yup.ref('password'), null], t('form.errors.passwordMustMatch')),
    });
    const handleFormSubmit = async (values, { setErrors }) => {
        const { nickname, password } = values;
        const user = {
            username: nickname,
            password,
        };
        const { data, error } = await signup(user);
        if (data) {
            logIn(data.token, nickname);
            dispatch(setUserData({ nickname, token: data.token }));
            navigate(appPaths.home());
        }
        if (error) {
            switch (error.status) {
                case 409: {
                    setErrors({ nickname: t('form.errors.userExists') });
                    break;
                }
                default: {
                    setErrors({ nickname: t('form.errors.nickname'), password: t('form.errors.password'), passwordConfirm: t('form.errors.passwordConfirm') });
                }
            }
        }
    };
    return (
        <div className="container-fluid m-auto ">
                <Col className=" row justify-content-center align-content-center ">
                    <Card className="m-5 w-50 p-5 background" style={{ maxWidth: '500px', minWidth: '250px', background: '#831d0b', borderRadius: '50px' }}>
                        <Card.Header as="h1" className="text-center text-white m-2 border-1 flex-nowrap">
                            {t('signupPage.title')}
                        </Card.Header>
                        <Card.Body className="justify-content-center">
                                <Formik
                                    initialValues={{ nickname: '', password: '', passwordConfirm: '' }}
                                    onSubmit={handleFormSubmit}
                                    validationSchema={signupSchema}
                                    validateOnChange={false}
                                >
                                    {({
                                          handleSubmit, handleChange, values, errors,
                                      }) => (
                                        <Form onSubmit={handleSubmit} className="form">
                                            <Form.Group className="text-white mb-2">
                                                <Form.Label htmlFor="nickname">{t('signupPage.nickname')}</Form.Label>
                                                <Form.Control style={{ background: '#dad5b5' }} required id="nickname" value={values.nickname} onChange={handleChange} type="text" name="nickname" isInvalid={!!errors.nickname} />
                                                <Form.Control.Feedback type="invalid">{errors.nickname}</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="text-white mb-2">
                                                <Form.Label htmlFor="password">Пароль</Form.Label>
                                                <Form.Control style={{ background: '#dad5b5' }} required id="password" value={values.password} onChange={handleChange} type="password" name="password" isInvalid={!!errors.password} />
                                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="text-white mb-5">
                                                <Form.Label htmlFor="paswordConfirm">Подтвердите пароль</Form.Label>
                                                <Form.Control style={{ background: '#dad5b5' }} required id="paswordConfirm" value={values.passwordConfirm} onChange={handleChange} type="password" name="passwordConfirm" isInvalid={!!errors.passwordConfirm} />
                                                <Form.Control.Feedback type="invalid">{errors.passwordConfirm}</Form.Control.Feedback>
                                            </Form.Group>
                                            <Button className="w-100 border-0" style={{ color: '#831d0b', background: '#dad5b5', borderRadius: '50px', borderColor: 'none'}} type="submit" variant="outline-primary">{t('signupPage.button')}</Button>
                                        </Form>
                                    )}
                                </Formik>
                        </Card.Body>
                    </Card>
                </Col>
        </div>
    );
};

export default Signup;