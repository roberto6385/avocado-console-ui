import React, {useCallback} from 'react';
import {MainHeader} from '../../styles/cards';
import {AiTwotoneSetting, FaEdit, FaTimes, MdDelete} from 'react-icons/all';
import {BaseSpan} from '../../styles/texts';
import {IconButton} from '../../styles/buttons';
import {ColBox, RowBox} from '../../styles/divs';
import {useHistory} from 'react-router-dom';
import {Form, Table} from 'react-bootstrap';
import {OPEN_ADD_ACCOUT_FORM_POPUP} from '../../reducers/popup';
import {useDispatch} from 'react-redux';

const IdentitiesSide = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const closeSide = useCallback(() => {
		document.getElementById('right_side_menu').style.display = 'none';
		document.getElementById('right_side_menu').style.width = '0px';
	}, []);

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

	const onClickVisibleAddAccountForm = useCallback(() => {
		history.push('/identities');

		dispatch({
			type: OPEN_ADD_ACCOUT_FORM_POPUP,
			data: {type: 'add'},
		});
	}, []);

	return (
		<ColBox width={'100%'}>
			<MainHeader justify={'space-between'}>
				<div
					style={{
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<AiTwotoneSetting />
					<BaseSpan>Identities</BaseSpan>
				</div>
				<IconButton onClick={closeSide}>
					<FaTimes />
				</IconButton>
			</MainHeader>
			<div>
				<ColBox>
					<RowBox justify={'flex-end'} padding={'8px 4px'}>
						<IconButton onClick={onClickVisibleAddAccountForm}>
							<FaEdit />
						</IconButton>
						<IconButton>
							<MdDelete />
						</IconButton>
					</RowBox>
					<Table>
						<thead>
							<tr>
								<th />
								<th>Account</th>
								<th>Authentication</th>
							</tr>
						</thead>
						<tbody>
							{AccountList.map((item, index) => {
								return (
									<tr key={index}>
										<th>
											<Form.Check />
										</th>
										<th>{item.Account}</th>
										<th>{item.Authentication}</th>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</ColBox>
			</div>
		</ColBox>
	);
};

export default IdentitiesSide;
