import Vue from 'vue';
import { seedData } from './seed.js';

const defaultActiveCourse = seedData.find((course) => course.active)

const activeCourseInfo = {
  abbvName: defaultActiveCourse.abbvName,
  fullName: defaultActiveCourse.fullName
}

export const store = {
  state: {
    seedData,
    activeCourseInfo
  },
  getActiveCourse() {
    return this.state.seedData.find((course) => course.active)
  },
  setActiveCourse(courseId) {
    this.state.seedData.forEach((courseObj) => {
      if (courseObj.id === courseId) {
        courseObj.active = true
        this.state.activeCourseInfo.abbvName = courseObj.abbvName
        this.state.activeCourseInfo.fullName = courseObj.fullName
      }
      else {
        courseObj.active = false
      }
    })
  },
  submitTodo(todoDescription) {
    const activeCourse = this.getActiveCourse();
    activeCourse.todos.push({
      description: todoDescription,
      done: false,
      edit: false
    })
  }
}
