import IUserDTO from '@features/user/data/dtos/IUserDTO';
import { create } from 'zustand';

interface UserStore {
  user: IUserDTO | null;
  accessToken: string;
  setUser: (user: IUserDTO) => void;
  setAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<UserStore>(set => ({
  user: null,
  accessToken: '',
  setUser: (user: IUserDTO) => {
    set(stateIgnored => ({
      user: user,
    }));
  },
  setAccessToken: (accessToken: string) => {
    set(stateIgnored => ({
      accessToken: accessToken,
    }));
  },
}));

export default useAuthStore;
