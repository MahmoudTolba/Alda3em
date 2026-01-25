<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      @click="close"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/30"></div>

      <!-- Panel -->
      <div
        class="relative w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-100 px-6 py-10 md:px-10"
        @click.stop
      >
        <!-- Close -->
        <button
          type="button"
          class="absolute top-6 right-6 md:top-8 md:right-8 text-red-500 hover:text-red-600 hover:scale-110 transition-transform"
          @click="close"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.22 6.22a.75.75 0 0 1 1.06 0L12 10.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L13.06 12l4.72 4.72a.75.75 0 1 1-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L10.94 12 6.22 7.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div class="flex flex-col items-center text-center" dir="rtl">
          <div class="flex items-center justify-center w-44 h-30 mb-6">
            <img :src="logoSrc" alt="Logo" class="w-full h-full object-contain" />
          </div>

          <h2 class="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            اعادة تعيين كلمة المرور
          </h2>
          <p class="text-slate-400 text-sm md:text-base max-w-md mx-auto">
            ادخل كلمة المرور الجديدة لتأمين حسابك
          </p>

          <div class="w-full max-w-md mt-10 space-y-6 text-right">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                كلمة المرور الجديدة
              </label>
              <div class="relative">
                <input
                  v-model="password"
                  type="password"
                  autocomplete="new-password"
                  placeholder="........"
                  class="w-full pr-10 pl-4 py-3 bg-white border border-slate-200 rounded-xl
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         outline-none transition text-right placeholder:text-slate-300"
                />
                <div class="absolute inset-y-0 right-3 flex items-center text-slate-400">
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
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                تأكيد كلمة المرور
              </label>
              <div class="relative">
                <input
                  v-model="confirmPassword"
                  type="password"
                  autocomplete="new-password"
                  placeholder="........"
                  class="w-full pr-10 pl-4 py-3 bg-white border border-slate-200 rounded-xl
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         outline-none transition text-right placeholder:text-slate-300"
                />
                <div class="absolute inset-y-0 right-3 flex items-center text-slate-400">
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
            </div>

            <button
              type="button"
              class="mt-4 block w-full max-w-[330px] mx-auto bg-[#2F80ED] text-white font-medium text-sm py-3
                     rounded-lg shadow-md shadow-blue-100 transition duration-200 ease-out transform
                     hover:bg-[#256BD1] hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-[1px]
                     active:scale-[0.98]"
              @click="submit"
            >
              تأكيد
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  logoSrc: { type: String, default: "/imgs/logo-transperant.png" },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const password = ref("");
const confirmPassword = ref("");

const close = () => emit("update:modelValue", false);

const submit = () => {
  emit("submit", { password: password.value, confirmPassword: confirmPassword.value });
};

const onKeydown = (e) => {
  if (e.key === "Escape" && props.modelValue) close();
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

const setBodyScrollLock = (locked) => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = locked ? "hidden" : "";
};

watch(
  () => props.modelValue,
  (open) => {
    setBodyScrollLock(open);
    if (open) {
      password.value = "";
      confirmPassword.value = "";
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  setBodyScrollLock(false);
});
</script>
