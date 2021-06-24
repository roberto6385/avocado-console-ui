import React, {useEffect} from 'react';
const querystring = require('query-string');

import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import base64 from 'base-64';
import {GET_USER_TICKET_SUCCESS} from '../reducers/auth/userTicket';

const getParameter = (name) => {
	const list = location.search.substring(1).split('&');
	for (let i = 0; i < list.length; i++) {
		const data = list[i].split('=');
		if (data.length === 2) {
			if (data[0] === name) {
				return data[1];
			}
		}
	}
	return null;
};

const Redirect = () => {
	const {userTicket} = useSelector((state) => state.userTicket);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		const encodeData = base64.encode(`${'web'}:${'123456789'}`);
		return axios
			.post(
				'/oauth2/v1/token',
				querystring.stringify({grant_type: 'client_credentials'}),
				{
					headers: {
						Authorization: 'Basic ' + encodeData,
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					baseURL:
						'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
				},
			)
			.then((client) => {
				axios
					.post(
						'https://accounts.google.com/o/oauth2/token',
						querystring.stringify({
							code: decodeURIComponent(getParameter('code')),
							grant_type: 'authorization_code',
							redirect_uri:
								window.location.protocol +
								'//' +
								window.location.host +
								'/Redirect',
							client_id:
								'819744979674-dastdmj1j5k8coluu2vofclsi3kvo90h.apps.googleusercontent.com',
							client_secret: 'LEVTqM7nBsyLPuSEbT-mPffx',
						}),
						{
							headers: {
								'Content-Type':
									'application/x-www-form-urlencoded',
							},
						},
					)
					// .then((response) => verify(response.data.access_token));
					.then((google) => {
						console.log(google.data);
						axios
							.get(
								`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${google.data.access_token}`,
							)
							.then((user) => {
								console.log(user.data);
								// here
								axios
									.post(
										'/oauth2/v1/alternative/verify',
										querystring.stringify({
											username: user.data.email,
										}),
										{
											headers: {
												Authorization: `Bearer ${client.data.access_token}`,
												AlternativeAuthN: `google ${google.data.access_token}`,
												'Content-Type': `application/x-www-form-urlencoded`,
											},
											baseURL:
												'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
										},
									)
									.then((authN) => {
										console.log(authN);
										dispatch({
											type: GET_USER_TICKET_SUCCESS,
											payload: {
												data: authN.data,
												user: user.data,
											},
										});

										localStorage.setItem(
											'rememberMe',
											false,
										);
										localStorage.removeItem('user');
										localStorage.removeItem('password');
									});
							});
					})
					.catch((error) => {
						console.log(error);
						console.log('HERER');
						return <Redirect to={'/signin'} />;
					});
			});
	}, []);

	useEffect(() => {
		if (userTicket) history.push('/');
	}, [userTicket]);

	return <div>redirect page</div>;
};

export default Redirect;
