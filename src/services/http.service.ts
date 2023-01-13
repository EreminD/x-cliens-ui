
import { PUBLIC_API_URL } from '$env/static/public';
import axios from 'axios';

export class HttpService {

    async post(path: string, body: any) {
        const response = await axios.post(PUBLIC_API_URL + path, body)
        return response.data;
    }
}