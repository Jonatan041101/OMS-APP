import { ChangeEvent } from 'react';

interface IInputFieldProps {
	label: string;
	placeholder: string;
	name: string;
	type: string;
	value: string | number;
	onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
	onBlur: (evt: ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	touched?: boolean;
	dataTest?:string
}

export default function InputField({
	label,
	name,
	type,
	value,
	placeholder,
	error,
	touched,
	onBlur,
	onChange,
	dataTest
}: IInputFieldProps) {
	return (
		<div className="space-y-2" data-test={dataTest}>
			<label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor={name}>
				{label}
			</label>
			<input
				className="w-full h-12 px-4 text-base border bg-white dark:bg-gray-900 border-gray-300 dark:border-white rounded-lg focus:ring-primary focus:border-primary text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
				id="item"
				name={name}
				value={value}
				placeholder={placeholder}
				type={type}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{touched && error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	);
}
