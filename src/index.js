import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Fetch from './Fetch';
import { GraphQLClient, ClientContext } from 'graphql-hooks';

const client = new GraphQLClient({
	url: 'https://graphql.datocms.com/',
	headers: {
		Authorization: `Bearer ${process.env.REACT_APP_DATOCMS_API_KEY}`,
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ClientContext.Provider value={client}>
			<Fetch />
		</ClientContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
