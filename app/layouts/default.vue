<template>
  <div class="h-screen bg-gray-50 flex font-sans overflow-hidden" dir="ltr">
    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Main -->
    <main class="flex-1 min-w-0 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
        <button
          @click="sidebarOpen = true"
          class="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div class="flex items-center gap-3 sm:gap-4 flex-1 justify-start">
          <!-- <LayoutLang customClass="" /> -->

          <div class="flex items-center gap-3">
            <div class="text-right hidden sm:block">
              <p class="text-sm font-bold text-gray-800">محمد أحمد</p>
              <p class="text-xs text-gray-500">مدير المتجر</p>
            </div>
            <div
              class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold"
            >
              م
            </div>
          </div>
          <div class="relative cursor-pointer">
            <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto bg-[#FFFBF5]">
        <slot />
      </div>
    </main>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:static inset-y-0 right-0 w-64 bg-white border-l border-gray-200 flex flex-col flex-shrink-0 overflow-hidden z-50 transform transition-transform duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      ]"
    >
      <div class="p-4 lg:p-6 flex justify-between items-center lg:justify-center">
        <img src="/imgs/logo-transperant.png" alt="Logo" class="h-24 sm:h-32 lg:h-40 w-auto object-contain" />
        <button
          @click="sidebarOpen = false"
          class="lg:hidden p-2 rounded-lg hover:bg-gray-100 flex-shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="flex-1 px-4 space-y-2 overflow-auto">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          class="flex flex-row-reverse items-center gap-3 p-3 rounded-lg transition"
          :class="
            route.path === item.to
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          "
          @click="sidebarOpen = false"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span class="flex-1 text-right">{{ item.text }}</span>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-gray-100">
        <button
          type="button"
          class="flex flex-row-reverse items-center gap-3 p-3 text-red-500 w-full hover:bg-red-50 rounded-lg transition"
        >
          <IconLogout class="w-5 h-5" />
          <span class="flex-1 text-right">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
const route = useRoute();
const sidebarOpen = ref(false);

// Close sidebar on route change (mobile)
watch(() => route.path, () => {
  sidebarOpen.value = false;
});

const IconDashboard = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  `,
});

const IconStore = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M9 22V12h6v10" />
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

const IconCheck = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  `,
});

const IconHistory = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
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

const IconUsers = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  `,
});

const IconReport = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  `,
});

const IconChat = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  `,
});

const IconSettings = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  `,
});

const IconLogout = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  `,
});

const menuItems = [
  { text: "لوحة التحكم", to: "/", icon: IconDashboard },
  { text: "إدارة المتجر", to: "/store", icon: IconStore },
  { text: "العروض والخصومات", to: "/offers", icon: IconTag },
  { text: "التحقق من العضوية", to: "/verify", icon: IconCheck },
  { text: "سجل العمليات", to: "/history", icon: IconHistory },
  { text: "التقييمات", to: "/ratings", icon: IconStar },
  { text: "إدارة الموظفين", to: "/employees", icon: IconUsers },
  { text: "التقارير", to: "/reports", icon: IconReport },
  { text: "التواصل مع الإدارة", to: "/contact", icon: IconChat },
  { text: "الإعدادات", to: "/settings", icon: IconSettings },
];
</script>
