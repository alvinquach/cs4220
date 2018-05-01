<template>
<div class="columns">
  <div v-if="!todo.edit" class="column is-four-fifths todo-text">
    <label class="checkbox">
      <input type="checkbox" v-model="todo.done"> <span :class="{done: todo.done}">{{todo.description}}</span>
    </label>
  </div>
  <div v-if="todo.edit" class="column is-four-fifths todo-text">
    <input class="input" type="text" v-model="todo.description" placeholder="Text input">
  </div>
  <div class="column has-text-right">
    <button v-if="todo.edit" class="button is-success is-outlined" @click="editTodo(todo)">
      <span class="icon is-small">
        <i class="fas fa-check"></i>
      </span>
    </button>
    <div v-if="!todo.edit" class="columns action-buttons-container">
      <button class="button is-info is-outlined" @click="editTodo(todo)">
        <span class="icon is-small">
          <i class="far fa-edit"></i>
        </span>
      </button>
      <button class="button is-danger is-outlined" @click="deleteTodo(todo)">
        <span class="icon is-small">
          <i class="far fa-trash-alt"></i>
        </span>
      </button>
    </div>
  </div>
</div>
</template>


<script>
  import { store } from '../store.js';
  export default {
      name: 'CourseTodo',
      data () {
          return {
          }
      },
      props: ['todo', 'course'],
      methods: {
        editTodo(todo) {
          todo.edit = !todo.edit
        },
        deleteTodo(todo) {

        }
      }
  }
</script>

<style>
.todo-text {
  line-height: 40px;
}
.action-buttons-container {
  margin-top: 2px;
}
.action-buttons-container button {
  margin-right: 4px;
}
.done {
  text-decoration: line-through;
}
</style>