<template>
  <div class="m-8 py-6 px-16">
    <!-- Page Header -->
    <div class="mb-6 sm:mb-8 lg:mb-10 text-right">
      <h1 class="text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-2">إدارة بيانات المتجر</h1>
      <p class="text-sm sm:text-base text-[#64748b]">قم بتحديث معلومات متجرك وساعات العمل</p>
    </div>

    <!-- Basic Information Section -->
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-6" dir="rtl">
      <h2 class="text-xl font-bold text-[#1E3A5F] mb-6">المعلومات الأساسية</h2>
      
      <div class="space-y-6">
        <!-- Store Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            اسم المتجر
          </label>
          <input
            v-model="storeData.name"
            type="text"
            placeholder="أدخل اسم المتجر"
            class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-right"
          />
        </div>

        <!-- Store Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            وصف المتجر
          </label>
          <textarea
            v-model="storeData.description"
            rows="4"
            placeholder="أدخل وصف المتجر"
            class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-right resize-none"
          ></textarea>
        </div>

        <!-- Store Location -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            موقع المتجر
          </label>
          <div class="relative">
            <input
              v-model="storeData.location"
              type="text"
              placeholder="أدخل موقع المتجر"
              class="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-right"
            />
            <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 my-8"></div>

      <!-- Store Images Section -->
      <div>
        <h2 class="text-xl font-bold text-[#1E3A5F] mb-6">صور المتجر</h2>
      
      <!-- Upload Area -->
      <div
        @click="triggerFileInput"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        class="border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-colors mb-6"
        :class="isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'"
      >
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/png,image/jpeg,image/jpg"
          class="hidden"
          @change="handleFileSelect"
        />
        <div class="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p class="text-gray-700 font-medium mb-2">اضغط لرفع الصور أو اسحبها هنا</p>
          <p class="text-sm text-gray-500">PNG, JPG 10 MB</p>
        </div>
      </div>

      <!-- Uploaded Images -->
      <div v-if="storeImages.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div
          v-for="(image, index) in storeImages"
          :key="index"
          class="relative group bg-gray-50 rounded-lg overflow-hidden"
        >
          <div class="w-full h-40 flex items-center justify-center p-2">
            <img
              :src="image.url"
              :alt="`Store image ${index + 1}`"
              class="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
          <button
            @click="removeImage(index)"
            class="absolute top-2 left-2 w-12 h-12 rounded-full bg-[#FEF2F299] backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg p-2.5"
          >
            <img
              src="/icons/del-img.png"
              alt="Delete"
              class="w-4 h-4 object-contain"
            />
          </button>
        </div>
      </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="mt-6 flex justify-end">
      <button
        @click="saveStoreData"
        class="px-6 py-3 bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white font-medium rounded-xl shadow-md shadow-blue-100 transition duration-200 ease-out transform hover:from-[#3B7FCF] hover:to-[#2F6BB0] hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]"
      >
        حفظ التغييرات
      </button>
    </div>
  </div>
</template>

<script setup>
// Set page title
useHead({
  title: 'إدارة المتجر'
});
definePageMeta({
  layout: 'default'
});

const fileInput = ref(null);
const isDragging = ref(false);

// Store data
const storeData = ref({
  name: 'متجر الإلكترونيات الحديثة',
  description: 'تقدم أفضل الأجهزة الإلكترونية والإكسسوارات بأسعار تنافسية وجودة عالية',
  location: 'الرياض حي العليا، شارع الملك فهد'
});

// Store images - starts empty, only shows uploaded images
const storeImages = ref([]);

// Trigger file input
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Handle file selection
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  processFiles(files);
  // Reset input
  event.target.value = '';
};

// Handle drop
const handleDrop = (event) => {
  isDragging.value = false;
  const files = Array.from(event.dataTransfer.files);
  processFiles(files);
};

// Process files
const processFiles = (files) => {
  files.forEach(file => {
    if (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        storeImages.value.push({
          url: e.target.result,
          file: file
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert('الرجاء رفع ملفات صور فقط بحجم أقل من 10 ميجابايت');
    }
  });
};

// Remove image
const removeImage = (index) => {
  storeImages.value.splice(index, 1);
};

// Save store data
const saveStoreData = () => {
  // TODO: Implement API call to save store data
  console.log('Saving store data:', storeData.value);
  console.log('Store images:', storeImages.value);
  // You can add a success notification here
};
</script>
