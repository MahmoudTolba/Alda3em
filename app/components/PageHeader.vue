<template>
  <div 
    class="mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-right"
  >
    <h1 
      class="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f172a] mb-2 break-words"
      :class="titleClass"
    >
      {{ title }}
    </h1>
    <p 
      v-if="subtitle"
      class="text-xs sm:text-sm md:text-base text-[#64748b] break-words"
      :class="subtitleClass"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  titleClass: {
    type: String,
    default: ''
  },
  subtitleClass: {
    type: String,
    default: ''
  }
});
</script>
