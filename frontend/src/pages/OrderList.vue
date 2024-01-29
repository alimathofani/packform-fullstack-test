<script setup lang="ts">
import MyPagination from '@/components/MyPagination.vue'
import { api } from "@/http/api";
import { OrderResponse, Order } from "@/models/Order";
import { ref, watch, onMounted, computed } from "vue";
import debounce from 'lodash.debounce'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const startDate = ref(String(route.query.start_date || ''))
const endDate = ref(String(route.query.end_date || ''))
const orderDate = ref('asc')

const term = ref<string>('')
const orders: OrderResponse = ref({
  data: [],
  limit: 5,
  page: 1,
  total_rows: 1,
  total_pages: 1
})

const page = computed(() => {
  return Number(route.query.page || 1)
})

onMounted(() => {
  term.value = String(route.query.term || '')
  searchOrders()
})

watch(term, debounce(() => {
  searchOrders()
  router.push({ name: 'Order', query: { ...route.query, term: term.value ?? '' } })
}, 500))

const fetchOrders = (page: number, term: string, start: string, end: string, orderDate: string, limit?: number) => {
  api
    .get("/orders", {
      params: {
        page,
        q: term,
        limit: limit ?? 5,
        start_date: start,
        end_date: end,
        order_date: orderDate
      }
    })
    .then((resp) => {
      if (resp.status == 200)
        orders.value = resp.data
    })
}

const searchOrders = (over?: number) => {
  fetchOrders(over || page.value, term.value, startDate.value, endDate.value, orderDate.value, Number(route.query.limit || 5))
}

const onPageChange = (page: number) => {
  router.push({ name: 'Order', query: { ...route.query, page } })
}

const onLimitChange = (limit: number) => {
  router.push({ name: 'Order', query: { ...route.query, limit: limit } })
}

const deliveryAmount = (order: Order) => {
  let total = 0
  order.order_items.forEach((item) => {
    const mapQuantity = item.deliveries.map(item => Number(item.delivered_quantity))
    let sumQuantity = mapQuantity.length > 0 ? mapQuantity.reduce((prev, next) => (prev + next)) : 0
    total += item.price_per_unit * sumQuantity
  });
  return total
}

const totalAmount = (order: Order) => {
  let total = 0
  order.order_items.forEach((item) => {
    total += item.price_per_unit * Number(item.quantity)
  });
  return total
}

const totalOrders = computed(() => {
  let total = 0
  orders.value.data.forEach(item => {
    total += totalAmount(item)
  })
  return total
})

const readableDate = (date: string) => {
  return dayjs(date || '2006-01-02').format('MMM Do, hh:mm a')
}

const onOrderDate = () => {
  if (orderDate.value == 'asc')
    orderDate.value = 'desc'
  else
    orderDate.value = 'asc'

  router.push({ name: 'Order', query: { ...route.query, order_date: orderDate.value } })
}

watch(
  () => route.query,
  async query => {
    Object.keys(query).length > 0 && searchOrders(Number(query.page || 1))
  },
  {
    immediate: true
  }
)

watch(
  () => startDate.value,
  async start => {
    router.push({ name: 'Order', query: { ...route.query, start_date: start ?? '' } })
  }
)

watch(
  () => endDate.value,
  async end => {
    router.push({ name: 'Order', query: { ...route.query, end_date: end ?? '' } })
  }
)


</script>

<template>
  <div class="mt-10 relative overflow-x-auto shadow-md space-y-4 sm:rounded-lg">
    <div class="pl-5 space-y-4  text-left">
      <div>
        <label for="table-search" class="sr-only">Search</label>
        <div class="flex items-center gap-5 mt-1">
          <div class="inset-y-0 rtl:inset-r-0 start-0 flex items-center gap-2 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            Search
          </div>
          <input v-model="term" type="text" id="table-search"
            class="block p-2 text-sm text-gray-900 border border-gray-300 rounded-md w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for order or product name">
        </div>
      </div>
      <div class="space-y-2">
        <p>Created date</p>
        <div class="inline-block ring-1 ring-gray-300 rounded-md">
          <input v-model="startDate" type="date" id="session-date" class="start-date p-2 bg-transparent" placeholder="" />
          <span class="input-group-text mx-5">-</span>
          <input v-model="endDate" type="date" id="session-date" class="end-date p-2 bg-transparent" placeholder="" />
        </div>
      </div>
      <div>
        Total amount: ${{ totalOrders }}
      </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-sm text-gray-500 bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">
            Order name
          </th>
          <th scope="col" class="px-6 py-3">
            Products
          </th>
          <th scope="col" class="px-6 py-3">
            Customer Company
          </th>
          <th scope="col" class="px-6 py-3">
            Customer Name
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="flex items-center">
              Order date
              <div @click="onOrderDate" class="cursor-pointer">
                <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                </svg>
              </div>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">
            Delivery Amount
          </th>
          <th scope="col" class="px-6 py-3">
            Total Amount
          </th>
        </tr>
      </thead>
      <tbody class="text-gray-900">
        <tr v-for="item in orders.data" :key="item.id" class="bg-white border-b ">
          <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
            <div class="font-semibold">#{{ item.id }}</div>
            <div>{{ item.order_name }}</div>
          </th>
          <td class="px-6 py-4">
            <div class="whitespace-nowrap" v-for="product in item.order_items.map(order => order.product)" :key="product">
              {{ product }}
            </div>
          </td>
          <td class="px-6 py-4">
            {{ item.customer.company.company_name }}
          </td>
          <td class="px-6 py-4">
            {{ item.customer.name }}
          </td>
          <td class="px-6 py-4">
            {{ readableDate(item.created_at) }}
          </td>
          <td class="px-6 py-4">
            {{ deliveryAmount(item) ? `$${deliveryAmount(item)}` : '-' }}
          </td>
          <td class="px-6 py-4">
            ${{ totalAmount(item) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <my-pagination
    :total-pages="orders.total_pages"
    :total="orders.total_rows"
    :per-page="orders.limit"
    :current-page="orders.page"
    :total-data="orders.data.length"
    @pagechanged="onPageChange"
    @limitchanged="onLimitChange"
    @gotopage="onPageChange"
  />
</template>

<style scoped>
input#session-date {
  display: inline-block;
  position: relative;
}

::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}

/* .end-date::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
} */
</style>

