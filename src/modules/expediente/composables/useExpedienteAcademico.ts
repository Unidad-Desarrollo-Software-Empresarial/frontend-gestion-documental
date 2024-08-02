import { ref } from 'vue';
import axios from 'axios';

// Definición de tipos
interface AcademicPeriod {
  title: string;
  content: string;
}

// Composable para manejar la lógica de expediente académico
export function useExpedienteAcademico() {
  const academicPeriods = ref<AcademicPeriod[]>([]);
  const isExpanded = ref<Record<string, boolean>>({
    'accordion-collapse-body-1': false,
    'accordion-collapse-body-2': false
  });

  async function fetchAcademicPeriods(period: string): Promise<AcademicPeriod[]> {
    try {
      // Aquí va la llamada a la API que debe devolver los datos de academicPeriods
      const response = await axios.get(`/api/academic-periods?period=${period}`);
      return response.data; // Asegúrate de que el tipo devuelto coincida con AcademicPeriod[]
    } catch (error) {
      console.error('Error fetching academic periods:', error);
      return []; // Devuelve un arreglo vacío en caso de error
    }
  }

  function toggleAccordion(accordionId: string) {
    isExpanded.value[accordionId] = !isExpanded.value[accordionId];
  }

  return {
    academicPeriods,
    isExpanded,
    fetchAcademicPeriods,
    toggleAccordion
  };
}
