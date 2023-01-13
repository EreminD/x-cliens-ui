import { writable } from 'svelte/store';

export class TokenStore {
    private static instance: TokenStore;
    private static readonly LOCAL_STORAGE_KEY: string = 'userToken'
    private static readonly NO_TOKEN: string = 'no token'
    
    private userTokenStore;
    
    private constructor(){
        const currentToken: string = localStorage?.getItem(TokenStore.LOCAL_STORAGE_KEY) || TokenStore.NO_TOKEN;
        const { subscribe, set } = writable(currentToken)
        this.userTokenStore = {
            subscribe,
            set: (token:string) => {
                localStorage?.setItem(TokenStore.LOCAL_STORAGE_KEY, token);
                set(token);
            }
        }
    }

    public static init(): TokenStore {
        if (!TokenStore.instance) {
            TokenStore.instance = new TokenStore();
        }
        return TokenStore.instance;
    }

    public getToken = () => this.userTokenStore.subscribe
    public setToken = (value: string) => this.userTokenStore.set(value);
    public reset = () => this.userTokenStore.set(TokenStore.NO_TOKEN)
}