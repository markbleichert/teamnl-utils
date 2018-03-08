export default class CookiesStore {
	constructor(name, storage) {
		this.name = name;
		this.storage = storage;
	}

	update(data) {
		this.storage.put(this.name, JSON.stringify(data));
	}

	getItems() {
		let data = this.storage.get(this.name);
		let parsedData = {};

		if (data) {
			try {
				parsedData = JSON.parse(data);

			} catch (e) {

			}
		}

		return parsedData;
	}

	hasItems() {
		return (Object.keys(this.getItems()).length > 0);
	}
}

