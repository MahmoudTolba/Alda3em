<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
      <p class="text-gray-500">مرحباً بك، إليك نظرة عامة على أداء متجرك</p>
    </div>

    <div class="bg-white p-2 rounded-xl border border-gray-100 inline-flex gap-2 mb-8">
      <button
        v-for="t in tabs"
        :key="t"
        type="button"
        class="px-6 py-2 rounded-lg transition"
        :class="
          activeTab === t
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-500 hover:bg-gray-50'
        "
        @click="activeTab = t"
      >
        {{ t }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatCard
        title="عمليات التحقق"
        value="127"
        sub="عمليات اليوم"
        change="+15.3%"
        icon="chart"
        color="blue"
      />
      <StatCard
        title="عدد العملاء"
        value="1,247"
        sub="استخدموا المتجر هذا الشهر"
        change="+12.5%"
        icon="users"
        color="blue"
      />
      <StatCard
        title="متوسط التقييم"
        value="4.8"
        sub="من أصل 5 نجوم"
        change="+0.5"
        icon="star"
        color="blue"
      />
      <StatCard
        title="العروض الفعالة"
        value="24"
        sub="عرض نشط حالياً"
        change="+3"
        icon="tag"
        color="blue"
      />
    </div>
  </div>
</template>

<script setup>
const tabs = ["يومياً", "أسبوعياً", "شهرياً"];
const activeTab = ref("يومياً");
</script>
