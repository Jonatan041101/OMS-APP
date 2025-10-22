import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<header className="flex items-center justify-between w-full max-w-5xl px-4 py-2 border-b border-background-light dark:border-background-dark/20 bg-background-light dark:bg-background-dark">
			<div className="w-full max-w-5xl flex">
				<h1 className="leading-loose text-xl font-bold text-gray-900 dark:text-white flex-1 text-center" data-test="navbar-title">
					Orders
				</h1>
				<Link
				data-test="navbar-link-create"
					to="/create"
					className="text-gray-500 dark:text-gray-400 flex flex-col justify-center items-center"
				>
					<span className="material-symbols-outlined">add_circle</span>
				</Link>
			</div>
		</header>
	);
}
