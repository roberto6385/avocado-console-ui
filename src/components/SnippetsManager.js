import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useState} from 'react';
import {FaMinus, FaPlus, FaTimes, GiHamburgerMenu} from 'react-icons/all';
import {Card, Col, Form, ListGroup, Row} from 'react-bootstrap';
import * as PropTypes from 'prop-types';

import {BaseModal} from '../styles/modals';
import {BaseSpan} from '../styles/texts';
import {IconButton, PopupButton} from '../styles/buttons';
import {MainHeader} from '../styles/cards';
import {MAIN_COLOR, SUB_COLOR} from '../styles/global';
import useInput from '../hooks/useInput';
import {SSHT_ADD_SNIPPET, SSHT_DELETE_SNIPPET} from '../reducers/ssht';

const SnippetsManeger = ({open, setOpen}) => {
	const dispatch = useDispatch();
	const {snippets} = useSelector((state) => state.ssht);

	const [name, onChangeName, setName] = useInput('');
	const [content, onChangeContent, setContent] = useInput('');
	const [currentSnippet, setCurrentSnippet] = useState(null);

	const handleClose = useCallback(() => {
		setOpen(false);
	});

	const onClickCancel = useCallback(() => {
		setName('');
		setContent('');
		setOpen(false);
	}, []);

	const onClickSubmit = useCallback(() => {}, []);

	const onClickSnippet = useCallback(
		(id) => () => {
			setName(snippets.find((v) => v.id === id).name);
			setContent(snippets.find((v) => v.id === id).content);
			setCurrentSnippet(id);
		},
		[snippets],
	);

	const onClickAddSnippet = useCallback(() => {
		dispatch({
			type: SSHT_ADD_SNIPPET,
			data: {name: 'name', content: 'content'},
		});
		setCurrentSnippet(snippets[snippets.length - 1].id);
	}, [snippets]);

	const onClickDeleteSnippet = useCallback(() => {
		if (currentSnippet !== null) {
			dispatch({type: SSHT_DELETE_SNIPPET, data: currentSnippet});
			if (snippets.length !== 0) setCurrentSnippet(snippets[0].id);
			else setCurrentSnippet(null);
		}
	}, [currentSnippet, snippets]);

	useEffect(() => {
		if (snippets.length !== 0) setCurrentSnippet(snippets[0].id);
		else setCurrentSnippet(null);
	}, [snippets]);

	return (
		<BaseModal show={open} onHide={handleClose} width={'1000px'}>
			<MainHeader justify={'space-between'}>
				<BaseSpan padding={'0px 8px'}>
					Snippets Manager
					<IconButton onClick={onClickDeleteSnippet}>
						<FaMinus />
					</IconButton>
					<IconButton onClick={onClickAddSnippet}>
						<FaPlus />
					</IconButton>
				</BaseSpan>
				<IconButton className={'right'}>
					<FaTimes onClick={handleClose} />
				</IconButton>
			</MainHeader>
			<Card.Body>
				<Row>
					<Col>
						<ListGroup>
							{snippets.map((v) => (
								<ListGroup.Item
									key={v.id}
									onClick={onClickSnippet(v.id)}
									variant={
										currentSnippet === v.id && 'primary'
									}
								>
									<GiHamburgerMenu />
									{v.name}
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>
					<Col>
						<Form>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									value={name}
									onChange={onChangeName}
									type='text'
									placeholder='Snippet Name'
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Content</Form.Label>
								<Form.Control
									value={content}
									onChange={onChangeContent}
									type='text'
									placeholder='Hint: add an extra new line to execute the last command'
								/>
							</Form.Group>
						</Form>
					</Col>
				</Row>
				<PopupButton onClick={onClickCancel} back={`${SUB_COLOR}`}>
					Cancel
				</PopupButton>
				<PopupButton onClick={onClickSubmit} back={`${MAIN_COLOR}`}>
					Save
				</PopupButton>
				<Row />
			</Card.Body>
		</BaseModal>
	);
};

SnippetsManeger.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default SnippetsManeger;
