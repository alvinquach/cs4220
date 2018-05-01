<template>
<div class="columns">
  <div v-if="!todo.edit" class="column is-four-fifths">
    <label class="checkbox">
      <input type="checkbox" v-model="todo.done"> <span :class="{done: todo.done}">{{todo.description}}</span>
    </label>
  </div>
  <div v-if="todo.edit" class="column is-four-fifths">
    Editing...
  </div>
  <div class="column has-text-right">
    <button v-if="todo.edit" class="button" @click="editTodo(todo)">
      <span class="icon is-small">
        <i class="fas fa-italic"></i>
      </span>
    </button>
    <div style="display: flex">
      <button v-if="!todo.edit" class="button" @click="editTodo(todo)">
        <span class="icon is-small">
          <i class="fas fa-underline"></i>
        </span>
      </button>
      <button v-if="!todo.edit" class="button" @click="deleteTodo(todo)">Delete</button>
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
.fa-trash {
    color: red;
}
.done {
  text-decoration: line-through;
}
</style>