<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click.self="handleClose"
    >
      <div class="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <!-- Header -->
        <div class="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200" dir="rtl">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900">تحديد الموقع على الخريطة</h2>
          <button
            @click="handleClose"
            class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Search Input -->
        <div class="flex-shrink-0 p-3 sm:p-4 border-b border-gray-200 bg-gray-50" dir="rtl">
          <div class="flex gap-2">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ابحث عن موقع..."
              class="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-right text-sm sm:text-base"
              @keyup.enter="searchLocation"
            />
            <button
              @click="searchLocation"
              class="px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap text-sm sm:text-base"
            >
              بحث
            </button>
          </div>
        </div>

        <!-- Map Container -->
        <div class="flex-1 relative overflow-hidden">
          <div ref="mapContainer" class="w-full h-full"></div>
          
          <!-- Map Instructions -->
          <div class="absolute top-3 right-3 bg-white rounded-lg shadow-lg p-2.5 sm:p-3 text-right text-xs sm:text-sm max-w-[180px] sm:max-w-xs z-[1000]">
            <p class="font-semibold text-gray-900 mb-1">📍 كيفية التحديد:</p>
            <p class="text-gray-600">اضغط على الخريطة</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex-shrink-0 p-3 sm:p-4 border-t border-gray-200 bg-white" dir="rtl">
          <div v-if="selectedLocation" class="mb-3 p-3 bg-blue-50 rounded-lg">
            <p class="text-xs sm:text-sm text-blue-600 font-medium mb-1">✓ الموقع المحدد:</p>
            <p class="text-sm sm:text-base font-medium text-gray-900 break-words">
              {{ selectedLocation.address || `${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}` }}
            </p>
          </div>
          <div v-else class="mb-3 p-3 bg-gray-50 rounded-lg text-center">
            <p class="text-sm text-gray-500">اضغط على الخريطة لتحديد الموقع</p>
          </div>
          <div class="flex gap-2 sm:gap-3">
            <button
              @click="handleClose"
              class="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base"
            >
              إلغاء
            </button>
            <button
              @click="handleConfirm"
              :disabled="!selectedLocation"
              class="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base"
            >
              تأكيد الموقع ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import 'leaflet/dist/leaflet.css';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  initialText: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'confirm']);

const mapContainer = ref(null);
const map = ref(null);
const marker = ref(null);
const selectedLocation = ref(null);
const searchQuery = ref('');

// Saudi Arabia major cities coordinates
const saudiCities = {
  'الرياض': [24.7136, 46.6753],
  'riyadh': [24.7136, 46.6753],
  'جدة': [21.5433, 39.1728],
  'jeddah': [21.5433, 39.1728],
  'مكة': [21.4225, 39.8262],
  'makkah': [21.4225, 39.8262],
  'المدينة': [24.5247, 39.5692],
  'madinah': [24.5247, 39.5692],
  'الدمام': [26.4207, 50.0888],
  'dammam': [26.4207, 50.0888],
  'الخبر': [26.2172, 50.1971],
  'khobar': [26.2172, 50.1971],
  'الطائف': [21.2703, 40.4150],
  'taif': [21.2703, 40.4150],
};

const initMap = async () => {
  if (!process.client || !mapContainer.value) return;

  // Dynamically import Leaflet only on client side
  const L = (await import('leaflet')).default;

  // Fix for default marker icons
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });

  // Initialize map centered on Riyadh
  map.value = L.map(mapContainer.value).setView([24.7136, 46.6753], 13);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map.value);

  // Add click event to map
  map.value.on('click', (e) => {
    const { lat, lng } = e.latlng;
    setLocation(lat, lng);
  });
};

const setLocation = async (lat, lng) => {
  if (!map.value) return;

  const L = (await import('leaflet')).default;

  // Remove existing marker
  if (marker.value) {
    map.value.removeLayer(marker.value);
  }

  // Add new marker
  marker.value = L.marker([lat, lng], {
    draggable: true
  }).addTo(map.value);

  // Handle marker drag
  marker.value.on('dragend', (e) => {
    const position = e.target.getLatLng();
    setLocation(position.lat, position.lng);
  });

  // Try to get address from coordinates using Nominatim (free reverse geocoding)
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`
    );
    const data = await response.json();
    
    selectedLocation.value = {
      lat,
      lng,
      address: data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    };
  } catch (error) {
    selectedLocation.value = {
      lat,
      lng,
      address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    };
  }

  // Center map on marker
  map.value.setView([lat, lng], 15);
};

const searchLocation = async () => {
  if (!searchQuery.value || !map.value) return;

  const query = searchQuery.value.toLowerCase().trim();

  // Check if it's a known Saudi city
  if (saudiCities[query]) {
    const [lat, lng] = saudiCities[query];
    await setLocation(lat, lng);
    return;
  }

  // Use Nominatim for geocoding (free)
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}&accept-language=ar&countrycodes=sa&limit=1`
    );
    const data = await response.json();
    
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      await setLocation(parseFloat(lat), parseFloat(lon));
    } else {
      alert('لم يتم العثور على الموقع. حاول البحث بطريقة أخرى.');
    }
  } catch (error) {
    console.error('Search error:', error);
    alert('حدث خطأ في البحث. حاول مرة أخرى.');
  }
};

const handleConfirm = () => {
  if (selectedLocation.value) {
    emit('confirm', selectedLocation.value.address);
    handleClose();
  }
};

const handleClose = () => {
  emit('close');
};

const cleanupMap = () => {
  if (map.value) {
    map.value.remove();
    map.value = null;
    marker.value = null;
  }
};

watch(
  () => props.show,
  async (isOpen) => {
    if (!isOpen) {
      selectedLocation.value = null;
      searchQuery.value = '';
      cleanupMap();
      return;
    }
    
    // Wait for next tick to ensure DOM is ready
    await nextTick();
    await initMap();
  }
);

onUnmounted(() => {
  cleanupMap();
});
</script>

<style scoped>
/* Leaflet map container needs explicit height */
:deep(.leaflet-container) {
  height: 100%;
  width: 100%;
  border-radius: 0;
}

/* Make sure map controls are visible */
:deep(.leaflet-control-zoom) {
  margin: 10px !important;
}

/* RTL support for map attribution */
:deep(.leaflet-control-attribution) {
  direction: ltr;
  text-align: left;
  font-size: 10px;
}
</style>
