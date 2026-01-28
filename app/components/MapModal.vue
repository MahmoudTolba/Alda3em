<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="handleClose"
    >
      <div class="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
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

        <div class="relative p-4 pb-0">
          <GMapAutocomplete
            ref="autocompleteRef"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-right"
            placeholder="ادخل موقعك هنا"
            @place_changed="handlePlaceChanged"
          />
        </div>

        <div class="flex-1 relative">
          <GMapMap
            ref="mapRef"
            :center="mapCenter"
            :zoom="14"
            map-type-id="roadmap"
            class="w-full h-full"
            style="min-height: 420px"
            :options="mapOptions"
            @click="handleMapClick"
          >
            <GMapMarker
              v-if="markerPosition"
              :position="markerPosition"
              :clickable="true"
              :draggable="true"
              @dragend="handleMarkerDrag"
            />
          </GMapMap>
        </div>

        <div class="p-4 border-t border-gray-200 bg-white text-right">
          <div v-if="selectedLocationText" class="mb-4">
            <p class="text-sm text-gray-500 mb-1">الموقع المحدد:</p>
            <p class="text-base font-medium text-gray-900">{{ selectedLocationText }}</p>
          </div>
          <button
            @click="handleConfirm"
            :disabled="!selectedLocationText"
            class="w-full px-6 py-3 bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white text-base font-medium rounded-xl shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#3B7FCF] hover:to-[#2F6BB0]"
          >
            تأكيد الموقع
          </button>
        </div>
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
  initialText: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'confirm']);

const mapRef = ref(null);
const autocompleteRef = ref(null);

const mapCenter = ref({ lat: 24.7136, lng: 46.6753 });
const markerPosition = ref(null);
const selectedLocationText = ref('');
const geocoder = ref(null);

const mapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false
};

const ensureGeocoder = () => {
  if (!geocoder.value && window?.google?.maps?.Geocoder) {
    geocoder.value = new window.google.maps.Geocoder();
  }
};

const handleMapClick = (event) => {
  const lat = event?.latLng?.lat?.();
  const lng = event?.latLng?.lng?.();
  if (typeof lat !== 'number' || typeof lng !== 'number') return;

  setMarker(lat, lng);
  reverseGeocode(lat, lng);
};

const handleMarkerDrag = (event) => {
  const lat = event?.latLng?.lat?.();
  const lng = event?.latLng?.lng?.();
  if (typeof lat !== 'number' || typeof lng !== 'number') return;
  setMarker(lat, lng);
  reverseGeocode(lat, lng);
};

const handlePlaceChanged = (place) => {
  const placeResult = place || autocompleteRef.value?.getPlace?.();
  const location = placeResult?.geometry?.location;
  if (!location) return;

  const lat = location.lat();
  const lng = location.lng();
  setMarker(lat, lng);
  mapCenter.value = { lat, lng };
  selectedLocationText.value = placeResult.formatted_address || placeResult.name || '';
};

const setMarker = (lat, lng) => {
  markerPosition.value = { lat, lng };
  mapCenter.value = { lat, lng };
};

const reverseGeocode = (lat, lng) => {
  ensureGeocoder();
  if (!geocoder.value) {
    selectedLocationText.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    return;
  }

  geocoder.value.geocode({ location: { lat, lng } }, (results, status) => {
    if (status === 'OK' && results?.[0]) {
      selectedLocationText.value = results[0].formatted_address;
    } else {
      selectedLocationText.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  });
};

const handleConfirm = () => {
  if (selectedLocationText.value) {
    emit('confirm', selectedLocationText.value);
  }
};

const handleClose = () => {
  emit('close');
};

watch(
  () => props.show,
  (isOpen) => {
    if (!isOpen) {
      selectedLocationText.value = '';
      markerPosition.value = null;
      return;
    }
    ensureGeocoder();
    selectedLocationText.value = props.initialText || '';
  }
);
</script>
