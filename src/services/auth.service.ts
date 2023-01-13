import axios, { AxiosError } from 'axios';
import { TokenStore } from '../stores/token.store';

export class AuthService {
    private readonly tokenStore: TokenStore;

    constructor() {
        this.tokenStore = TokenStore.init()
    }

    async auth(username: string, password: string) {
        let response;

        try {
            response = await axios.post('https://x-clients-be.onrender.com/auth/login', { username, password })
            this.tokenStore.setToken(response.data['userToken'])
            localStorage.setItem('role', response.data['role'])
        } catch (err: any) {
            console.log('failed')
            this.tokenStore.reset();
            localStorage.removeItem('role')
            return (err as AxiosError).response?.data
        }
    }
}