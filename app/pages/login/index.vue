<template>
  <div
    class="min-h-screen bg-[#FFFBF5] flex flex-col items-center justify-center p-4"
    dir="rtl"
  >
    <div
      class="w-full max-w-[450px] bg-white rounded-3xl shadow-sm border border-slate-50 p-8 md:p-12"
    >
      <!-- Logo & Title -->
      <div class="flex flex-col items-center mb-10">
        <div class="flex items-center justify-center w-40 h-40 mb-6">
          <img
            src="/imgs/logo-transperant.png"
            alt="Logo"
            class="w-full h-full object-contain"
          />
        </div>

        <h1 class="text-3xl font-bold text-[#1e293b] mb-2">
          مرحباً بك
        </h1>
        <p class="text-slate-400 text-sm">
          سجل دخولك لإدارة متجرك
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">
            رقم الجوال
          </label>

          <div class="relative">
            <input
              type="text"
              placeholder="05xxxxxxxx"
              class="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     outline-none transition text-right placeholder:text-slate-300"
            />

            <div
              class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">
            كلمة المرور
          </label>

          <div class="relative">
            <input
              type="password"
              placeholder="........"
              class="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     outline-none transition text-right placeholder:text-slate-300"
            />

            <div
              class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <div class="mt-2 text-right">
            <button
              type="button"
              @click="openForgotPassword"
              class="text-sm text-blue-500 hover:underline"
            >
              نسيت كلمة المرور؟
            </button>
          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white font-medium text-xs md:text-sm py-3
                 rounded-xl shadow-md shadow-blue-100 transition duration-200 ease-out transform
                 hover:from-[#3B7FCF] hover:to-[#2F6BB0] hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-[1px]
                 active:translate-y-0 active:scale-[0.98]"
        >
          تسجيل الدخول
        </button>
      </form>
    </div>

    <!-- Footer -->
    <footer class="mt-8 text-slate-400 text-sm">
      جميع الحقوق محفوظة © 2024
    </footer>
  </div>

  <ForgotPasswordModal
    v-model="isForgotPasswordOpen"
    v-model:phone="forgotPhone"
    @submit="sendResetCode"
  />

  <OtpModal
    v-model="isOtpOpen"
    :phone="forgotPhone"
    @verify="verifyResetCode"
  />

  <ResetPasswordModal
    v-model="isResetPasswordOpen"
    @submit="submitNewPassword"
  />

  <SuccessModal
    v-model="isResetSuccessOpen"
    title="اعادة تعيين كلمة المرور بنجاح"
  />
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  layout: false,
});

const router = useRouter();
const isForgotPasswordOpen = ref(false);
const forgotPhone = ref("");
const isOtpOpen = ref(false);
const isResetPasswordOpen = ref(false);
const isResetSuccessOpen = ref(false);

const handleLogin = () => {
  router.push('/')
}

const openForgotPassword = () => {
  isForgotPasswordOpen.value = true;
};

const sendResetCode = (phone) => {
  // TODO: integrate with API / OTP flow
  forgotPhone.value = phone ?? forgotPhone.value;
  isForgotPasswordOpen.value = false;
  isOtpOpen.value = true;
};

const verifyResetCode = ({ code }) => {
  // TODO: verify OTP with API then allow resetting password
  console.log("OTP code:", code);
  isOtpOpen.value = false;
  isResetPasswordOpen.value = true;
};

const submitNewPassword = ({ password, confirmPassword }) => {
  // TODO: send new password to API
  console.log("New password:", password, confirmPassword);
  isResetPasswordOpen.value = false;
  isResetSuccessOpen.value = true;
};
</script>
