
import React from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../redux/actions';
import { useForm } from 'react-hook-form';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        dispatch(loginAction(data));
        navigate('/');
    };

    return (
        <>
            <div className='d-flex align-items-center vh-100'>
                <Container fluid>
                    <Row className='justify-content-center'>
                        <Col xs={12} sm={12} md={6} lg={3}>
                            <h1>Login</h1>
                            <hr />
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Username"
                                        {...register("user_name", { required: true })}
                                    />
                                    {errors.user_name &&
                                        <Form.Text className='text-danger'>
                                            This field is required.
                                        </Form.Text>
                                    }
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Password"
                                        {...register("password", { required: true })}
                                    />
                                    {errors.password &&
                                        <Form.Text className='text-danger'>
                                            This field is required.
                                        </Form.Text>
                                    }
                                </Form.Group>
                                <Button type="submit">
                                    Login
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Login;