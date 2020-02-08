export default {
	addTask({commit}, text) {
		commit('addTask', {
			text,
			done: false
		});
	},

	removeTask({commit}, task) {
		commit('removeTask', task);
	},

	toggleTask({commit}, task) {
		commit('editTask', {task, done: !task.done});
	},

	editTask({commit}, {task, value}) {
		commit('editTask', {task, text: value});
	},

	toggleAll({state, commit}, done) {
		state.tasks.forEach(task => {
			commit('editTask', {task, done});
		});
	},
	clearCompleted({state, commit}) {
		state.tasks.filter(task => task.done)
			.forEach(task => {
				commit('removeTask', task);
			});
	}
};
