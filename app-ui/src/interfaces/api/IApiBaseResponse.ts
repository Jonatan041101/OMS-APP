import { IPagingCollectionData } from '@oms/common-types';

export interface ApiBaseResponse {
	succes: boolean;
	message: string;
}

export interface ISingleResponse<T> extends ApiBaseResponse {
	data: T;
}

export interface IListResponse<T> extends ApiBaseResponse {
	data: T[];
	meta: IPagingCollectionData;
}

export interface ILinks {
	self: string;
	next: string | null;
	last: string | null;
}
