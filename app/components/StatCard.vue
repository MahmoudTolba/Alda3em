<template>
  <div
    class="bg-white p-5 sm:p-7 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] border border-gray-100 flex items-start gap-3 sm:gap-4"
    
  >
    <div
      class="p-3 sm:p-4 rounded-xl flex items-center justify-center flex-shrink-0"
      :class="iconBgClass"
    >
      <component :is="iconComponent" class="w-6 h-6 sm:w-7 sm:h-7" />
    </div>
    <div class="text-right flex-1 flex flex-col items-end min-w-0">
      <p class="text-[#8b93a7] text-sm font-medium mb-1">{{ title }}</p>
      <h3 class="text-2xl sm:text-3xl font-bold text-[#1e293b] leading-tight">{{ value }}</h3>
      <div class="flex flex-col items-end gap-1 mt-3 sm:mt-4">
        <span class="text-[#94a3b8] text-xs font-medium">{{ sub }}</span>
        <span v-if="change" class="text-[#22c55e] text-sm font-bold flex items-center gap-0.5">
          {{ change }}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M5 15l7-7 7 7" />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  value: { type: String, required: true },
  sub: { type: String, default: "" },
  change: { type: String, default: "" },
  icon: { type: [String, Object], default: "chart" },
  color: { type: String, default: "blue" },
});

const iconBgClass = computed(() => {
  const colors = {
    blue: "bg-[#eef5ff] text-[#4285f4]",
    green: "bg-green-50 text-green-500",
    purple: "bg-purple-50 text-purple-500",
    orange: "bg-orange-50 text-orange-500",
  };
  return colors[props.color] || colors.blue;
});

const iconComponent = computed(() => {
  // If icon is already a component, return it directly
  if (typeof props.icon === 'object' && props.icon !== null) {
    return props.icon;
  }
  
  // Otherwise, use string-based icon mapping
  const icons = {
    chart: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </svg>
      `,
    },
    users: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      `,
    },
    star: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      `,
    },
    tag: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      `,
    },
  };
  return icons[props.icon] || icons.chart;
});
</script>
