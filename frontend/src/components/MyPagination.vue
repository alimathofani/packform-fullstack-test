<script setup lang="ts">
import { computed, ref, watch, withDefaults } from 'vue'

interface PaginationProps {
  maxVisibleButtons: number
  totalPages: number
  total: number
  perPage: number
  currentPage: number
  totalData: number
}

const props = withDefaults(defineProps<PaginationProps>(), {
  maxVisibleButtons: 3,
  totalPages: 10,
  total: 100,
  perPage: 10,
  currentPage: 10,
  totalData: 0
})

const emits = defineEmits(['pagechanged', 'limitchanged', 'gotopage'])
const customLimit = ref(5)
const goToPage = ref(null)

const startPage = computed(() => {
  if (props.currentPage === 1) {
    return 1
  }

  if (props.currentPage === props.totalPages) {
    return props.totalPages - props.maxVisibleButtons + 1
  }

  return props.currentPage - 1

})


const endPage = computed(() => {
  return Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages)
})

const pages = computed(() => {
  const range = [];

  for (let i = startPage.value; i <= endPage.value; i += 1) {
    if (i != 0)
      range.push({
        name: i,
        isDisabled: i === props.currentPage
      });
  }

  return range;
})

const isInFirstPage = computed(() => {
  return props.currentPage === 1;
})

const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages;
})

const onClickPreviousPage = () => {
  emits('pagechanged', props.currentPage - 1);
}

const onClickPage = (page: number) => {
  emits('pagechanged', page);
}

const onClickNextPage = () => {
  emits('pagechanged', props.currentPage + 1);
}

const isPageActive = (page: number) => {
  return props.currentPage === page;
}

watch(
  () => customLimit.value,
  (value) => {
    emits('limitchanged', value)
  }
)

watch(
  () => goToPage.value,
  (value) => {
    emits('gotopage', value)
  }
)

</script>

<template>
  <div>
    <div class="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div class="flex items-center gap-6">
        <div>
          <p class="text-sm text-gray-700">
            Total
            {{ ' ' }}
            <span class="font-medium">{{ totalData }}</span>
          </p>
        </div>
        <div>
          <select v-model="customLimit" class="ring-gray-300 ring-1 ring-inset p-2 text-sm rounded-md relative inline-flex">
            <option value="5" selected>5/page</option>
            <option value="10">10/page</option>
            <option value="15">15/page</option>
            <option value="20">20/page</option>
          </select>
        </div>

        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md gap-2" aria-label="Pagination">
            <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage" aria-label="Go to previous page"
              class="relative inline-flex items-center px-2 py-2 hover:text-indigo-600 hover:font-semibold focus:z-20">
              <span class="sr-only">Previous</span>
              <div class="h-5 w-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
              </div>
            </button>
            <button v-for="(page, idx) in pages" :key="`${idx}-paginate`" type="button" @click="onClickPage(page.name)"
              :disabled="page.isDisabled" :class="[
                isPageActive(page.name) ? 'z-10 ring-indigo-600 text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'ring-gray-300 text-gray-900 focus:outline-offset-0'
              ]" :aria-label="`Go to page number ${page.name}`"
              class="rounded-md relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 hover:ring-indigo-600 hover:text-indigo-600">
              {{ page.name }}
            </button>
            <button type="button" @click="onClickNextPage" :disabled="isInLastPage" aria-label="Go to next page"
              class="relative inline-flex items-center px-2 py-2 hover:text-indigo-600 focus:z-20 focus:outline-offset-0">
              <span class="sr-only">Next</span>
              <div class="h-5 w-5" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
            </button>
          </nav>
        </div>
        <div class="flex items-center gap-2">
          Go to
          <input v-model="goToPage" type="text" id="table-search"
            class="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-20 bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
            placeholder="Enter page">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4AAE9B;
  color: #ffffff;
}
</style>
