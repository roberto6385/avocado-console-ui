import React from 'react';

import {Col, Container, Form, Row, Table} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {FaPlus, FaRegTrashAlt} from 'react-icons/all';
import {IconButton} from '../../styles/buttons';
import {ColBox} from '../../styles/divs';

const IdentitiesContainer = () => {
	const {server} = useSelector((state) => state.common);

	return (
		<ColBox flex={1}>
			<h4>Identities</h4>
			<Container>
				<Row>
					<Col>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th colSpan='4'>Resource List</th>
								</tr>
								<tr>
									<th>Name</th>
									<th>Address</th>
									<th>Protocol</th>
									<th>Port</th>
								</tr>
							</thead>
							<tbody>
								{server.map((v) => (
									<tr key={v.id}>
										<td>{v.name}</td>
										<td>{v.host}</td>
										<td>SSHv2</td>
										<td>{v.port}</td>
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
										[Cloude Server] Account List
										<IconButton className='right'>
											<FaPlus />
										</IconButton>
										<IconButton className='right'>
											<FaRegTrashAlt />
										</IconButton>
									</th>
								</tr>
								<tr>
									<th></th>
									<th>Name</th>
									<th>User Name</th>
									<th>Type</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<Form.Check></Form.Check>
									</td>
									<td>mainAccount</td>
									<td>root</td>
									<td>key</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</ColBox>
	);
};

export default IdentitiesContainer;
