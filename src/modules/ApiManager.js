import Settings from '../repositories/Settings';
import { isAuthenticated } from '../components/auth/simpleAuth';

const getHeaders = () => {
    if (isAuthenticated()){
        return {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem(Settings.token_name)}`, 
        }
    } else {
        return {
            'Content-Type': 'application/json',
        }
    }
}

export default {
	// get single entity
	async get(endpoint, id) {
        const settings = {
            'method': 'GET',
            'headers': getHeaders()
        };
        const e = await fetch(`${Settings.remoteURL}/${endpoint}/${id}`, settings);
		return await e.json();
	},

	// get all entries from endpoint
	async getAll(endpoint) {
        const settings = {
            'method': 'GET',
            'headers': getHeaders()
        };
        const e = await fetch(`${Settings.remoteURL}/${endpoint}`, settings)
        return await e.json()
    },
};
