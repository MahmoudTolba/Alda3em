<template>
  <div class="m-4 sm:m-6 md:m-8 py-4 sm:py-6 px-4 sm:px-8 md:px-16 max-w-full overflow-x-hidden">
    <div class="max-w-2xl mx-auto">
      <!-- Page Header -->
      <div class="text-center mb-8 sm:mb-12">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-2 sm:mb-3">
          التحقق من العضوية
        </h1>
        <p class="text-sm sm:text-base text-[#64748b]">
          تحقق من صحة عضوية العميل وعرض تفاصيل البطاقة الرقمية
        </p>
      </div>

      <!-- Shield Icon -->
      <div class="flex justify-center mb-8 sm:mb-10">
        <div class="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center">
          <Icon name="ph:shield-check" class="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
        </div>
      </div>

      <!-- Search Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10" dir="rtl">
        <h2 class="text-xl sm:text-2xl font-bold text-[#1E3A5F] text-center mb-6 sm:mb-8">
          البحث عن العضوية
        </h2>

        <!-- Search Type Tabs -->
        <div class="flex gap-3 mb-6 justify-center">
          <button
            @click="searchType = 'phone'"
            class="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base"
            :class="searchType === 'phone' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          >
            <Icon name="ph:phone" class="w-5 h-5" />
            <span>رقم الجوال</span>
          </button>
          
          <button
            @click="searchType = 'membership'"
            class="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base"
            :class="searchType === 'membership' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          >
            <Icon name="ph:card" class="w-5 h-5" />
            <span>رقم العضوية</span>
          </button>
        </div>

        <!-- Search Input -->
        <div class="flex gap-3 items-stretch">
          <button
            @click="handleSearch"
            :disabled="!searchQuery || isSearching"
            class="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Icon 
              :name="isSearching ? 'ph:circle-notch' : 'ph:magnifying-glass'" 
              class="w-5 h-5"
              :class="isSearching ? 'animate-spin' : ''"
            />
            <span>بحث</span>
          </button>

          <div class="flex-1 relative">
            <input
              v-model="searchQuery"
              :type="searchType === 'phone' ? 'tel' : 'text'"
              :placeholder="searchType === 'phone' ? '0559876543' : 'أدخل رقم العضوية'"
              class="w-full h-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-right"
              @keyup.enter="handleSearch"
            />
            <Icon 
              :name="searchType === 'phone' ? 'ph:phone' : 'ph:card'" 
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
            />
          </div>
        </div>
      </div>

      <!-- Search Results -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div v-if="searchResult" class="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8" dir="rtl">
          <!-- Success Result -->
          <div v-if="searchResult.found" class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ph:check-circle" class="w-10 h-10 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">تم العثور على العضوية</h3>
            <p class="text-gray-600 mb-6">{{ searchResult.message }}</p>
            
            <!-- Member Details -->
            <div class="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white text-right mb-4">
              <div class="flex items-start justify-between mb-6">
                <div>
                  <p class="text-blue-100 text-sm mb-1">اسم العضو</p>
                  <h4 class="text-2xl font-bold">{{ searchResult.member.name }}</h4>
                </div>
                <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="ph:user" class="w-7 h-7" />
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p class="text-blue-100 text-xs mb-1">رقم الجوال</p>
                  <p class="font-semibold">{{ searchResult.member.phone }}</p>
                </div>
                <div>
                  <p class="text-blue-100 text-xs mb-1">رقم العضوية</p>
                  <p class="font-semibold">{{ searchResult.member.membershipId }}</p>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-blue-100 text-xs mb-1">نوع العضوية</p>
                  <p class="font-semibold">{{ searchResult.member.membershipType }}</p>
                </div>
                <div>
                  <p class="text-blue-100 text-xs mb-1">تاريخ الانتهاء</p>
                  <p class="font-semibold">{{ searchResult.member.expiryDate }}</p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 justify-center">
              <button
                class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                عرض التفاصيل الكاملة
              </button>
              <button
                @click="resetSearch"
                class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                بحث جديد
              </button>
            </div>
          </div>

          <!-- Not Found Result -->
          <div v-else class="text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ph:x-circle" class="w-10 h-10 text-red-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">لم يتم العثور على العضوية</h3>
            <p class="text-gray-600 mb-6">{{ searchResult.message }}</p>
            
            <button
              @click="resetSearch"
              class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              بحث مرة أخرى
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Page metadata
definePageMeta({
  title: 'verify',
  layout: 'default',
});

// State
const searchType = ref('phone'); // 'phone' or 'membership'
const searchQuery = ref('');
const isSearching = ref(false);
const searchResult = ref(null);

// Mock member data for demonstration
const mockMembers = [
  {
    phone: '0559876543',
    membershipId: 'MEM-12345',
    name: 'أحمد محمد العلي',
    membershipType: 'ذهبية',
    expiryDate: '2025-12-31'
  },
  {
    phone: '0551234567',
    membershipId: 'MEM-67890',
    name: 'فاطمة خالد السعيد',
    membershipType: 'فضية',
    expiryDate: '2025-06-30'
  }
];

// Handle search
const handleSearch = async () => {
  if (!searchQuery.value) return;
  
  isSearching.value = true;
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Search for member
  const member = mockMembers.find(m => 
    searchType.value === 'phone' 
      ? m.phone === searchQuery.value 
      : m.membershipId === searchQuery.value
  );
  
  if (member) {
    searchResult.value = {
      found: true,
      message: 'العضوية صالحة ونشطة',
      member
    };
  } else {
    searchResult.value = {
      found: false,
      message: searchType.value === 'phone' 
        ? 'لا توجد عضوية مرتبطة برقم الجوال المدخل'
        : 'رقم العضوية غير صحيح أو غير موجود'
    };
  }
  
  isSearching.value = false;
};

// Reset search
const resetSearch = () => {
  searchQuery.value = '';
  searchResult.value = null;
};
</script>

<style scoped>
/* Spin animation for loading icon */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
