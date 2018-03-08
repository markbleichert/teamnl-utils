export default class LocalStorageStore {
	constructor(name, storage) {
		this.name = name;
		this.storage = storage;
	}

	update(data) {
		this.storage.setItem(this.name, JSON.stringify(data));
	}

	getItems() {
		let data = this.storage.getItem(this.name);
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
