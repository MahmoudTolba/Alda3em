<template>
  <div class="p-4 sm:p-6 lg:p-10">
    <div class="mb-6 sm:mb-8 lg:mb-10 text-right">
      <h1 class="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-2">لوحة التحكم</h1>
      <p class="text-sm sm:text-base text-[#64748b]">مرحباً بك، إليك نظرة عامة على أداء متجرك</p>
    </div>

    <div class="flex justify-end mb-6 sm:mb-8">
      <div class="bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-sm border border-gray-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-5 w-full sm:w-auto" dir="rtl">
        <span class="text-[#94a3b8] text-xs sm:text-sm font-medium text-center sm:text-right">عرض عمليات التحقق:</span>
        <div class="flex gap-2 p-1 sm:p-1.5 rounded-lg sm:rounded-xl overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.text"
            type="button"
            class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md sm:rounded-lg transition-all whitespace-nowrap flex-shrink-0"
            :class="
              activeTab === tab.text
                ? 'bg-[#2564EB] text-white shadow-lg shadow-blue-200 font-bold'
                : 'bg-gray-50 text-[#374151] hover:bg-gray-50 hover:text-[#374151] font-medium'
            "
            @click="activeTab = tab.text"
          >
            <component 
              :is="tab.icon" 
              :class="[
                'w-3.5 h-3.5 sm:w-4 sm:h-4',
                activeTab === tab.text ? 'text-white' : 'text-[#374151]'
              ]"
            />
            <span>{{ tab.text }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <StatCard
        title="عدد العملاء"
        value="1,247"
        sub="استخدموا الخصم هذا الشهر"
        change="+12.5%"
        :icon="IconUser"
        color="blue"
      />
      <StatCard
        title="عمليات التحقق"
        value="127"
        sub="عمليات اليوم"
        change="+15.3%"
        :icon="IconShieldCheck"
        color="blue"
      />
      <StatCard
        title="العروض الفعالة"
        value="24"
        sub="عرض نشط حالياً"
        change="+3"
        :icon="IconTag"
        color="blue"
      />
    
      <StatCard
        title="متوسط التقييم"
        value="4.8"
        sub="من أصل 5 نجوم"
        change="+0.31"
        :icon="IconStar"
        color="blue"
      />
     
    </div>
  </div>
</template>

<script setup>
// Define Icon Components
const IconCalendar = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  `,
});

const IconShieldCheck = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="M9 12l2 2 4-4"></path>
    </svg>
  `,
});

const IconUser = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  `,
});

const IconStar = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  `,
});

const IconTag = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  `,
});

// Update tabs data to include icons and match visual order from right to left
const tabs = [
  { text: "يومياً", icon: IconCalendar },
  { text: "أسبوعياً", icon: IconCalendar },
  { text: "شهرياً", icon: IconCalendar },
];

const activeTab = ref("يومياً");
</script>
