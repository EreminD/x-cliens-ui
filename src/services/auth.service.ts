import { TokenStore } from '../stores/token.store';
import { HttpService } from './http.service';

export class AuthService {
    constructor(private readonly tokenStore: TokenStore, private readonly httpService: HttpService) {
        this.tokenStore = TokenStore.init()
        this.httpService = new HttpService()
    }

    async auth(username: string, password: string) {
        try {
            const body = await this.httpService.post('/auth/login', { username, password })
            this.tokenStore.setToken(body['userToken'])
            localStorage.setItem('userinfo', body)
        } catch (err: any) {
            this.tokenStore.reset();
            localStorage.removeItem('userinfo')
            throw err
        }
    }
}