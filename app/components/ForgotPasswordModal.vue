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
        class="relative w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-slate-100 px-6 py-10 md:px-10"
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
              d="M6.22 6.22a.75.75 0 0 1 1.06 0L12 10.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L13.06 12l4.72 4.72a.75.75 0 1 1-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 1 1-1.06-1.06L10.94 12 6.22 7.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div class="flex flex-col items-center text-center">
          <div class="flex items-center justify-center w-44 h-30 mb-6">
            <img :src="logoSrc" alt="Logo" class="w-full h-full object-contain" />
          </div>

          <h2 class="text-2xl md:text-3xl font-bold text-[#2b6cb0] mb-3">
            نسيت كلمة المرور ؟
          </h2>
          <p class="text-slate-400 text-sm md:text-base max-w-md mx-auto">
            لا تقلق،سنرسل لك كود تفعيل على رقم جوالك لاعادة تعيين كلمة المرور
          </p>

          <div class="w-full max-w-md mt-10 text-right">
            <label class="block text-sm font-medium text-slate-700 mb-2">
              رقم الجوال
            </label>

            <div class="relative">
              <input
                :value="phone"
                type="text"
                inputmode="tel"
                autocomplete="tel"
                placeholder="05xxxxxxxx"
                class="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       outline-none transition text-right placeholder:text-slate-300"
                @input="onPhoneInput"
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

            <button
              type="button"
              class="mt-10 block w-full max-w-[330px] mx-auto bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white font-medium text-xs md:text-sm py-3
                     rounded-lg shadow-md shadow-blue-100 transition duration-200 ease-out transform
                     hover:from-[#3B7FCF] hover:to-[#2F6BB0] hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-[1px]
                     active:scale-[0.98]"
              @click="submit"
            >
              ارسال رمز
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, onMounted, watch } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  phone: { type: String, default: "" },
  logoSrc: { type: String, default: "/imgs/logo-transperant.png" },
});

const emit = defineEmits(["update:modelValue", "update:phone", "submit"]);

const close = () => emit("update:modelValue", false);

const submit = () => {
  emit("submit", props.phone);
};

const onPhoneInput = (e) => {
  emit("update:phone", e?.target?.value ?? "");
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
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  setBodyScrollLock(false);
});
</script>
