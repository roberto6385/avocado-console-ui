import React, {useCallback} from 'react';

import {Col, Container, Form, Row, Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {FaPlus, FaRegTrashAlt} from 'react-icons/all';
import {PrevIconButton} from '../../styles/buttons';
import {ColBox, RowBox} from '../../styles/divs';
import {
	OPEN_ADD_ACCOUT_FORM_POPUP,
	OPEN_CONFIRM_POPUP,
} from '../../reducers/popup';
import AccountContextMenu from '../ContextMenu/AccountContextMenu';

import {useContextMenu} from 'react-contexify';
import {ACCOUT_CHECKLIST, ACCOUT_CONTROL_ID} from '../../reducers/common';

const IdentitiesContainer = () => {
	const {server, account, accountCheckList} = useSelector(
		(state) => state.common,
	);
	const dispatch = useDispatch();

	const onClickVisibleAddAccountForm = useCallback(() => {
		dispatch({type: ACCOUT_CONTROL_ID, payload: {id: null}});
		dispatch({
			type: OPEN_ADD_ACCOUT_FORM_POPUP,
			data: {type: 'add'},
		});
	}, []);

	const {show} = useContextMenu({
		id: 'account',
	});

	const deleteAccount = useCallback(() => {
		if (accountCheckList.length !== 0) {
			dispatch({
				type: OPEN_CONFIRM_POPUP,
				data: {
					key: 'delete_account',
				},
			});
		}
	}, [dispatch, accountCheckList]);

	const contextMenuOpen = useCallback(
		(id) => (e) => {
			e.preventDefault();
			console.log(id);
			dispatch({type: ACCOUT_CONTROL_ID, payload: {id}});
			show(e);
			e.stopPropagation();
		},
		[dispatch],
	);

	const checkManager = useCallback(
		(id) => (e) => {
			const {checked} = e.target;
			const prevCheck = accountCheckList.slice();
			if (checked) {
				prevCheck.push(id);
				dispatch({
					type: ACCOUT_CHECKLIST,
					payload: {check: prevCheck},
				});
			} else {
				const nextCheck = prevCheck.filter((item) => item !== id);
				dispatch({
					type: ACCOUT_CHECKLIST,
					payload: {
						check: nextCheck,
					},
				});
			}
		},
		[dispatch, accountCheckList],
	);
	return (
		<ColBox flex={1}>
			<h4>Identities</h4>
			<Container>
				<Row>
					<Col>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th colSpan='5'>
										<RowBox justify={'space-between'}>
											<span>Resource List</span>
										</RowBox>
									</th>
								</tr>
								<tr>
									<th>Name</th>
									<th>Address</th>
									<th>Protocol</th>
									<th>Port</th>
									<th>Note</th>
								</tr>
							</thead>
							<tbody>
								{server.map((v) => (
									<tr key={v.id}>
										<td>{v.name}</td>
										<td>{v.host}</td>
										<td>SSHv2</td>
										<td>{v.port}</td>
										<td />
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
					<Col>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th colSpan='4'>
										<RowBox justify={'space-between'}>
											<span>
												[Cloude Server] Account List
											</span>
											<RowBox>
												<form action=''>
													<input
														type='text'
														placeholder={'search'}
													/>
												</form>
												<PrevIconButton
													onClick={
														onClickVisibleAddAccountForm
													}
												>
													<FaPlus />
												</PrevIconButton>
												<PrevIconButton
													onClick={deleteAccount}
												>
													<FaRegTrashAlt />
												</PrevIconButton>
											</RowBox>
										</RowBox>
									</th>
								</tr>
								<tr>
									<th />
									<th>Name</th>
									<th>User Name</th>
									<th>Type</th>
								</tr>
							</thead>
							<tbody>
								{account.map((item) => {
									return (
										<tr
											key={item.id}
											onContextMenu={contextMenuOpen(
												item.id,
											)}
										>
											<td>
												<Form.Check
													onChange={checkManager(
														item.id,
													)}
												/>
											</td>
											<td>{item.name}</td>
											<td>{item.username}</td>
											<td>{item.type}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
			<AccountContextMenu />
		</ColBox>
	);
};

export default IdentitiesContainer;
