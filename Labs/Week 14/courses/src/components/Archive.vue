<template>
    <div class="columns hello">
        <button class="button" @click="archive()" @mouseover="toggleWarning(true)" @mouseout="toggleWarning(false)">
            Archive
        </button>
        <div v-if="displayWarning" class="warning">
            Click to remove all completed tasks.
        </div>
    </div>
</template>

<script>
    import { store } from '../store.js';

    export default {
        name: 'Archive',
        data () {
            return {
                displayWarning: false
            }
        },
        methods: {
            archive() {
                store.archive()
            },
            toggleWarning(value) {
                this.displayWarning = value;
            }
        }
    }
</script>

<style>
    .hello {
        padding: 16px 24px;
    }
    .hello .warning {
        line-height: 36px;
        margin: 0 16px;
        font-size: 0.86rem;
    }
</style>