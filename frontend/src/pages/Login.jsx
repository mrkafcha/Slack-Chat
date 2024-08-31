import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import {Form, Button, Card, Col} from 'react-bootstrap';
import apiPaths from '../routes.js';
import useAuth from "../hooks/useAuth";
import {useDispatch} from "react-redux";
import {actions} from "../slices/authSlice.js";

const Login = () => {
    const [authFailed, setAuthFailed] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();
    const dispatch = useDispatch();

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            setAuthFailed(false);

            try {
                const res = await axios.post(apiPaths.loginPath(), values);
                localStorage.setItem('user', JSON.stringify(res.data));
                dispatch(actions.setUser(res.data));
                auth.logIn();
                navigate('/');
            } catch (err) {
                console.log(err)
                throw err
            }
        },
    });

    return (
        <div className="container-fluid m-auto " >
            <Col className=" row justify-content-center align-content-center " >
                    <Card className="m-5 w-50 p-5 background" style={{ maxWidth: '500px', minWidth: '250px', background: '#831d0b', borderRadius: '50px' }}>
                        <Card.Header as="h1" className="text-center text-white m-2 border-1 flex-nowrap">
                            Войти
                        </Card.Header>
                        <Card.Body className="justify-content-center">
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group className="text-white mb-2">
                                        <Form.Label htmlFor="username">Username</Form.Label>
                                        <Form.Control
                                            ref={inputRef}
                                            required
                                            placeholder="username"
                                            className=" border-0"
                                            id="username"
                                            name="username"
                                            type="text"
                                            style={{ background: '#dad5b5' }}
                                            onChange={formik.handleChange}
                                            value={formik.values.username}
                                        />
                                    </Form.Group>
                                    <Form.Group className="text-white mb-4">
                                        <Form.Label htmlFor="password">Password</Form.Label>
                                        <Form.Control
                                            placeholder="password"
                                            required
                                            className=" border-0"
                                            style={{ background: '#dad5b5' }}
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                        />
                                    </Form.Group>
                                    <Button className="w-100 border-0" style={{ color: '#831d0b', background: '#dad5b5', borderRadius: '50px', borderColor: 'none'}} type="submit" variant="outline-primary">Submit</Button>
                                </Form>
                        </Card.Body>
                        <Card.Footer className="text-center text-white">
                            <div >
                                <span>Нет аккаунта?</span>
                                <br />
                                <a href='/signup'>Регистрация</a>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
        </div>
    );
};
export default Login;