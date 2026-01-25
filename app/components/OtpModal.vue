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

          <h2 class="text-2xl md:text-3xl font-bold text-[#2b6cb0] mb-3">
            أدخل رمز التفعيل
          </h2>
          <p class="text-slate-400 text-sm md:text-base max-w-md mx-auto">
            تم إرسال رمز التفعيل إلى رقم جوالك
            <span v-if="phone" class="font-medium text-slate-500">({{ phone }})</span>
          </p>

          <div class="w-full max-w-md mt-10 text-right">
            <label class="block text-sm font-medium text-slate-700 mb-3 text-center">
              رمز التفعيل
            </label>

            <div
              class="flex items-center justify-center gap-4"
              dir="ltr"
              @paste.prevent="onPaste"
            >
              <input
                v-for="(_, idx) in otpLength"
                :key="idx"
                :ref="(el) => setInputRef(el, idx)"
                :value="digits[idx]"
                type="text"
                inputmode="numeric"
                autocomplete="one-time-code"
                maxlength="1"
                class="h-14 w-14 rounded-xl border text-center text-xl outline-none transition
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="
                  digits[idx] || focusedIndex === idx
                    ? 'bg-white border-slate-200 text-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-400'
                "
                @input="(e) => onDigitInput(e, idx)"
                @keydown="(e) => onDigitKeydown(e, idx)"
                @focus="focusedIndex = idx"
                @blur="() => (focusedIndex === idx ? (focusedIndex = -1) : null)"
              />
            </div>

            <p class="mt-6 text-center text-sm text-slate-400">
              <span v-if="secondsLeft > 0">
                إعادة ارسال في <span class="text-blue-600 font-medium">{{ secondsLeft }}</span> ثانية
              </span>
              <button
                v-else
                type="button"
                class="text-blue-600 hover:underline font-medium"
                @click="resend"
              >
                إعادة إرسال الرمز
              </button>
            </p>

            <button
              type="button"
              class="mt-10 block w-full max-w-[330px] mx-auto bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white font-medium text-xs md:text-sm py-3
                     rounded-lg shadow-md shadow-blue-100 transition duration-200 ease-out transform
                     hover:from-[#3B7FCF] hover:to-[#2F6BB0] hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-[1px]
                     active:scale-[0.98]"
              @click="verify"
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
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  phone: { type: String, default: "" },
  logoSrc: { type: String, default: "/imgs/logo-transperant.png" },
  otpLength: { type: Number, default: 4 },
  resendSeconds: { type: Number, default: 60 },
});

const emit = defineEmits(["update:modelValue", "verify", "resend"]);

const digits = ref([]);
const inputs = ref([]);
const focusedIndex = ref(-1);
const secondsLeft = ref(0);
let countdownTimer = null;

const close = () => emit("update:modelValue", false);

const verify = () => {
  emit("verify", { phone: props.phone, code: digits.value.join("") });
};

const resend = () => {
  if (secondsLeft.value > 0) return;
  emit("resend", props.phone);
  startCountdown();
};

const onKeydown = (e) => {
  if (e.key === "Escape" && props.modelValue) close();
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

const setInputRef = (el, idx) => {
  if (!el) return;
  inputs.value[idx] = el;
};

const onlyDigit = (value) => (value ?? "").toString().replace(/\D/g, "");

const focusIndex = (idx) => {
  const el = inputs.value[idx];
  if (el && typeof el.focus === "function") el.focus();
};

const onDigitInput = (e, idx) => {
  const raw = onlyDigit(e?.target?.value ?? "");
  const val = raw.slice(-1); // keep last typed digit
  digits.value[idx] = val;

  if (val && idx < props.otpLength - 1) focusIndex(idx + 1);
};

const onDigitKeydown = (e, idx) => {
  if (e.key === "Backspace") {
    if (digits.value[idx]) {
      digits.value[idx] = "";
      return;
    }
    if (idx > 0) focusIndex(idx - 1);
    return;
  }

  // block non-digit single key presses
  if (e.key?.length === 1 && !/^\d$/.test(e.key)) e.preventDefault();
};

const onPaste = (e) => {
  const text = onlyDigit(e?.clipboardData?.getData("text") ?? "");
  if (!text) return;

  const chars = text.slice(0, props.otpLength).split("");
  for (let i = 0; i < props.otpLength; i++) digits.value[i] = chars[i] ?? "";

  const next = Math.min(chars.length, props.otpLength - 1);
  focusIndex(next);
};

const stopCountdown = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
};

const startCountdown = () => {
  stopCountdown();
  secondsLeft.value = props.resendSeconds;
  countdownTimer = setInterval(() => {
    secondsLeft.value = Math.max(0, secondsLeft.value - 1);
    if (secondsLeft.value === 0) stopCountdown();
  }, 1000);
};

const setBodyScrollLock = (locked) => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = locked ? "hidden" : "";
};

watch(
  () => props.modelValue,
  (open) => {
    setBodyScrollLock(open);
    if (open) {
      digits.value = Array.from({ length: props.otpLength }, () => "");
      startCountdown();
      nextTick(() => focusIndex(0));
    } else {
      stopCountdown();
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  setBodyScrollLock(false);
  stopCountdown();
});
</script>
