import React from 'react';
import Counter from './Counter';

function App() {
	const onClick = () => {
		console.log('click');
		window.open(
			'https://api.intra.42.fr/oauth/authorize?client_id=474cf772258dc9c00fb0984f0208b425b752f05208e9d150882f645b0437e2cf&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Freturn%2F&response_type=code'
		);
	};
	return (
		<>
			<Counter />
			<button onClick={onClick}>recieveCode</button>
		</>
	);
}

export default App;
