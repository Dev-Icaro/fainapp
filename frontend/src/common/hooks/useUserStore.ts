import IUser from 'models/IUser';
import { create } from 'zustand';

interface UserStore {
  user: IUser | null;
  accessToken: string | null;
}

const useUserStore = create<UserStore>(set => ({
  user: null,
  accessToken: '',
  setUser: () => set(state => ({ user: state.user })),
  setAccessToken: accessToken => set(() => ({ accessToken: accessToken })),
  removeAccessToken: () => set(stateIgnored => ({ accessToken: null })),
  removeUser: () => set(stateIgnored => ({ user: null })),
}));

export default useUserStore;
