<template>
  <div
    class="min-h-screen bg-[#FFFBF5] flex flex-col items-center justify-center p-4"
    dir="rtl"
  >
    <div
      class="w-full max-w-[500px] bg-white rounded-3xl shadow-sm border border-slate-50 p-8 md:p-12 text-center"
    >
      <!-- Error Icon -->
      <div class="flex flex-col items-center mb-8">
        <div class="w-32 h-32 mb-6 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <!-- Error Code -->
        <h1 class="text-6xl font-bold text-[#1e293b] mb-4">
          {{ error.statusCode || 'خطأ' }}
        </h1>

        <!-- Error Message -->
        <h2 class="text-2xl font-bold text-[#1e293b] mb-3">
          {{ errorTitle }}
        </h2>
        <p class="text-slate-500 text-base mb-8">
          {{ errorMessage }}
        </p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="handleGoHome"
          class="px-6 py-3 bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white font-medium rounded-xl shadow-md shadow-blue-100 transition duration-200 ease-out transform hover:from-[#3B7FCF] hover:to-[#2F6BB0] hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]"
        >
          العودة للصفحة الرئيسية
        </button>
        <button
          @click="handleGoBack"
          class="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-medium rounded-xl transition duration-200 ease-out transform hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]"
        >
          العودة للخلف
        </button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-8 text-slate-400 text-sm">
      جميع الحقوق محفوظة © 2024
    </footer>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
});

// Set page title
useHead({
  title: `خطأ ${props.error.statusCode || ''}`
});

const router = useRouter();

// Error messages based on status code
const errorMessages = {
  404: {
    title: 'الصفحة غير موجودة',
    message: 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
  },
  500: {
    title: 'خطأ في الخادم',
    message: 'حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.'
  },
  403: {
    title: 'غير مصرح',
    message: 'ليس لديك صلاحية للوصول إلى هذه الصفحة.'
  },
  401: {
    title: 'غير مصرح',
    message: 'يجب تسجيل الدخول للوصول إلى هذه الصفحة.'
  }
};

// Get error title and message
const errorTitle = computed(() => {
  return errorMessages[props.error.statusCode]?.title || 'حدث خطأ';
});

const errorMessage = computed(() => {
  return errorMessages[props.error.statusCode]?.message || props.error.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
});

// Navigation handlers
const handleGoHome = () => {
  clearError({ redirect: '/' });
};

const handleGoBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    handleGoHome();
  }
};
</script>
