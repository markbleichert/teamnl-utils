/* global describe, it, before */

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {CookiesStore, LocalStorageStore} from '../lib/tnl-utils.js';

chai.expect();
chai.use(sinonChai);

const expect = chai.expect;

describe('Given an instance of a store', () => {

	describe('when I access a cookie with no data', () => {
		let store;
		const spyGet = sinon.spy();
		const spyPut = sinon.spy();

		before(() => {
			store = new CookiesStore('shjn', {
				put: spyPut,
				get: spyGet
			});
		});

		it('should have no items by default', () => {
			expect(store.hasItems()).to.be.equal(false);
		});

		it('should call get items', () => {
			store.getItems();
			expect(spyGet).to.have.been.calledWith('shjn');
		});

		it('should call update items', () => {
			store.update({a: 1, b: 2});
			expect(spyPut).to.have.been.calledWith('shjn', '{"a":1,"b":2}');
		});
	});

	describe('when I access a cookie with data', () => {
		let store;
		const stubGet = sinon.stub().returns('{"a":1,"b":2}');

		before(() => {
			store = new CookiesStore('shjn', {
				get: stubGet
			});
		});

		it('should have items', () => {
			expect(store.hasItems()).to.be.equal(true);
		});

		it('should have expected items', () => {
			expect(store.getItems().a).to.be.equal(1);
			expect(store.getItems().b).to.be.equal(2);
		});
	});

	describe('when I access a localstorage with no data', () => {
		let store;
		const spyGetItem = sinon.spy();
		const spySetItem = sinon.spy();

		before(() => {
			store = new LocalStorageStore('shjn', {
				setItem: spySetItem,
				getItem: spyGetItem
			});
		});

		it('should have no items by default', () => {
			expect(store.hasItems()).to.be.equal(false);
		});

		it('should call get items', () => {
			store.getItems();
			expect(spyGetItem).to.have.been.calledWith('shjn');
		});

		it('should call update items', () => {
			store.update({a: 1, b: 2});
			expect(spySetItem).to.have.been.calledWith('shjn', '{"a":1,"b":2}');
		});
	});

	describe('when I access localstorage with data', () => {
		let store;
		const stubGetItem = sinon.stub().returns('{"a":1,"b":2}');

		before(() => {
			store = new LocalStorageStore('shjn', {
				getItem: stubGetItem
			});
		});

		it('should have items', () => {
			expect(store.hasItems()).to.be.equal(true);
		});

		it('should have expected items', () => {
			expect(store.getItems().a).to.be.equal(1);
			expect(store.getItems().b).to.be.equal(2);
		});

	});
});