<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click.self="handleClose"
    >
      <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <!-- Header -->
        <div class="sticky top-0 bg-white  p-4 sm:p-6 rounded-t-2xl z-10" dir="rtl">
          <div class="flex items-center justify-between">
           
            <button
              @click="handleClose"
              class="text-red-500 hover:text-red-600 transition-colors cursor-pointer hover:scale-110"
              aria-label="Close"
            >
              <Icon name="ph:x" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="p-4 sm:p-6 space-y-4" dir="rtl">
          <h2 class="text-xl sm:text-2xl font-bold text-blue-600 text-center">
              {{ isEditMode ? 'تعديل العرض' : 'إضافة العرض' }}
            </h2>
          <!-- Offer Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2 text-right">
              اسم العرض
            </label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="مثال: خصم الصيف الكبير"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>

          <!-- Discount Percentage and Type Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Discount Percentage -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 text-right">
                نسبة الخصم
              </label>
              <input
                v-model.number="formData.discount"
                type="number"
                min="1"
                max="100"
                placeholder="مثال: 25%"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>

            <!-- Discount Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 text-right">
                نوع الخصومة
              </label>
              <select
                v-model="formData.type"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-right bg-white"
              >
                <option value="">جميع الخصومات</option>
                <option value="ذهبية">ذهبية</option>
                <option value="فضية">فضية</option>
                <option value="برونزية">برونزية</option>
                <option value="الكل">الكل</option>
              </select>
            </div>
          </div>

          <!-- Date Range Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Start Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 text-right">
                تاريخ البداية العرض
              </label>
              <input
                v-model="formData.startDate"
                type="date"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>

            <!-- End Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 text-right">
                تاريخ النهاية العرض
              </label>
              <input
                v-model="formData.endDate"
                type="date"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
          </div>

          <!-- Offer Conditions -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2 text-right">
              شروط العرض
            </label>
            <textarea
              v-model="formData.conditions"
              rows="3"
              placeholder="مثال: صالح على جميع المنتجات"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-right resize-none"
            ></textarea>
          </div>

          <!-- Additional Notes (Optional) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2 text-right">
              ملاحظات إضافية (اختياري)
            </label>
            <textarea
              v-model="formData.notes"
              rows="3"
              placeholder="أي ملاحظات أو تفاصيل إضافية"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-right resize-none"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              {{ isEditMode ? 'حفظ التعديلات' : 'إضافة العرض' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  offerData: {
    type: Object,
    default: null
  },
  isEditMode: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'confirm']);

const formData = ref({
  name: '',
  discount: null,
  type: '',
  startDate: '',
  endDate: '',
  conditions: '',
  notes: ''
});

const handleClose = () => {
  resetForm();
  emit('close');
};

const handleSubmit = () => {
  // Validate dates
  if (new Date(formData.value.endDate) < new Date(formData.value.startDate)) {
    alert('تاريخ النهاية يجب أن يكون بعد تاريخ البداية');
    return;
  }

  emit('confirm', { ...formData.value });
  resetForm();
};

const resetForm = () => {
  formData.value = {
    name: '',
    discount: null,
    type: '',
    startDate: '',
    endDate: '',
    conditions: '',
    notes: ''
  };
};

watch(
  () => props.show,
  (isOpen) => {
    if (isOpen && props.isEditMode && props.offerData) {
      // Fill form with offer data for editing
      formData.value = {
        name: props.offerData.name || '',
        discount: props.offerData.discount || null,
        type: props.offerData.type || '',
        startDate: props.offerData.startDate || '',
        endDate: props.offerData.endDate || '',
        conditions: props.offerData.conditions || '',
        notes: props.offerData.notes || ''
      };
    } else if (!isOpen) {
      resetForm();
    }
  }
);
</script>

<style scoped>
/* Custom date input styling for RTL */
input[type="date"] {
  direction: rtl;
}

/* Hide scrollbar but keep functionality */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
