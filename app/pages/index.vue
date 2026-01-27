<template>
  <div class=" m-8 py-6 px-16">
    <div class="mb-6 sm:mb-8 lg:mb-10 text-right">
      <h1 class="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-2">لوحة التحكم</h1>
      <p class="text-sm sm:text-base text-[#64748b]">مرحباً بك، إليك نظرة عامة على أداء متجرك</p>
    </div>
    <!-- start Tabs -->
    <div class="mb-6 sm:mb-8">
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-start p-3 sm:p-4 bg-white rounded-xl border border-gray-100 shadow-sm gap-3 sm:gap-0" dir="rtl">
        <span class="text-sm font-medium text-gray-500 sm:ml-4 text-center sm:text-right whitespace-nowrap">
          عرض عمليات التحقق:
        </span>
        <div class="flex p-1 rounded-lg gap-1.5 overflow-x-auto sm:overflow-visible -mx-1 sm:mx-0">
          <button
            v-for="tab in tabs"
            :key="tab.text"
            type="button"
            class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap flex-shrink-0"
            :class="
              activeTab === tab.text
                ? 'bg-[#2564EB] text-white shadow-sm'
                : 'bg-[#F3F4F6] text-gray-600 hover:bg-gray-100'
            "
            @click="activeTab = tab.text"
          >
            <component 
              :is="tab.icon" 
              :class="[
                'h-3.5 w-3.5 sm:h-4 sm:w-4',
                activeTab === tab.text ? 'text-white' : 'text-gray-600'
              ]"
            />
            <span>{{ tab.text }}</span>
          </button>
        </div>
      </div>
    </div>
    <!-- end Tabs -->
     
    <!-- start Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <StatCard
        title="عدد العملاء"
        :value="statsData.customers.value"
        :sub="statsData.customers.sub"
        :change="statsData.customers.change"
        :icon="IconUser"
        color="blue"
      />
      <StatCard
        title="عمليات التحقق"
        :value="statsData.verifications.value"
        :sub="statsData.verifications.sub"
        :change="statsData.verifications.change"
        :icon="IconShieldCheck"
        color="blue"
      />
      <StatCard
        title="العروض الفعالة"
        :value="statsData.offers.value"
        :sub="statsData.offers.sub"
        :change="statsData.offers.change"
        :icon="IconTag"
        color="blue"
      />
    
      <StatCard
        title="متوسط التقييم"
        :value="statsData.rating.value"
        :sub="statsData.rating.sub"
        :change="statsData.rating.change"
        :icon="IconStar"
        color="blue"
      />
     
    </div>
    <!-- end Stats Cards -->
  </div>
</template>

<script setup>
// Set page title
useHead({
  title: 'لوحة التحكم'
});

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

// Data for each tab period
const tabData = {
  "يومياً": {
    customers: { value: "127", sub: "عمليات اليوم", change: "+15.3%" },
    verifications: { value: "127", sub: "عمليات اليوم", change: "+15.3%" },
    offers: { value: "8", sub: "عرض نشط اليوم", change: "+2" },
    rating: { value: "4.8", sub: "من أصل 5 نجوم", change: "+0.31" }
  },
  "أسبوعياً": {
    customers: { value: "856", sub: "استخدموا الخصم هذا الأسبوع", change: "+18.2%" },
    verifications: { value: "892", sub: "عمليات هذا الأسبوع", change: "+22.1%" },
    offers: { value: "15", sub: "عرض نشط هذا الأسبوع", change: "+5" },
    rating: { value: "4.7", sub: "من أصل 5 نجوم", change: "+0.15" }
  },
  "شهرياً": {
    customers: { value: "1,247", sub: "استخدموا الخصم هذا الشهر", change: "+12.5%" },
    verifications: { value: "3,542", sub: "عمليات هذا الشهر", change: "+8.7%" },
    offers: { value: "24", sub: "عرض نشط حالياً", change: "+3" },
    rating: { value: "4.8", sub: "من أصل 5 نجوم", change: "+0.31" }
  }
};

// Computed property to get current stats based on active tab
const statsData = computed(() => {
  return {
    customers: tabData[activeTab.value].customers,
    verifications: tabData[activeTab.value].verifications,
    offers: tabData[activeTab.value].offers,
    rating: tabData[activeTab.value].rating
  };
});
</script>
