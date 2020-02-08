<template>
  <div>
    <ul>
      <li
        v-for="(task, index) in tasks"
        :key="task"
      >
        {{ index }} - {{ task.name }}
        <button @click="removeTask()">
          complete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	name: 'Tasks',
	props: {

	}
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
