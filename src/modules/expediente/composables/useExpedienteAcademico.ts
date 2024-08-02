// src/composables/useExpedienteAcademico.ts
import { ref, onMounted } from 'vue';
import axios from 'axios';

export function useExpedienteAcademico() {
  const periods = ref<string[]>([]);
  const selectedPeriod = ref<string>('');
  const academicPeriods = ref<Array<{ title: string; content: string }>>([]);
  const identityNumber = ref<string>('');
  const isExpanded = ref<Record<string, boolean>>({
    'accordion-collapse-body-1': false,
    'accordion-collapse-body-2': false
  });

  // Fetch periods from the backend
  async function fetchPeriods() {
    try {
      const response = await axios.get('/api/periods'); // Cambia la URL según sea necesario
      periods.value = response.data;
      selectedPeriod.value = periods.value[0];
    } catch (error) {
      console.error('Error fetching periods:', error);
    }
  }

  // Fetch academic periods from the backend
  async function fetchAcademicPeriods() {
    if (!selectedPeriod.value) return;

    try {
      const response = await axios.get(`/api/academic-periods/${selectedPeriod.value}`); // Cambia la URL según sea necesario
      academicPeriods.value = response.data;
    } catch (error) {
      console.error('Error fetching academic periods:', error);
    }
  }

  function toggleAccordion(accordionId: string) {
    isExpanded.value[accordionId] = !isExpanded.value[accordionId];
  }

  onMounted(() => {
    fetchPeriods();
  });

  return {
    periods,
    selectedPeriod,
    academicPeriods,
    identityNumber,
    isExpanded,
    toggleAccordion,
    fetchAcademicPeriods
  };
}
