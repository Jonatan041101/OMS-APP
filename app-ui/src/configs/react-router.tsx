import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home/Home';
import OrderCreatePage from '@/pages/order/OrderCreatePage';
import OrderDetailPage from '@/pages/order/OrderDetailPage';

import Root from '@pages/Root';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{ path: '/order/:id', element: <OrderDetailPage /> },
			{ path: '/create', element: <OrderCreatePage /> },
		],
	},
]);

export default router;
