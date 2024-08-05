import { computed } from 'vue';

const usePagination = (data: any[], currentPage: any, rowsPerPage: any) => {
  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return data.slice(start, end);
  });

  const totalPages = computed(() => Math.ceil(data.length / rowsPerPage.value));

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  return {
    paginatedItems,
    nextPage,
    previousPage,
    totalPages
  };
};

export default usePagination;
