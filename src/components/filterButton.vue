<script setup lang="ts">
// simple button component used for wine category filtering. emits the selected category to the parent.
defineProps({
  category: String,
  selected: String
});

defineEmits(["select"]);
</script>

<template>
  <!-- button for category selection, emits selection back to parent on click -->
  <button @click="$emit('select', category)"
    class="px-4 py-2 border rounded-lg transition-all duration-300 hover:bg-gray-500" :class="{
      'bg-gray-300 text-black': selected !== category,
      'bg-gray-700 text-white': selected === category,
    }">
    {{ category }}
  </button>
</template>
