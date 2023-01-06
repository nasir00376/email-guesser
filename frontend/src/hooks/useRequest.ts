import React from "react";
import axios, { AxiosRequestConfig } from "axios";

interface UseRequest extends AxiosRequestConfig {
  onSuccess?(): void;
  onError?(error: unknown): void;
}

interface ErrorBody {
  message: string
}

export function useRequest({ onSuccess, onError, ...config }: UseRequest) {
  const [errors, setErrors] = React.useState<ErrorBody[] | null>(null);
  const doRequest = async <T>(data?: T) => {
    setErrors(null);
    try {
      config.data = data;
      const response = await axios(config);
      onSuccess?.();

      return response.data;
    } catch (error: any) {
      setErrors(error.response.data?.errors);
    }
  };

  return { doRequest, errors };
}
