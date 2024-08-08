import { computed, type Ref } from 'vue';

export default function usePagination<T>(
  items: Ref<T[]>,
  currentPage: Ref<number>,
  rowsPerPage: Ref<number>
) {
  const totalPages = computed(() => Math.ceil(items.value.length / rowsPerPage.value));

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return items.value.slice(start, end);
  });

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
}
