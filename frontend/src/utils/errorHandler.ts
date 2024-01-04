import axios from 'axios';
import ApiException from 'exceptions/ApiException';

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const { data, status } = error.response;
      if (data && data.message) {
        throw new ApiException(data.message, status);
      }
    } else if (error.request) {
      throw new Error('Erro: O Servidor não respondeu a solicitação');
    } else {
      throw new Error('Erro: Algo deu errado ao enviar a requsição');
    }
  }

  throw error;
};
