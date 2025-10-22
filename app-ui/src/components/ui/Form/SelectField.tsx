import type { ChangeEvent } from 'react';

interface SelectFieldProps {
	label?: string;
	name: string;
	value: string;
	options: string[];
	onChange: (evt: ChangeEvent<HTMLSelectElement>) => void;
	onBlur?: (evt: ChangeEvent<HTMLSelectElement>) => void;
	error?: string;
	touched?: boolean;
	dataTest?:string
}

export const SelectField = ({
	label,
	name,
	value,
	options,
	onChange,
	onBlur,
	error,
	touched,
	dataTest,
}: SelectFieldProps) => {
	return (
		<div className="space-y-2 w-full" data-test={dataTest}>
			{label && (
				<label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor={name}>
					{label}
				</label>
			)}
			<div className="relative">
				<select
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					className={`capitalize w-full h-12 px-4 text-base border bg-white dark:bg-gray-900 border-gray-300 dark:border-white rounded-lg appearance-none focus:border-primary outline-none text-gray-900 dark:text-white ${
						error && touched ? 'border-red-500' : ''
					}`}
				>
					{options.map((opt) => (
						<option key={opt} value={opt} className="capitalize">
							{opt}
						</option>
					))}
				</select>

				<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
					<span className="material-symbols-outlined text-gray-400 dark:text-gray-500">
						unfold_more
					</span>
				</div>
			</div>
			{touched && error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	);
};
