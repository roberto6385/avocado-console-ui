import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Form, Modal} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';

import {EDIT_SERVER, SAVE_SERVER} from '../../reducers/common';
import useInput from '../../hooks/useInput';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {MAIN_COLOR, SUB_COLOR} from '../../styles/global';
import {
    CLOSE_ADD_SERVER_FORM_POPUP,
    OPEN_ALERT_POPUP,
} from '../../reducers/popup';
import {PrevIconButton, PopupButton} from '../../styles/buttons';
import {FlexBox} from '../../styles/divs';
import {BaseModal} from '../../styles/modals';
import {MainHeader} from '../../styles/cards';
import {BaseSpan} from '../../styles/texts';

const AddServerForm = () => {
    const dispatch = useDispatch();
    const {server} = useSelector((state) => state.common);
    const {userTicket} = useSelector((state) => state.userTicket);
    const {add_server_form_popup} = useSelector((state) => state.popup);

    const [name, onChangeName, setName] = useInput('Test');
    const [protocol, onChangeProtocol, setProtocol] = useInput('SSH2');
    const [host, onChangeHost, setHost] = useInput('211.253.10.9');
    const [port, onChangePort, setPort] = useInput(10021);
    const [user, onChangeUser, setUser] = useInput('root');
    const [
        authentication,
        onChangeAuthentication,
        setAuthentication,
    ] = useInput('Password');
    const [key, onChangeKey] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('Netand141)');
    const [note, onChangeNote, setNote] = useInput('');

    const onSubmitForm = useCallback(
        (e) => {
            e.preventDefault();

            const ws = new WebSocket(`ws://${host}:8081/ws/ssh`);
            ws.binaryType = 'arraybuffer';

            ws.onerror = () => {
                dispatch({type: OPEN_ALERT_POPUP, data: 'invalid_server'});
            };

            ws.onopen = () => {
                ssht_ws_request({
                    keyword: 'SendConnect',
                    ws: ws,
                    data: {
                        token: userTicket,
                        host: host,
                        user: user,
                        password: password,
                        port: port,
                    },
                });
            };

            ws.onmessage = (evt) => {
                const message = GetMessage(evt.data);

                if (message.type === 'CONNECT') {
                    ssht_ws_request({keyword: 'SendDisconnect', ws: ws});
                    const newData = {
                        name: name,
                        host: host,
                        user: user,
                        password: password,
                        port: port,
                    };
                    if (add_server_form_popup.type === 'add')
                        dispatch({
                            type: SAVE_SERVER,
                            data: newData,
                        });
                    else if (add_server_form_popup.type === 'edit')
                        dispatch({
                            type: EDIT_SERVER,
                            data: {
                                id: add_server_form_popup.id,
                                data: newData,
                            },
                        });
                } else if (message.type === 'DISCONNECT') {
                    dispatch({type: CLOSE_ADD_SERVER_FORM_POPUP});
                } else console.log('V AddServerForm onmessage: ', message);
            };
        },
        [
            name,
            host,
            user,
            password,
            port,
            dispatch,
            add_server_form_popup,
            userTicket,
        ],
    );

    const onClickCloseForm = useCallback(() => {
        dispatch({type: CLOSE_ADD_SERVER_FORM_POPUP});
    }, []);

    useEffect(() => {
        if (add_server_form_popup.open) {
            if (add_server_form_popup.type === 'add') {
                setName('Test');
                setProtocol('SSH2');
                setHost('211.253.10.9');
                setPort(10021);
                setUser('root');
                setAuthentication('Password');
                setPassword('Netand141)');
            } else {
                const data = server.find(
                    (v) => v.id === add_server_form_popup.id,
                );
                setName(data.name);
                setProtocol('SSH2');
                setHost(data.host);
                setPort(data.port);
                setUser(data.user);
                setAuthentication('Password');
                setPassword(data.password);
            }
        }
    }, [add_server_form_popup]);

    return (
        <BaseModal
            show={add_server_form_popup.open}
            onHide={onClickCloseForm}
            backdrop='static'
            width={'700px'}
        >
            <MainHeader justify={'space-between'}>
                <BaseSpan padding={'0px 8px'}>Add Server</BaseSpan>
                <PrevIconButton className={'right'}>
                    <FaTimes onClick={onClickCloseForm} />
                </PrevIconButton>
            </MainHeader>
            <Modal.Body>
                <Form onSubmit={onSubmitForm}>
                    <Form.Row className={'add-server-form-row'}>
                        <Form.Label column sm={2}>
                            Name
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                onChange={onChangeName}
                                value={name}
                                type='text'
                                placeholder='Server Name'
                                required
                            />
                        </Col>
                        <Col xs={1} />
                        <Form.Label column sm={2}>
                            Protocol
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                as='select'
                                value={protocol}
                                onChange={onChangeProtocol}
                                required
                            >
                                <option key='SSH2' value='SSH2'>
                                    SSH2
                                </option>
                                <option key='protocol2' value='protocol2'>
                                    protocol2
                                </option>
                            </Form.Control>
                        </Col>
                    </Form.Row>

                    <Form.Row className={'add-server-form-row'}>
                        <Form.Label column sm={2}>
                            Address
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                onChange={onChangeHost}
                                value={host}
                                type='text'
                                placeholder='Host Name or IP'
                                required
                            />
                        </Col>
                        <Col xs={1} />
                        <Form.Label column sm={2}>
                            Port
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                onChange={onChangePort}
                                value={port}
                                type='number'
                                placeholder='Port'
                                required
                            />
                        </Col>
                    </Form.Row>

                    <Form.Row className={'add-server-form-row'}>
                        <Form.Label column sm={2}>
                            Username
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                onChange={onChangeUser}
                                value={user}
                                type='text'
                                placeholder='Login Username'
                                required
                            />
                        </Col>
                        <Col xs={1} />
                        <Form.Label column sm={2}>
                            Authentication
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                as='select'
                                value={authentication}
                                onChange={onChangeAuthentication}
                                required
                            >
                                <option value='Password'>Password</option>
                                <option value='Key file'>Key file</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>

                    {authentication === 'Password' ? (
                        <Form.Group className={'add-server-form-row'}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={password}
                                onChange={onChangePassword}
                                type='password'
                                placeholder='password'
                                required
                            />
                        </Form.Group>
                    ) : (
                        <>
                            <Form.Group className={'add-server-form-row'}>
                                <Form.Label>Private Key File</Form.Label>
                                <Form.File
                                    value={key}
                                    onChange={onChangeKey}
                                    label='Login Password'
                                    custom
                                />
                            </Form.Group>

                            <Form.Group className={'add-server-form-row'}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    value={password}
                                    onChange={onChangePassword}
                                    type='password'
                                    placeholder='Key File Password'
                                    required
                                />
                            </Form.Group>
                        </>
                    )}

                    <Form.Group className={'add-server-form-row'}>
                        <Form.Label>Note</Form.Label>
                        <Form.Control
                            value={note}
                            onChange={onChangeNote}
                            type='text'
                            placeholder='Note'
                        />
                    </Form.Group>

                    <FlexBox justify={'center'}>
                        <PopupButton
                            onClick={onClickCloseForm}
                            back={SUB_COLOR}
                        >
                            Cancel
                        </PopupButton>
                        <PopupButton type='submit' back={MAIN_COLOR}>
                            Save
                        </PopupButton>
                    </FlexBox>
                </Form>
            </Modal.Body>
        </BaseModal>
    );
};

export default AddServerForm;