<template>
  <div>
    <button
      @click="toggleLang"
      class="flex items-center gap-3 rounded-xl border border-[#15c472] px-5 py-2 text-sm text-dark/70"
    >
      {{ locale === "ar" ? "EN" : "عربي" }}
      <img src="/icons/translate-icon.svg" class="w-5 h-5" alt="translate" />
    </button>
  </div>
</template>

<script setup>
const { locale, setLocale } = useI18n();

// toggle language function
const toggleLang = () => {
  const newLang = locale.value === "ar" ? "en" : "ar";
  setLocale(newLang);
};
</script>

<style scoped></style>
