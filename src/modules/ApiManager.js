import Settings from '../repositories/Settings';
import { isAuthenticated } from '../components/auth/simpleAuth';

const getHeaders = () => {
    if (isAuthenticated()){
        return {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem(Settings.token_key)}`, 
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
        // console.log('settings', settings)
        const e = await fetch(`${Settings.remoteURL}/${endpoint}`, settings)
        return await e.json()
    },

    async getPage(pageUrlRef) {
        const settings = {
            'method': 'GET',
            'headers': getHeaders()
        };
        const e = await fetch(pageUrlRef, settings)
        return await e.json()
    },

    async post(endpoint, newItem){
        const settings = {
            'method': 'POST',
            'headers': getHeaders(),
            'body': JSON.stringify(newItem)
        };
        const e = await fetch(`${Settings.remoteURL}/${endpoint}`, settings)
        return await e.json()
    },

    async delete(fullUrl) {
        const settings = {
            'method': 'DELETE',
            'headers': getHeaders()
        }
        const e = await fetch(fullUrl, settings)
        return await e
    },

    async patch(fullUrl, editedItem) {
        const settings = {
            'method': 'PATCH',
            'headers': getHeaders(),
            'body': JSON.stringify(editedItem)
        }
        const e = await fetch(fullUrl, settings)
        return await e
    }
};
