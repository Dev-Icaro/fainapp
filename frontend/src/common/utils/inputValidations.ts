const inputEmailValidation = {
  validations: {
    required: {
      value: true,
      message: 'Email é obrigatório',
    },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'O email deve ser válido',
    },
  },
};

export { inputEmailValidation };
