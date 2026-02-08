<template>
  <div class="m-4 sm:m-6 md:m-8 py-4 sm:py-6 px-4 sm:px-8 md:px-16 max-w-full overflow-x-hidden">
    <!-- Page Header -->
    <div class="mb-6 sm:mb-8 text-right">
      <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-1 sm:mb-2 break-words">
        سجل العمليات
      </h1>
      <p class="text-sm sm:text-sm md:text-base text-[#1E3A5F]/80 break-words">
        استعراض جميع الخصومات المستخدمة داخل المتجر
      </p>
    </div>

    <!-- White Content Card -->
    <div
      class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6 md:p-8 max-w-full overflow-hidden"
      dir="rtl"
    >
      <!-- Filters and Search (RTL: membership → discount → date → order → search) -->
      <div
        class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 items-stretch sm:items-center justify-end"
      >
        <!-- Membership dropdown (rightmost in RTL) -->
        <div class="flex items-center gap-2 shrink-0">
          <label class="text-sm font-medium text-gray-700 whitespace-nowrap">العضوية:</label>
          <select
            v-model="membershipFilter"
            class="px-3 py-2.5 sm:py-3 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-700 bg-[#CCCCCC] min-w-[100px] focus:outline-none focus:ring-2 focus:ring-[#2564EB]/30 focus:border-[#2564EB]"
          >
            <option value="all">الكل</option>
            <option value="gold">ذهبية</option>
            <option value="silver">فضية</option>
            <option value="bronze">برونزية</option>
          </select>
        </div>

        <!-- Discount dropdown -->
        <div class="flex items-center gap-2 shrink-0">
          <label class="text-sm font-medium text-gray-700  whitespace-nowrap">الخصم:</label>
          <select
            v-model="discountFilter"
            class="px-3 py-2.5 sm:py-3 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-700 bg-[#CCCCCC] min-w-[100px] focus:outline-none focus:ring-2 focus:ring-[#2564EB]/30 focus:border-[#2564EB]"
          >
            <option value="all">الكل</option>
            <option value="gold">ذهبية</option>
            <option value="silver">فضية</option>
            <option value="bronze">برونزية</option>
          </select>
        </div>

        <!-- Date dropdown -->
        <div class="flex items-center gap-2 shrink-0">
          <label class="text-sm font-medium text-gray-700 whitespace-nowrap">التاريخ:</label>
          <select
            v-model="dateFilter"
            class="px-3 py-2.5 sm:py-3 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-700 bg-white min-w-[140px] focus:outline-none focus:ring-2 focus:ring-[#2564EB]/30 focus:border-[#2564EB]"
          >
            <option value="">التاريخ</option>
            <option value="today">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
            <option value="all">الكل</option>
          </select>
        </div>

        <!-- Order dropdown -->
        <div class="flex items-center gap-2 shrink-0">
          <label class="text-sm font-medium text-gray-700 whitespace-nowrap">الترتيب:</label>
          <select
            v-model="sortBy"
            class="px-3 py-2.5 sm:py-3 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-700 bg-white min-w-[120px] focus:outline-none focus:ring-2 focus:ring-[#2564EB]/30 focus:border-[#2564EB]"
          >
            <option value="">--</option>
            <option value="date-desc">الأحدث أولاً</option>
            <option value="date-asc">الأقدم أولاً</option>
            <option value="amount-desc">المبلغ (أعلى)</option>
            <option value="amount-asc">المبلغ (أقل)</option>
          </select>
        </div>

        <!-- Search (leftmost in RTL) -->
        <div class="relative flex-1 min-w-0 sm:min-w-[200px] sm:max-w-[280px]">
          <span
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            aria-hidden="true"
          >
            <Icon name="ph:magnifying-glass" class="w-5 h-5" />
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="بحث"
            class="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2564EB]/30 focus:border-[#2564EB] transition"
          />
        </div>
      </div>

      <!-- Operations List Header -->
      <h2 class="text-lg sm:text-xl font-bold text-[#1E3A5F] mb-4 sm:mb-6 break-words">
        قائمة العمليات
      </h2>

      <!-- Table -->
      <div class="overflow-x-auto -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8">
        <div class="inline-block min-w-full align-middle">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  اسم العميل
                </th>
                <th
                  scope="col"
                  class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  رقم العضوية
                </th>
                <th
                  scope="col"
                  class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  نوع العضوية
                </th>
                <th
                  scope="col"
                  class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  تاريخ الزيارة
                </th>
                <th
                  scope="col"
                  class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  المبلغ قبل
                </th>
                <th
                  scope="col"
                  class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  نسبة الخصم
                </th>
                <th
                  scope="col"
                  class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  المبلغ بعد
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="op in filteredOperations"
                :key="op.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                  <div class="flex items-center gap-2 justify-start">
                    <span
                      class="w-15 h-15 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"
                      aria-hidden="true"
                    >
                      <Icon name="ph:user" class="w-9 h-9" />
                    </span>
                    <span>{{ op.customerName }}</span>
                  </div>
                </td>
                <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  {{ op.membershipNumber }}
                </td>
                <td class="px-3 sm:px-6 py-3 sm:py-4 text-base sm:text-base whitespace-nowrap">
                  <span
                    class="inline-flex px-2 sm:px-3 py-1 rounded-full text-base font-medium"
                    :class="getMembershipTypeClass(op.membershipType)"
                  >
                    {{ op.membershipType }}
                  </span>
                </td>
                <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  {{ op.visitDate }}
                </td>
                <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                  {{ op.amountBefore }}
                </td>
                <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                  <span class="font-bold text-blue-600">{{ op.discountPercent }}%</span>
                </td>
                <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                  <span class="font-medium text-green-600">{{ op.amountAfter }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty state -->
      <p
        v-if="filteredOperations.length === 0"
        class="text-center text-gray-500 py-8"
      >
        لا توجد عمليات تطابق البحث أو الفلاتر.
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
});
useHead({
  title: 'سجل العمليات',
});

const searchQuery = ref('');
const sortBy = ref('');
const dateFilter = ref('');
const discountFilter = ref('all');
const membershipFilter = ref('all');

const getMembershipTypeClass = (type) => {
  const classes = {
    'ذهبية': 'bg-yellow-100 text-yellow-800',
    'فضية': 'bg-gray-100 text-gray-800',
    'برونزية': 'bg-orange-100 text-orange-800'
  };
  return classes[type] || 'bg-gray-100 text-gray-800'; // Default class
};

const operations = ref([
  {
    id: 1,
    customerName: 'أحمد محمد',
    membershipNumber: 'PLT-2024-001',
    membershipType: 'ذهبية',
    visitDate: '2024-06-01',
    amountBefore: '1,200 ريال',
    discountPercent: 25,
    amountAfter: '1,200 ريال',
  },
  {
    id: 2,
    customerName: 'أحمد محمد',
    membershipNumber: 'PLT-2024-001',
    membershipType: 'ذهبية',
    visitDate: '2024-06-01',
    amountBefore: '1,200 ريال',
    discountPercent: 25,
    amountAfter: '1,200 ريال',
  },
  {
    id: 3,
    customerName: 'أحمد محمد',
    membershipNumber: 'PLT-2024-001',
    membershipType: 'ذهبية',
    visitDate: '2024-06-01',
    amountBefore: '1,200 ريال',
    discountPercent: 25,
    amountAfter: '1,200 ريال',
  },
  {
    id: 4,
    customerName: 'أحمد محمد',
    membershipNumber: 'PLT-2024-001',
    membershipType: 'ذهبية',
    visitDate: '2024-06-01',
    amountBefore: '1,200 ريال',
    discountPercent: 25,
    amountAfter: '1,200 ريال',
  },
  {
    id: 5,
    customerName: 'أحمد محمد',
    membershipNumber: 'PLT-2024-001',
    membershipType: 'ذهبية',
    visitDate: '2024-06-01',
    amountBefore: '1,200 ريال',
    discountPercent: 25,
    amountAfter: '1,200 ريال',
  },
]);

const filteredOperations = computed(() => {
  let list = [...operations.value];

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    list = list.filter(
      (op) =>
        op.customerName.toLowerCase().includes(q) ||
        op.membershipNumber.toLowerCase().includes(q)
    );
  }

  if (membershipFilter.value && membershipFilter.value !== 'all') {
    const typeMap = { gold: 'ذهبية', silver: 'فضية', bronze: 'برونزية' };
    const type = typeMap[membershipFilter.value];
    list = list.filter((op) => op.membershipType === type);
  }

  if (discountFilter.value && discountFilter.value !== 'all') {
    const typeMap = { gold: 'ذهبية', silver: 'فضية', bronze: 'برونزية' };
    const type = typeMap[discountFilter.value];
    list = list.filter((op) => op.membershipType === type);
  }

  if (sortBy.value === 'date-desc') {
    list.sort((a, b) => (b.visitDate > a.visitDate ? 1 : -1));
  } else if (sortBy.value === 'date-asc') {
    list.sort((a, b) => (a.visitDate > b.visitDate ? 1 : -1));
  }

  return list;
});
</script>

<style scoped>
@media (max-width: 640px) {
  table {
    font-size: 0.75rem;
  }
}
</style>
