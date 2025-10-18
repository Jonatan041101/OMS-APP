export interface ICreateOrderDto {
    customerName: string;
    item: string;
    quantity: number | string;
    status: string;
  }