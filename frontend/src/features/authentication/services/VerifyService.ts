import RepositoryFactory from '@utils/RepositoryFactory';

const VerifyService = {
  execute: (verificationCode: number) => {
    const authRepository = RepositoryFactory.getAuthRepository();
    return authRepository.verify(verificationCode);
  },
};

export default VerifyService;
