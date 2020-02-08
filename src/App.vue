<template>
  <div id="app">
    <section class="taskapp">
      <!-- header -->
      <header class="header">
        <h1>tasks</h1>
        <input
          class="new-task"
          autofocus
          autocomplete="off"
          placeholder="What needs to be done?"
          @keyup.enter="addTask"
        >
      </header>
      <!-- main section -->
      <section
        v-show="tasks.length"
        class="main"
      >
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          :checked="allChecked"
          @change="toggleAll(!allChecked)"
        >
        <label for="toggle-all" />
        <ul class="task-list">
          <TaskItem
            v-for="(task, index) in filteredTasks"
            :key="index"
            :task="task"
          />
        </ul>
      </section>
      <!-- footer -->
      <footer
        v-show="tasks.length"
        class="footer"
      >
        <span class="task-count">
          <strong>{{ remaining }}</strong>
          {{ remaining | pluralize('item') }} left
        </span>
        <ul class="filters">
          <li
            v-for="(val, key) in filters"
            :key="val"
          >
            <a
              :href="'#/' + key"
              :class="{ selected: visibility === key }"
              @click="visibility = key"
            >{{ key | capitalize }}</a>
          </li>
        </ul>
        <button
          v-show="tasks.length > remaining"
          class="clear-completed"
          @click="clearCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import TaskItem from './components/TaskItem.vue';

const filters = {
	all: tasks => tasks,
	active: tasks => tasks.filter(task => !task.done),
	completed: tasks => tasks.filter(task => task.done)
};

export default {
	name: 'App',
	components: {
		TaskItem
	},
	filters: {
		pluralize: (n, w) => n === 1 ? w : (w + 's'),
		capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
	},
	data() {
		return {
			visibility: 'all',
			filters: filters
		};
	},
	computed: {
		tasks() {
			return this.$store.state.tasks;
		},
		allChecked() {
			return this.tasks.every(task => task.done);
		},
		filteredTasks() {
			return filters[this.visibility](this.tasks);
		},
		remaining() {
			return this.tasks.filter(task => !task.done).length;
		}
	},
	methods: {
		...mapActions([
			'toggleAll',
			'clearCompleted'
		]),
		addTask(event) {
			const text = event.target.value;
			if (text.trim()) {
				this.$store.dispatch('addTask', text);
			}
			event.target.value = '';
		}
	}
};
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h3 {
      margin: 40px 0 0;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      display: inline-block;
      margin: 0 10px;
    }

    a {
      color: #42b983;
    }
</style>
