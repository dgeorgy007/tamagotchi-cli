import storage, { valuesWithKeyMatch } from 'node-persist'

export class db {
    _db: storage.LocalStorage;
    requestQueue: Promise<any>;
    
	constructor() {
		this._db = storage.create();
        this._db.init();
        // this._db.clear();

		this.requestQueue = Promise.resolve();
    }

    async reset() {
        return await this._db.clear();
    }
    
    async valuesWithKeyMatch(match?: RegExp | string): Promise<any[]> {
        return this._db.valuesWithKeyMatch(match)
    }

	async getItem(key: string) {
		const getRequest = () => this._db.getItem(key);

		this.requestQueue = this.requestQueue.then(getRequest, getRequest);
		return this.requestQueue;
	}

	async setItem(key: string, value: any) {
		const setRequest = () => this._db.setItem(key, value);

		this.requestQueue = this.requestQueue.then(setRequest, setRequest);
		return this.requestQueue;
	}
}