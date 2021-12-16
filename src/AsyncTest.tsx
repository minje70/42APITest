import { useAsync } from 'react-async';

interface LoadCustomerProps {
	customerId: number;
	signal: any;
}

const loadCustomer = async ({ customerId }: any, { signal }: any) => {
	const res = await fetch(`/api/customers/${customerId}`, { signal });
	if (!res.ok) throw new Error(res.statusText);
	return res.json();
};

const Mycomponent = () => {
	const { data, error, isLoading } = useAsync({
		promiseFn: loadCustomer,
		customerId: 1,
	});

	if (isLoading) return 'Loading';
	if (error) return `Something went wrong: ${error.message}`;
	if (data)
		return (
			<div>
				<strong>Loaded some data:</strong>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		);
	return null;
};
