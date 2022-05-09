import React, { useEffect, useState } from 'react';
import instance from '../../api';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Table, Button, Stack, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../redux/actions';
import { addModalUserSelector, deleteModalUserSelector, descriptionUserSelector, editModalUserSelector, emailUserSelector, firstNameUserSelector, genderUserSelector, idUserSelector, lastNameUserSelector } from '../../redux/selectors';
import { useNavigate } from 'react-router-dom';

import useFormattedData from '../../hooks/useFormattedData';
import usersData from './usersData.json';

const Users = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [users, setUser] = useState([]);
    const [usersLoading, setUserLoading] = useState(true);

    const idUser = useSelector(idUserSelector);
    const firstNameUser = useSelector(firstNameUserSelector);
    const lastNameUser = useSelector(lastNameUserSelector);
    const emailUser = useSelector(emailUserSelector);
    const genderUser = useSelector(genderUserSelector);
    const descriptionUser = useSelector(descriptionUserSelector);
    const addModalUser = useSelector(addModalUserSelector);
    const editModalUser = useSelector(editModalUserSelector);
    const deleteModalUser = useSelector(deleteModalUserSelector);

    const handleSubmit = async (event) => {

        event.preventDefault();

        const userData = {
            id: uuidv4(),
            first_name: firstNameUser,
            last_name: lastNameUser,
            email: emailUser,
            gender: genderUser,
            description: descriptionUser
        };

        try {
            await instance.post("/users", userData);
        }
        catch (error) {
            console.error(error.message);
        }
        finally {
            window.location.reload();
        }
    };

    const getUser = async () => {
        try {
            const response = await instance.get('/users');
            setUser(response.data);
        }
        catch (error) {
            console.error(error.message);
        }
        finally {
            setUserLoading(false)
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleUpdate = async () => {

        const userData = {
            first_name: firstNameUser,
            last_name: lastNameUser,
            email: emailUser,
            gender: genderUser,
            description: descriptionUser
        };

        try {
            await instance.put(`/users/${idUser}`, userData);
        }
        catch (error) {
            console.error(error.message);
        }
        finally {
            window.location.reload();
        }
    };

    const handleDelete = async () => {
        try {
            await instance.delete(`/users/${idUser}`);
        }
        catch (error) {
            console.error(error.message);
        }
        finally {
            window.location.reload();
        }
    };

    const { formatted, search, sortBy } = useFormattedData(usersData);

    useEffect(() => {
        sortBy("last_name");
        search("Eliot");
        console.log('formatted', formatted)
    }, []);

    return (
        <div className='my-4'>
            <Container fluid>
                <Row>
                    <Col sm={12} lg={8}>
                        <h1>Users list</h1>
                    </Col>
                    <Col sm={12} lg={2} className="my-2">
                        <Button
                            className='w-100'
                            variant="secondary"
                            onClick={() => navigate('/login')}
                        >
                            Login page
                        </Button>
                    </Col>
                    <Col sm={12} lg={2} className="my-2">
                        <Button
                            className='w-100'
                            variant="secondary"
                            onClick={() => dispatch(userAction({ addModal: !addModalUser }))}
                        >
                            Add user
                        </Button>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Options</th>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!usersLoading && users.map((item) =>
                                    <tr key={item.id}>
                                        <td>
                                            <Stack direction="horizontal" gap={2}>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => dispatch(userAction({
                                                        id: item.id,
                                                        first_name: item.first_name,
                                                        last_name: item.last_name,
                                                        email: item.email,
                                                        gender: item.gender,
                                                        description: item.description,

                                                        editModal: !editModalUser
                                                    }))}
                                                >
                                                    Edit
                                                </Button>
                                                <div className="vr" />
                                                <Button
                                                    variant="danger"
                                                    onClick={() => dispatch(userAction({
                                                        id: item.id,

                                                        deleteModal: !deleteModalUser
                                                    }))}
                                                >
                                                    Delete
                                                </Button>
                                            </Stack>
                                        </td>
                                        <td>{item.id}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.description}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            {/* add user */}

            <Modal show={addModalUser} onHide={() => dispatch(userAction({ addModal: !addModalUser }))}>
                <Modal.Header closeButton>
                    <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} id='addUserForm'>
                        <Form.Group className="mb-3">
                            <Form.Label>First name*</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                placeholder=""
                                value={firstNameUser}
                                onChange={(event) => dispatch(userAction({ first_name: event.target.value }))}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last name*</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                placeholder=""
                                value={lastNameUser}
                                onChange={(event) => dispatch(userAction({ last_name: event.target.value }))}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder=""
                                value={emailUser}
                                onChange={(event) => dispatch(userAction({ email: event.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Check
                                label="Male"
                                name="male"
                                type='radio'
                                value='male'
                                checked={genderUser === "male"}
                                onChange={(event) => dispatch(userAction({ gender: event.target.value }))}
                            />
                            <Form.Check
                                label="Female"
                                name="gender"
                                type='radio'
                                value='female'
                                checked={genderUser === "female"}
                                onChange={(event) => dispatch(userAction({ gender: event.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                as="textarea"
                                rows={3}
                                value={descriptionUser}
                                onChange={(event) => dispatch(userAction({ description: event.target.value }))}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => dispatch(userAction({ addModal: !addModalUser }))}
                    >
                        Close
                    </Button>
                    <Button
                        type='submit'
                        form='addUserForm'
                        variant="primary"
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* edit user */}

            <Modal show={editModalUser} onHide={() => dispatch(userAction({ editModal: !editModalUser }))}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdate} id='editUserForm'>
                        <Form.Group className="mb-3">
                            <Form.Label>First name*</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                placeholder=""
                                value={firstNameUser}
                                onChange={(event) => dispatch(userAction({ first_name: event.target.value }))}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last name*</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                placeholder=""
                                value={lastNameUser}
                                onChange={(event) => dispatch(userAction({ last_name: event.target.value }))}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder=""
                                value={emailUser}
                                onChange={(event) => dispatch(userAction({ email: event.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Check
                                label="Male"
                                name="male"
                                type='radio'
                                value='male'
                                checked={genderUser === "male"}
                                onChange={(event) => dispatch(userAction({ gender: event.target.value }))}
                            />
                            <Form.Check
                                label="Female"
                                name="gender"
                                type='radio'
                                value='female'
                                checked={genderUser === "female"}
                                onChange={(event) => dispatch(userAction({ gender: event.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                as="textarea"
                                rows={3}
                                value={descriptionUser}
                                onChange={(event) => dispatch(userAction({ description: event.target.value }))}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => dispatch(userAction({ editModal: !editModalUser }))}
                    >
                        Close
                    </Button>
                    <Button
                        type='submit'
                        form='editUserForm'
                        variant="primary"
                    >
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* delete user */}

            <Modal show={deleteModalUser} onHide={() => dispatch(userAction({ deleteModal: !deleteModalUser }))}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete that?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => dispatch(userAction({ deleteModal: !deleteModalUser }))}
                    >
                        No
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Users;