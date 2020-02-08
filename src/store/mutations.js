export const STORAGE_KEY = 'tasks-vuejs';

// for testing
if (navigator.userAgent.includes('PhantomJS')) {
	window.localStorage.clear();
}

export const mutations = {
	addTask(state, task) {
		state.tasks.push(task);
	},

	removeTask(state, task) {
		state.tasks.splice(state.tasks.indexOf(task), 1);
	},

	editTask(state, {task, text = task.text, done = task.done}) {
		const index = state.tasks.indexOf(task);

		state.tasks.splice(index, 1, {
			...task,
			text,
			done
		});
	}
};
