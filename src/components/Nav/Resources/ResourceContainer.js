import React from 'react';
import SearchIconTextBox from '../../RecycleComponents/SearchIconTextBox';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import useInput from '../../../hooks/useInput';
import Resources from './Resources';
import AddServerDialogBox from '../../DialogBoxs/Form/AddServerDialogBox';

const _FormContainer = styled.div`
	padding: 10px 12px;
	display: flex;
`;

const _Form = styled.form`
	display: flex;
	flex: 1;
	align-items: center;
	border-radius: 4px;
`;

const Container = styled.div`
	height: 100%;
`;

const ResourceContainer = () => {
	const {t} = useTranslation('nav');
	const [searchVal, onChangeSearchVal] = useInput('');

	return (
		<Container>
			<_FormContainer>
				<_Form>
					<SearchIconTextBox
						onChange={onChangeSearchVal}
						value={searchVal}
						placeholder={t('search')}
						height={'36px'}
					/>
				</_Form>
			</_FormContainer>
			<Resources searchVal={searchVal} />
			<AddServerDialogBox />
		</Container>
	);
};

export default ResourceContainer;
