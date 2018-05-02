<template>
  <div id="app" class="container">
    <CourseTodoEntry />
    <CourseSchedule />
    <Archive />
  </div>
</template>

<script>
import CourseSchedule from './components/CourseSchedule.vue'
import CourseTodoEntry from './components/CourseTodoEntry.vue'
import Archive from './components/Archive.vue'

export default {
  name: 'app',

  // NOTE: The following syntax has been allowed since ES2015
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions
  data () {
    return {
    }
  },
  components: {
    CourseSchedule,
    CourseTodoEntry,
    Archive
  }
}
</script>

<style>
</style>
