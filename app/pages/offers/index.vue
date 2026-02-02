<template>
  <div class="m-4 sm:m-6 md:m-8 py-4 sm:py-6 px-4 sm:px-8 md:px-16 max-w-full overflow-x-hidden">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
       <!-- Add New Offer Button -->
       <button
        @click="openAddModal"
        class="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#2564EB] hover:bg-[#1D4ED8] text-white font-normal rounded-xl transition-colors whitespace-nowrap text-sm sm:text-base"
      >
      <span>إضافة عرض جديد</span>
        <Icon name="ph:plus" class="w-5 h-5" />
      </button>
      <div class=" min-w-0 text-right">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-1 sm:mb-2 break-words">
          إدارة العروض والخصومات
        </h1>
        <p class="text-xs sm:text-sm md:text-base text-[#64748b] break-words">
          إضافة وتعديل وحذف العروض المتاحة للعملاء
        </p>
      </div>
      
     
    </div>

    <!-- Offers List Section -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6 md:p-8 max-w-full overflow-hidden" dir="rtl">
      <h2 class="text-lg sm:text-xl font-bold text-[#1E3A5F] mb-4 sm:mb-6 break-words">
        قائمة العروض
      </h2>

      <!-- Table -->
      <div class="overflow-x-auto -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8">
        <div class="inline-block min-w-full align-middle">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  اسم العرض
                </th>
                <th scope="col" class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  نسبة الخصم
                </th>
                <th scope="col" class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  نوع الخصومة
                </th>
                <th scope="col" class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  تاريخ البداية
                </th>
                <th scope="col" class="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  تاريخ النهاية
                </th>
                <th scope="col" class="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="offer in offers" :key="offer.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                  {{ offer.name }}
                </td>
                <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                  <span class="font-bold text-blue-600">{{ offer.discount }}%</span>
                </td>
                <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                  <span 
                    class="inline-flex px-2 sm:px-3 py-1 rounded-full text-xs font-medium"
                    :class="getDiscountTypeClass(offer.type)"
                  >
                    {{ offer.type }}
                  </span>
                </td>
                <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  {{ offer.startDate }}
                </td>
                <td class="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  {{ offer.endDate }}
                </td>
                <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div class="flex items-center justify-center gap-2">
                    <!-- Edit Button -->
                    <button
                      @click="editOffer(offer)"
                      class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Icon name="ph:pencil-simple" class="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    
                    <!-- Delete Button -->
                    <button
                      @click="openDeleteModal(offer)"
                      class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف"
                    >
                      <!-- <Icon name="ph:trash" class="w-4 h-4 sm:w-5 sm:h-5" /> -->
                       <img src="/icons/del-img.png" alt="delete" class="w-3 h-3 sm:w-4 sm:h-4">
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        @click.self="closeDeleteModal"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <!-- Modal -->
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[90vh]">
          <!-- Close Button -->
          <button
            @click="closeDeleteModal"
            class="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Modal Content -->
          <div class="flex-1 flex flex-col justify-center items-center p-8 text-center">
            <!-- Warning Icon -->
            <div class="w-20 h-20 mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <Icon name="ph:warning-circle" class="w-12 h-12 text-red-500" />
            </div>

            <!-- Title -->
            <h2 class="text-2xl font-bold text-gray-900 mb-8">
              هل أنت متأكد من حذف هذا العرض؟
            </h2>

            <!-- Action Buttons -->
            <div class="flex gap-3 justify-center w-full max-w-md">
              <!-- Confirm Button -->
              <button
                @click="confirmDelete"
                class="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
              >
                تأكيد
              </button>
              <!-- Cancel Button -->
              <button
                @click="closeDeleteModal"
                class="flex-1 px-6 py-3 bg-white border-2 border-blue-500 text-blue-500 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Add Offer Modal -->
    <AddOfferModal
      :show="showAddModal"
      @close="closeAddModal"
      @confirm="handleOfferConfirm"
    />

    <!-- Success Modal -->
    <SuccessModal
      v-model="showSuccessModal"
      title="تم اضافة العرض بنجاح"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Page metadata
definePageMeta({
  layout: 'default',
});
useHead({
  title: ' العروض والخصومات',
});

// Offers data
const offers = ref([
  {
    id: 1,
    name: 'خصم الصيف الكبير',
    discount: 25,
    type: 'ذهبية',
    startDate: '2024-06-01',
    endDate: '2024-08-31'
  },
  {
    id: 2,
    name: 'عرض بداية الاسبوع',
    discount: 15,
    type: 'فضية',
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  },
  {
    id: 3,
    name: 'عرض العملاء المميزين',
    discount: 35,
    type: 'برونزية',
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  },
  {
    id: 4,
    name: 'خصم العودة للمدارس',
    discount: 20,
    type: 'الكل',
    startDate: '2024-08-15',
    endDate: '2024-09-15'
  },
  {
    id: 5,
    name: 'عرض رمضان',
    discount: 30,
    type: 'ذهبية',
    startDate: '2024-03-01',
    endDate: '2024-04-10'
  }
]);

// Modal state
const showDeleteModal = ref(false);
const showAddModal = ref(false);
const showSuccessModal = ref(false);
const selectedOffer = ref(null);

// Get discount type badge class
const getDiscountTypeClass = (type) => {
  const classes = {
    'ذهبية': 'bg-yellow-100 text-yellow-800',
    'فضية': 'bg-gray-100 text-gray-800',
    'برونزية': 'bg-orange-100 text-orange-800',
    'الكل': 'bg-blue-100 text-blue-800'
  };
  return classes[type] || 'bg-gray-100 text-gray-800';
};

// Open add modal
const openAddModal = () => {
  showAddModal.value = true;
};

// Close add modal
const closeAddModal = () => {
  showAddModal.value = false;
};

// Handle offer confirm
const handleOfferConfirm = (offerData) => {
  // Generate new ID
  const newId = offers.value.length > 0 ? Math.max(...offers.value.map(o => o.id)) + 1 : 1;
  
  // Add new offer to the list
  offers.value.unshift({
    id: newId,
    ...offerData
  });
  
  // Close add modal
  closeAddModal();
  
  // Show success modal
  showSuccessModal.value = true;
};

// Edit offer
const editOffer = (offer) => {
  // TODO: Implement edit functionality
  console.log('Edit offer:', offer);
};

// Open delete modal
const openDeleteModal = (offer) => {
  selectedOffer.value = offer;
  showDeleteModal.value = true;
};

// Close delete modal
const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedOffer.value = null;
};

// Confirm delete
const confirmDelete = () => {
  if (selectedOffer.value) {
    offers.value = offers.value.filter(o => o.id !== selectedOffer.value.id);
    closeDeleteModal();
  }
};
</script>

<style scoped>
/* Responsive table styles */
@media (max-width: 640px) {
  table {
    font-size: 0.75rem;
  }
}
</style>
