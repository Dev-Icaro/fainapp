import IUser from 'models/IUser';
import { create } from 'zustand';

interface UserStore {
  user: IUser | null;
  accessToken: string;
  setUser: (user: IUser) => void;
  setAccessToken: (accessToken: string) => void;
}

const useUserStore = create<UserStore>(set => ({
  user: null,
  accessToken: '',
  setUser: (user: IUser) => {
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

export default useUserStore;
