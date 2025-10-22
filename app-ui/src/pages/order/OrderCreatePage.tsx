import { useNavigate } from 'react-router-dom';

import OrderCreateForm from '@/components/order/OrderCreateForm';

export default function OrderCreatePage() {
	const navigate = useNavigate();
	const onClose = () => {
		navigate('/');
	};
	return <OrderCreateForm onClose={onClose} />;
}
