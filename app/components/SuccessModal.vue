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
        class="relative w-full max-w-3xl min-h-[400px] bg-white rounded-3xl shadow-xl border border-slate-100 px-6 py-16 md:px-12 md:py-20"
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
          <div
            class="w-28 h-28 rounded-full bg-[#2F80ED] flex items-center justify-center mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-14 w-14 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <h2 class="text-2xl md:text-3xl font-bold text-slate-800">
            {{ title }}
          </h2>

          <p v-if="description" class="mt-3 text-slate-400 text-sm md:text-base">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, onMounted, watch } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: "اعادة تعيين كلمة المرور بنجاح" },
  description: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const close = () => emit("update:modelValue", false);

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
