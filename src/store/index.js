import Vuex from 'vuex';
import Vue from 'vue';
import actions from './actions';
import {mutations, STORAGE_KEY} from './mutations';
import plugins from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
	debug: true,
	state: {
		tasks: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
	},
	actions,
	mutations,
	plugins
});
