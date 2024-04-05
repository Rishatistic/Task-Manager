import './home.scss';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Home = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;
	return (
		<div className='home'>
			<div className='home__container'>
				<h2>Organize Your Tasks</h2>
				

				{currentUser && currentUser.token ? (
					<Link to='/dashboard' className='button'>
						 Let's Get Started
					</Link>
				) : (
					<Link to='/signin' className='button'>
						Let's Get Started
					</Link>
				)}
			</div>
		</div>
	);
};

export default Home;
