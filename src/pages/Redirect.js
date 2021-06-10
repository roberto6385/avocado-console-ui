import React, {useCallback, useEffect} from 'react';
const querystring = require('query-string');

import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {getVerify} from '../reducers/auth/verify';
import {useDispatch} from 'react-redux';

const Redirect = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	function getParameter(name) {
		const list = location.search.substring(1).split('&');
		for (let i = 0; i < list.length; i++) {
			const data = list[i].split('=');
			console.log(data);
			if (data.length === 2) {
				if (data[0] === name) {
					console.log(data[1]);
					return data[1];
				}
			}
		}
		return null;
	}

	const verify = useCallback(
		(data) => {
			console.log(data);
			dispatch(
				getVerify({
					Authorization: 'Bearer ' + data,
				}),
			);
		},
		[dispatch],
	);

	useEffect(() => {
		return (
			axios
				.post(
					'https://accounts.google.com/o/oauth2/token',
					querystring.stringify({
						code: decodeURIComponent(getParameter('code')),
						grant_type: 'authorization_code',
						redirect_uri: 'http://localhost:3000/Redirect',
						client_id:
							'819744979674-dastdmj1j5k8coluu2vofclsi3kvo90h.apps.googleusercontent.com',
						client_secret: 'LEVTqM7nBsyLPuSEbT-mPffx',
					}),
					{
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
					},
				)
				// .then((response) => verify(response.data.access_token));
				.then((res) => console.log(res))
			// .then(() => history.push('/'))
		);
	}, []);

	return <div>redirect page</div>;
};

export default Redirect;
