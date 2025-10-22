interface IOrderDetailRowProps{
	label: string;
	value?:string | number;
	highlight?: boolean;
	dataTest?:string
}

export default function OrderDetailRow({label,value,highlight,dataTest}:IOrderDetailRowProps){
	return (
    <div className="flex justify-between py-4" data-test={dataTest}>
      <span className="text-sm text-secondary-light dark:text-secondary-dark">
        {label}
      </span>
      <span
        className={
          highlight
            ? "inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary"
            : "text-sm font-medium text-foreground-light dark:text-foreground-dark"
        }
      >
        {value}
      </span>
    </div>
  );
}