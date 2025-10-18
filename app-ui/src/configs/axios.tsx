import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { ApiResponseError } from '@/errors/ApiResponseError';
import { IHTTPRequestService } from '@/interfaces/IHTTPRequestService';
import { IApiResponseError } from '@/interfaces/api/IApiResponseError';

function createErrorHandler() {
	return async function handleAxiosError(error: unknown | Error | AxiosError<IApiResponseError>) {
		if (!axios.isAxiosError<IApiResponseError>(error) || !error.response)
			return Promise.reject(error);

		const { data } = error.response;
		return Promise.reject(
			new ApiResponseError(
				data.error.detail,
				data.error.source,
				data.error.status,
				data.error.title,
			),
		);
	};
}

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		common: {},
	},
});

axiosInstance.interceptors.response.use((response) => response, createErrorHandler());

function createAxiosService(instance: AxiosInstance): IHTTPRequestService<AxiosRequestConfig> {
	return {
		get: async <T,>(url: string, config?: AxiosRequestConfig): Promise<T> => {
			const response = await instance.get<T>(url, config);
			return response.data;
		},
		post: async <T, K = unknown>(url: string, body: K, config?: AxiosRequestConfig): Promise<T> => {
			const response = await instance.post<T>(url, body, config);
			return response.data;
		},
		patch: async <T, K = unknown>(
			url: string,
			body: K,
			config?: AxiosRequestConfig,
		): Promise<T> => {
			const response = await axiosInstance.patch(url, body, config);
			return response.data;
		},
		put: async <T, K = unknown>(url: string, body: K, config?: AxiosRequestConfig): Promise<T> => {
			const response = await axiosInstance.put(url, body, config);
			return response.data;
		},
		delete: async <T,>(url: string, config?: AxiosRequestConfig): Promise<T> => {
			const response = await axiosInstance.delete<T>(url, config);
			return response.data;
		},
	};
}

export const axiosService = createAxiosService(axiosInstance);
