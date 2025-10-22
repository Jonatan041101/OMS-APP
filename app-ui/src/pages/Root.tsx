import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Root() {
	return (
		<>
			<div id="pages" className="flex flex-col justify-start items-center flex-1 outlet">
				<Outlet />
			</div>

			<div data-test="toast-container">
				<ToastContainer data-test="toast-container" />
			</div>
		</>
	);
}
