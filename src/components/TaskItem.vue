<template>
  <li
    class="task"
    :class="{ completed: task.done, editing: editing }"
  >
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        :checked="task.done"
        @change="toggleTask(task)"
      >
      <label
        @dblclick="editing = true"
        v-text="task.text"
      />
      <button
        class="destroy"
        @click="removeTask(task)"
      />
    </div>
    <input
      v-show="editing"
      v-focus="editing"
      class="edit"
      :value="task.text"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    >
  </li>
</template>

<script>import {mapActions} from 'vuex';

export default {
	name: 'Task',
	directives: {
		focus(element, {value}, {context}) {
			if (value) {
				context.$nextTick(() => {
					element.focus();
				});
			}
		}
	},
	props: ['task'],
	data() {
		return {
			editing: false
		};
	},
	methods: {
		...mapActions([
			'editTask',
			'toggleTask',
			'removeTask'
		]),
		doneEdit(event) {
			const value = event.target.value.trim();
			const {task} = this;
			if (!value) {
				this.removeTask(task);
			} else if (this.editing) {
				this.editTask({
					task,
					value
				});
				this.editing = false;
			}
		},
		cancelEdit(event) {
			event.target.value = this.task.text;
			this.editing = false;
		}
	}
};
</script>

<style scoped>

</style>
