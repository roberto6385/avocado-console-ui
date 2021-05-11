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
import {SSHT_CHANGE_SNIPPET} from '../reducers/ssht';

const SnippetsManeger = ({open, setOpen}) => {
	const dispatch = useDispatch();
	const {snippets, snippents_index} = useSelector((state) => state.ssht);
	const [tempSnippets, setTempSnippets] = useState(snippets);
	const [index, setIndex] = useState(snippents_index);
	const [name, setName] = useState('');
	const [content, setContent] = useState('');
	const [currentSnippet, setCurrentSnippet] = useState(null);

	const onChangeName = useCallback(
		(e) => {
			// console.log(e.target.value);
			setName(e.target.value);
			setTempSnippets(
				tempSnippets.map((v) => {
					if (v.id === currentSnippet)
						return {...v, name: e.target.value};
					else return v;
				}),
			);
		},
		[currentSnippet, tempSnippets],
	);

	const onChangeContent = useCallback(
		(e) => {
			console.log(e.target.value);
			setContent(e.target.value);
			setTempSnippets(
				tempSnippets.map((v) => {
					if (v.id === currentSnippet)
						return {...v, content: e.target.value};
					else return v;
				}),
			);
		},
		[currentSnippet, tempSnippets],
	);

	const onClickCancel = useCallback(() => {
		setName('');
		setContent('');
		setTempSnippets(snippets);
		setIndex(snippents_index);
		setOpen(false);
	}, [snippets, snippents_index]);

	const onClickSubmit = useCallback(() => {
		dispatch({
			type: SSHT_CHANGE_SNIPPET,
			data: {snippets: tempSnippets, snippents_index: index},
		});
		setOpen(false);
	}, [snippets, tempSnippets, index]);

	const onClickSnippet = useCallback(
		(id) => () => {
			setName(tempSnippets.find((v) => v.id === id).name);
			setContent(tempSnippets.find((v) => v.id === id).content);
			setCurrentSnippet(id);
		},
		[tempSnippets],
	);

	const onClickAddSnippet = useCallback(() => {
		setTempSnippets([
			...tempSnippets,
			{
				id: index,
				name: 'name',
				content: '',
			},
		]);
		setCurrentSnippet(index);
		setIndex(index + 1);
		setName('name');
		setContent('');
	}, [tempSnippets, index]);

	const onClickDeleteSnippet = useCallback(() => {
		if (currentSnippet !== null) {
			setTempSnippets(
				tempSnippets.filter((x) => x.id !== currentSnippet),
			);
			if (tempSnippets.length !== 0)
				setCurrentSnippet(tempSnippets[0].id);
			else setCurrentSnippet(null);
		}
	}, [currentSnippet, tempSnippets]);

	useEffect(() => {
		if (tempSnippets.length !== 0) {
			setCurrentSnippet(tempSnippets[0].id);
			setName(tempSnippets[0].name);
			setContent(tempSnippets[0].content);
		} else setCurrentSnippet(null);
	}, [snippets]);

	return (
		<BaseModal show={open} onHide={onClickCancel} width={'1000px'}>
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
					<FaTimes onClick={onClickCancel} />
				</IconButton>
			</MainHeader>
			<Card.Body>
				<Row>
					<Col>
						<ListGroup>
							{tempSnippets.map((v) => (
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
