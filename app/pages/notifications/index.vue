<template>
  <div>
    <PageContainer>
    <div class="max-w-5xl mx-auto" dir="rtl">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div class="flex-1 min-w-0">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f172a] mb-1 sm:mb-2">
            {{ $t('notifications.title') }}
          </h1>
          <p class="text-xs sm:text-sm text-gray-500">
            {{ $t('notifications.unreadCount', { count: unreadCount }) }}
          </p>
        </div>
        <button
          v-if="notifications.length > 0"
          @click="confirmDeleteAll"
          class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-3.5 h-3.5 sm:w-4 sm:h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
          <span class="hidden sm:inline">{{ $t('notifications.deleteAll') }}</span>
          <span class="sm:hidden">حذف الكل</span>
        </button>
      </div>

      <!-- Notifications List -->
      <div class="space-y-3 sm:space-y-4">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 relative"
          :class="!notification.read ? 'bg-blue-50/40 border-blue-100 border-r-4 border-r-blue-500' : 'bg-white border-gray-100'"
        >
          <div class="flex items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-5">
            <!-- Icon -->
            <div
              class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
              :class="notification.iconBg"
            >
              <component :is="notification.icon" class="w-5 h-5 sm:w-6 sm:h-6" :class="notification.iconColor" />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0 overflow-hidden">
              <h3 class="text-sm sm:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2 leading-snug break-words">
                {{ notification.title }}
              </h3>
              <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
                <span class="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span class="truncate">{{ notification.date }}</span>
                </span>
                <span class="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span class="truncate">{{ notification.time }}</span>
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex sm:flex-row flex-col sm:items-center gap-1 sm:gap-2 flex-shrink-0">
              <!-- Mark as Read - Only show on unread notifications -->
              <button
                v-if="!notification.read"
                @click="markAsRead(notification.id)"
                class="p-1.5 sm:p-2 rounded-lg transition-colors text-blue-600 bg-blue-50 hover:bg-blue-100"
                :title="$t('notifications.markAsRead')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 sm:w-5 sm:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </button>

              <!-- Delete -->
              <button
                @click="confirmDeleteNotification(notification.id)"
                class="p-1.5 sm:p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                :title="$t('notifications.delete')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 sm:w-5 sm:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="notifications.length === 0" class="text-center py-16">
          <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-12 h-12 text-gray-400"
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
          <p class="text-gray-500 text-lg font-medium mb-2">{{ $t('notifications.empty') }}</p>
          <p class="text-gray-400 text-sm">{{ $t('notifications.emptyDesc') }}</p>
        </div>
      </div>
    </div>
  </PageContainer>

  <!-- Delete Confirmation Modal - Teleported to body -->
  <Teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
        style="z-index: 9999;"
        @click.self="closeDeleteModal"
      >
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="showDeleteModal"
            class="bg-white rounded-2xl shadow-2xl max-w-md w-full relative"
            dir="rtl"
          >
            <!-- Close Button -->
            <button
              @click="closeDeleteModal"
              class="absolute top-4 left-4 text-red-500 hover:text-red-600 transition-colors z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <!-- Modal Content -->
            <div class="p-8 text-center">
              <!-- Warning Icon -->
              <div class="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-10 h-10 text-red-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>

              <!-- Title -->
              <h2 class="text-2xl font-bold text-gray-900 mb-4">
                {{ deleteModalTitle }}
              </h2>

              <!-- Action Buttons -->
              <div class="flex gap-3 justify-center">
                <!-- Cancel Button -->
                <button
                  @click="closeDeleteModal"
                  class="flex-1 px-6 py-3 bg-white border-2 border-blue-500 text-blue-500 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  تراجع
                </button>

                <!-- Confirm Button -->
                <button
                  @click="confirmDelete"
                  class="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
                >
                  تأكيد
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, defineComponent, markRaw } from 'vue';

// Icons - wrapped with markRaw to prevent reactivity overhead
const IconUser = markRaw(defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  `
}));

const IconStar = markRaw(defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  `
}));

const IconDiamond = markRaw(defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  `
}));

const IconRefresh = markRaw(defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    </svg>
  `
}));

// Notifications data
const notifications = ref([
  {
    id: 1,
    title: 'عميل جديد استخدم خصم العضوية الذهبية',
    date: '2024-01-20',
    time: 'منذ 15 دقيقة',
    read: false,
    icon: IconUser,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 2,
    title: 'تم إضافة تقييم جديد لمتجرك و 5 نجوم',
    date: '2024-01-20',
    time: 'منذ 15 دقيقة',
    read: false,
    icon: IconStar,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    id: 3,
    title: 'عرض "خصم الصيف" سينتهي خلال 3 أيام',
    date: '2024-01-20',
    time: 'منذ 15 دقيقة',
    read: true,
    icon: IconDiamond,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 4,
    title: 'تم تحديث النظام إلى الإصدار 2.5',
    date: '2024-01-20',
    time: 'منذ 15 دقيقة',
    read: true,
    icon: IconRefresh,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 5,
    title: 'عرض "خصم الصيف" سينتهي خلال 3 أيام',
    date: '2024-01-20',
    time: 'منذ 15 دقيقة',
    read: true,
    icon: IconDiamond,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
]);

// Computed
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length;
});

// Modal state
const showDeleteModal = ref(false);
const deleteType = ref('single'); // 'single' or 'all'
const notificationToDelete = ref(null);

const deleteModalTitle = computed(() => {
  return deleteType.value === 'all' 
    ? 'هل تريد حذف جميع الإشعارات؟'
    : 'هل تريد حذف الإشعار؟';
});

// Methods
const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

const confirmDeleteNotification = (id) => {
  deleteType.value = 'single';
  notificationToDelete.value = id;
  showDeleteModal.value = true;
};

const confirmDeleteAll = () => {
  deleteType.value = 'all';
  notificationToDelete.value = null;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  deleteType.value = 'single';
  notificationToDelete.value = null;
};

const confirmDelete = () => {
  if (deleteType.value === 'all') {
    notifications.value = [];
  } else if (notificationToDelete.value !== null) {
    const index = notifications.value.findIndex(n => n.id === notificationToDelete.value);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  }
  closeDeleteModal();
};
useHead({
  title: 'الإشعارات',
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
