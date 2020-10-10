import api from '@/services/api';

export const index = async () => {
  let response = await api('users');
  return {
    status: response.status,
    body: await response.json()
  }
}