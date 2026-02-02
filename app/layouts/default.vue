<template>
  <div class="h-screen bg-gray-50 flex font-sans overflow-hidden" dir="ltr">
    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Mobile Notification Menu Overlay -->
    <div
      v-if="notificationMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
      @click="notificationMenuOpen = false"
    ></div>

    <!-- Main -->
    <main class="flex-1 min-w-0 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 lg:px-24 flex-shrink-0">
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
            <div class="relative" ref="notificationContainer">
              <button
                ref="notificationButton"
                @click="toggleNotificationMenu"
                class="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span 
                  v-if="hasUnreadNotifications"
                  class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"
                ></span>
               <img src="/icons/sidebar/notifi.svg" alt="notification" class="w-6 h-6 " />
              </button>

              <!-- Mobile Backdrop -->
              <transition
                enter-active-class="transition-opacity duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-150"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div
                  v-if="notificationMenuOpen"
                  @click="notificationMenuOpen = false"
                  class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
                ></div>
              </transition>

              <!-- Notification Menu Dropdown -->
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
              >
                <div
                  v-if="notificationMenuOpen"
                  ref="notificationMenuRef"
                  class="fixed sm:absolute left-4 right-4 sm:left-0 sm:right-auto top-16 sm:top-full mt-0 sm:mt-2 w-auto sm:w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                  dir="rtl"
                >
                  <!-- Header -->
                  <div class="px-4 py-3.5 bg-gradient-to-l from-blue-50 to-indigo-50 border-b border-gray-100">
                    <div class="flex items-center justify-between gap-3">
                      <h3 class="text-base font-bold text-gray-800 whitespace-nowrap">الإشعارات</h3>
                      <button
                        v-if="hasUnreadNotifications"
                        @click.stop="markAllAsRead"
                        class="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/50 whitespace-nowrap"
                      >
                        تحديد الكل كمقروء
                      </button>
                    </div>
                  </div>

                  <!-- Notifications List -->
                  <div class="max-h-[60vh] sm:max-h-[380px] overflow-y-auto notification-scroll">
                    <div v-if="notifications.length === 0" class="py-16 px-6 text-center">
                      <div class="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-10 h-10 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </div>
                      <p class="text-gray-500 text-sm font-medium">لا توجد إشعارات جديدة</p>
                      <p class="text-gray-400 text-xs mt-2">سيتم إشعارك عند وصول تحديثات جديدة</p>
                    </div>
                    <div v-else>
                      <div
                        v-for="notification in notifications"
                        :key="notification.id"
                        @click="markAsRead(notification.id)"
                        class="px-4 py-3.5 hover:bg-gray-50/80 cursor-pointer transition-all duration-200 border-b border-gray-50 last:border-b-0 group"
                        :class="!notification.read ? 'bg-blue-50/30' : ''"
                      >
                        <div class="flex items-start gap-3 w-full">
                          <div class="flex-shrink-0 mt-1.5">
                            <div
                              class="w-2 h-2 rounded-full transition-all"
                              :class="notification.read ? 'bg-gray-300 scale-75' : 'bg-blue-600 scale-100 ring-4 ring-blue-100'"
                            ></div>
                          </div>
                          <div class="flex-1 min-w-0 overflow-hidden">
                            <h4 class="text-sm font-semibold text-gray-900 mb-1 leading-tight break-words">
                              {{ notification.title }}
                            </h4>
                            <p class="text-[13px] text-gray-600 leading-relaxed mb-2 break-words line-clamp-2">
                              {{ notification.message }}
                            </p>
                            <div class="flex items-center gap-2">
                              <span class="text-xs text-black-400 font-medium">
                                {{ notification.time }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div v-if="notifications.length > 0" class="px-4 py-3 bg-gray-50 border-t border-gray-100">
                    <button
                      @click="viewAllNotifications"
                      class="w-full text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors py-2 rounded-lg hover:bg-blue-50/80"
                    >
                      <span class="flex items-center justify-center gap-1">
                        <span>عرض جميع الإشعارات</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>

          
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-t from-[#FFF8F0] to-white min-w-0">
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
          class="flex flex-row-reverse items-center text-[16px] gap-3 p-3 rounded-lg transition"
          :class="
            route.path === item.to
              ? 'bg-[#357ABD] text-white'
              : 'text-[#1E3A5F] hover:bg-gray-100'
          "
          @click="sidebarOpen = false"
        >
          <component :is="item.icon" :is-active="route.path === item.to" />
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
const notificationMenuOpen = ref(false);
const notificationMenuRef = ref(null);
const notificationButton = ref(null);
const notificationContainer = ref(null);

// Close sidebar on route change (mobile)
watch(() => route.path, () => {
  sidebarOpen.value = false;
});

// Notifications data
const notifications = ref([
  {
    id: 1,
    title: 'طلب جديد',
    message: 'تم استلام طلب جديد من العميل محمد أحمد',
    time: 'منذ 5 دقائق',
    read: false
  },
  {
    id: 2,
    title: 'تحديث النظام',
    message: 'تم تحديث النظام بنجاح. جميع الميزات الجديدة متاحة الآن',
    time: 'منذ ساعة',
    read: false
  },
  {
    id: 3,
    title: 'تذكير',
    message: 'لا تنسى مراجعة التقارير الأسبوعية',
    time: 'منذ يومين',
    read: true
  },
  {
    id: 4,
    title: 'رسالة جديدة',
    message: 'لديك رسالة جديدة من فريق الدعم',
    time: 'منذ 3 أيام',
    read: true
  }
]);

// Toggle notification menu
const toggleNotificationMenu = () => {
  notificationMenuOpen.value = !notificationMenuOpen.value;
};

// Mark notification as read
const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

// Mark all notifications as read
const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true;
  });
};

// Check if there are unread notifications
const hasUnreadNotifications = computed(() => {
  return notifications.value.length > 0 && notifications.value.some(notification => !notification.read);
});

// View all notifications
const viewAllNotifications = () => {
  notificationMenuOpen.value = false;
  navigateTo('/notifications');
};

// Handle click outside notification menu
const handleClickOutside = (event) => {
  if (notificationContainer.value && !notificationContainer.value.contains(event.target)) {
    notificationMenuOpen.value = false;
  }
};

// Handle escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && notificationMenuOpen.value) {
    notificationMenuOpen.value = false;
  }
};

// Setup event listeners
onMounted(() => {
  if (process.client) {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
  }
});

// Cleanup event listeners
onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEscapeKey);
  }
});

const IconDashboard = defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <img :src="isActive ? '/icons/sidebar/white-home.png' : '/icons/sidebar/dark-home.png'" alt="dashboard" class="w-4 h-4" />
  `,
});

const IconStore = defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <img :src="isActive ? '/icons/sidebar/white-store.png' : '/icons/sidebar/dark-store.png'" alt="store" class="w-4 h-4" />
  `,
});

const IconTag = defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <img :src="isActive ? '/icons/sidebar/white-offer.png' : '/icons/sidebar/dark-offer.png'" alt="offers" class="w-4 h-4" />
  `,
});

const IconCheck = defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  template: `
   <img :src="isActive ? '/icons/sidebar/white-verify.png' : '/icons/sidebar/dark-verify.png'" alt="verify" class="" />
  `,
});

const IconHistory = defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <img :src="isActive ? '/icons/sidebar/white-history.png' : '/icons/sidebar/dark-history.png'" alt="history" class="w-4 h-4" />
  `,
});

const IconStar = defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <img :src="isActive ? '/icons/sidebar/white-ratings.png' : '/icons/sidebar/dark-ratings.png'" alt="rating" class="" />
  `,
});

const IconUsers = defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <img :src="isActive ? '/icons/sidebar/white-employes.png' : '/icons/sidebar/dark-employes.png'" alt="users" class="" />
  `,
});

const IconReport = defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <img :src="isActive ? '/icons/sidebar/white-reports.png' : '/icons/sidebar/dark-reports.png'" alt="report" class="" />
  `,
});

const IconChat = defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <img :src="isActive ? '/icons/sidebar/white-contact.png' : '/icons/sidebar/dark-contact.png'" alt="chat" class="" />
  `,
});

const IconSettings = defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <img :src="isActive ? '/icons/sidebar/white-settings.png' : '/icons/sidebar/dark-settings.png'" alt="settings" class="" />
  `,
});

// const IconNotification = defineComponent({
//   template: `
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//       <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
//       <path d="M13.73 21a2 2 0 01-3.46 0" />
//     </svg>
//   `,
// });

const IconLogout = defineComponent({
  template: `
    <img src="/icons/sidebar/logout-icon.png" alt="logout" class="" />
  `,
});

const menuItems = [
  { text: "لوحة التحكم", to: "/", icon: IconDashboard },
  { text: "إدارة المتجر", to: "/storeManagment", icon: IconStore },
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

<style scoped>
/* Hide scrollbar for notifications */
.notification-scroll {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.notification-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Line clamp for notification messages */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-word;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ensure RTL text displays properly */
[dir="rtl"] {
  text-align: right;
}

/* Prevent text overflow */
.break-words {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

/* Ensure notification container doesn't overflow */
.overflow-hidden {
  overflow: hidden;
}

.min-w-0 {
  min-width: 0;
}
</style>
