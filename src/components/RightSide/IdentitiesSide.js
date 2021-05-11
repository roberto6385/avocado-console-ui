import React, {useCallback} from 'react';
import {MainHeader, SideBody} from '../../styles/cards';
import {
	AiTwotoneSetting,
	FaEdit,
	FaMinus,
	FaPlus,
	FaTimes,
} from 'react-icons/all';
import {BaseSpan, BorderBottomP} from '../../styles/texts';
import {IconButton, TextButton} from '../../styles/buttons';
import {ColBox, RowBox} from '../../styles/divs';
import {useHistory} from 'react-router-dom';
import {Form, Table} from 'react-bootstrap';

const IdentitiesSide = () => {
	const history = useHistory();

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	const closeSide = useCallback(
		() => () => {
			document.getElementById('right_side_menu').style.width = '0px';
		},
		[],
	);

	const AccountList = [
		{
			Account: 'root',
			Authentication: 'key',
		},
		{
			Account: 'root',
			Authentication: 'key',
		},
		{
			Account: 'root',
			Authentication: 'key',
		},
	];

	return (
		<ColBox width={'100%'}>
			<MainHeader justify={'space-between'}>
				<div
					onClick={changePath('/identities')}
					style={{
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<AiTwotoneSetting />
					<BaseSpan>Identities</BaseSpan>
				</div>
				<IconButton onClick={closeSide()}>
					<FaTimes />
				</IconButton>
			</MainHeader>
			<SideBody padding={'4px 12px'} direction={'column'}>
				<ColBox>
					<RowBox justify={'flex-end'} padding={'8px 4px'}>
						<IconButton>
							<FaPlus />
						</IconButton>
						<IconButton>
							<FaMinus />
						</IconButton>
						<IconButton onClick={changePath('/identities')}>
							<FaEdit />
						</IconButton>
					</RowBox>
					<Table>
						<thead>
							<tr>
								<th></th>
								<th>Account</th>
								<th>Authentication</th>
							</tr>
						</thead>
						<tbody>
							{AccountList.map((item, index) => {
								return (
									<tr key={index}>
										<th>
											<Form.Check></Form.Check>
										</th>
										<th>{item.Account}</th>
										<th>{item.Authentication}</th>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</ColBox>
			</SideBody>
		</ColBox>
	);
};

export default IdentitiesSide;
