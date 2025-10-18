interface IButtonProps {
	onClick?: () => void;
    text:string
    dataTest?:string
    type?:"submit"|"button"
    isDisabled?:boolean
    className?:string
}

export default function Button({ onClick,text,dataTest,isDisabled,type = "button",className}: IButtonProps) {
	return <button
		data-test={dataTest}
        disabled={isDisabled}
		onClick={onClick}
        type={type}
		className={`flex h-12 w-full max-w-[450px] items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white ${className} disabled:opacity-20 disabled:cursor-not-allowed`}
	>
		{text}
	</button>;
}
