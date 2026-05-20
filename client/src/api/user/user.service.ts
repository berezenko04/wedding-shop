import { httpGet, httpPatch } from '@/api/axios.middleware';

// types
import { UpdateUserBody, User, UserSession } from './user.types';

const R = {
  users: '/users',
  sessions: '/users/sessions',
} as const;

const UserService = {
  async getMe() {
    return httpGet<User>(R.users);
  },
  async getSessions() {
    return httpGet<UserSession[]>(R.sessions);
  },
  async updateUser(body: UpdateUserBody) {
    return httpPatch<User>(R.users, body);
  },
};

export default UserService;
