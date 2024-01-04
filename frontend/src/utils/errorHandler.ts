import axios from 'axios';

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const { data } = error.response;
      if (data && data.message) {
        throw new Error(data.message);
      }
    } else if (error.request) {
      throw new Error('Erro: O Servidor não respondeu a solicitação');
    } else {
      throw new Error('Erro: Algo deu errado ao enviar a requsição');
    }
  }

  throw error;
};
