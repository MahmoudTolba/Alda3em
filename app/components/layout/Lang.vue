<template>
  <div class="relative inline-block text-left" :class="props.customClass">
    <!-- Trigger Button -->
    <button
      type="button"
      @click.stop="toggle()"
      class="flex-center gap-2 w-11 h-11 rounded-full border border-primary/50 p-2 hover:shadow transition-all"
      aria-haspopup="listbox"
      :aria-expanded="open ? 'true' : 'false'"
    >
      <!-- <img src="/imgs/lang.svg" alt="lang" class="w-4 h-4" /> -->
    </button>

    <!-- Dropdown -->
    <div
      v-if="open"
      class="absolute right-0 z-30 mt-2 w-56 origin-top-right rounded-lg bg-white p-2 shadow-xl ring-1 ring-black/5 focus:outline-none"
      @click.stop
    >
      <div class="px-2 py-1 text-xs font-medium text-gray-500">
        {{ t("common.choose_language") }}
      </div>
      <ul class="max-h-72 overflow-auto py-1" role="listbox">
        <li
          v-for="l in allLocales"
          :key="l.code"
          role="option"
          :aria-selected="l.code === locale"
          @click="onSelect(l.code)"
          class="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-gray-100"
          :class="l.code === locale ? 'bg-gray-100' : ''"
        >
          <!-- <img src="/imgs/lang.svg" alt="lang" class="w-4 h-4" /> -->
          <span class="flex-1">{{ l.name }}</span>
          <span v-if="l.code === locale" class="text-primary">✔</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { locale: currentLocale, locales, setLocale, t } = useI18n();

const props = defineProps({
  customClass: {
    type: String,
    default: "",
  },
});

const open = ref(false);
const toggle = () => (open.value = !open.value);
const close = () => (open.value = false);

const allLocales = computed(() => locales.value);
const locale = computed(() => currentLocale.value);

function onSelect(code) {
  if (code !== currentLocale.value) {
    setLocale(code);
  }
  close();
}

// Simple flag mapping using emoji to avoid external assets
function flagEmoji(code) {
  switch (code) {
    case "ar":
      return "🇸🇦"; // Arabic (Saudi Arabia)
    case "cs":
      return "🇨🇿"; // Czech
    case "en":
      return "🇺🇸"; // English
    case "fr":
      return "🇫🇷"; // French
    case "de":
      return "🇩🇪"; // German
    case "fa":
      return "🇮🇷"; // Persian (Iran)
    case "hi":
      return "🇮🇳"; // Hindi (India)
    case "ru":
      return "🇷🇺"; // Russian
    case "es":
      return "🇪🇸"; // Spanish
    case "tr":
      return "🇹🇷"; // Turkish
    default:
      return "🌐";
  }
}

// Close when clicking outside
onMounted(() => {
  const handler = (e) => {
    // if clicked outside this component, close
    if (!e.target.closest) return;
    // Note: since this component is self-contained, relying on stopPropagation on menu
    if (open.value) close();
  };
  window.addEventListener("click", handler);
  onBeforeUnmount(() => window.removeEventListener("click", handler));
});
</script>

<style lang="scss" scoped></style>
