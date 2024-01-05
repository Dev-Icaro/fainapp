import ISignupDTO from '@features/user/data/dtos/ISignupDTO';
import RepositoryFactory from '@utils/RepositoryFactory';

const SignupService = {
  execute: (signupDTO: ISignupDTO): Promise<void> => {
    const authRepo = RepositoryFactory.getAuthRepository();
    return authRepo.signup(signupDTO);
  },
};

export default SignupService;
