import React, {useCallback} from 'react';

import {Col, Container, Form, Row, Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {FaPlus, FaRegTrashAlt} from 'react-icons/all';
import {IconButton} from '../../styles/buttons';
import {ColBox, RowBox} from '../../styles/divs';
import {
	OPEN_ADD_ACCOUT_FORM_POPUP,
	OPEN_ADD_SERVER_FORM_POPUP,
} from '../../reducers/popup';

const IdentitiesContainer = () => {
	const {server, account} = useSelector((state) => state.common);
	const dispatch = useDispatch();
	const onClickVisibleAddServerForm = useCallback(() => {
		dispatch({
			type: OPEN_ADD_SERVER_FORM_POPUP,
			data: {type: 'add'},
		});
	}, []);

	const onClickVisibleAddAccountForm = useCallback(() => {
		dispatch({
			type: OPEN_ADD_ACCOUT_FORM_POPUP,
			data: {type: 'add'},
		});
	}, []);
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
												<IconButton
													onClick={
														onClickVisibleAddAccountForm
													}
												>
													<FaPlus />
												</IconButton>
												<IconButton>
													<FaRegTrashAlt />
												</IconButton>
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
										<tr key={item.id}>
											<td>
												<Form.Check />
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
		</ColBox>
	);
};

export default IdentitiesContainer;
