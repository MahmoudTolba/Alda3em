<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ title }}</Title>

      <!-- i18n SEO -->
      <template v-for="link in head.link" :key="link.id">
        <Link v-bind="link" />
      </template>

      <template v-for="meta in head.meta" :key="meta.id">
        <Meta v-bind="meta" />
      </template>
    </Head>

    <Body class="bg-[#F2F2F2] font-tajawal">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute();

// locale head
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

// dynamic page title
const title = computed(() => {
  return t(route.meta.title ?? "") + " - " + t("site.title");
});
</script>

<style lang="scss" scoped>
.layout-content {
  @apply flex flex-col min-h-screen;

  main {
    @apply flex-1;
  }
}

@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');

</style>
