import { mount } from "@vue/test-utils";
import MyPagination from "../../src/components/MyPagination.vue";

describe("Hello", () => {
  it("check if prop msg match", () => {
    const data = { "data": [{ "id": 1, "order_name": "PO #001-I", "customer_id": "ivan", "customer": { "user_id": "ivan", "login": "ivan", "password": "12345", "name": "Ivan Ivanovich", "company_id": 1, "company": { "company_id": 1, "company_name": "Roga \u0026 Kopyta" }, "credit_card": "[\"*****-1234\", \"*****-5678\"]" }, "order_items": [{ "id": 1, "order_id": 1, "price_per_unit": 1, "quantity": "10", "product": "Corrugated Box", "deliveries": [{ "id": 1, "order_item_id": 1, "delivered_quantity": "5" }] }, { "id": 11, "order_id": 1, "price_per_unit": 45, "quantity": "20", "product": "Hand sanitizer", "deliveries": [] }], "created_at": "2020-01-02T15:34:12Z" }, { "id": 1, "order_name": "PO #001-I", "customer_id": "ivan", "customer": { "user_id": "ivan", "login": "ivan", "password": "12345", "name": "Ivan Ivanovich", "company_id": 1, "company": { "company_id": 1, "company_name": "Roga \u0026 Kopyta" }, "credit_card": "[\"*****-1234\", \"*****-5678\"]" }, "order_items": [{ "id": 1, "order_id": 1, "price_per_unit": 1, "quantity": "10", "product": "Corrugated Box", "deliveries": [{ "id": 1, "order_item_id": 1, "delivered_quantity": "5" }] }, { "id": 11, "order_id": 1, "price_per_unit": 45, "quantity": "20", "product": "Hand sanitizer", "deliveries": [] }], "created_at": "2020-01-02T15:34:12Z" }, { "id": 2, "order_name": "PO #002-I", "customer_id": "ivan", "customer": { "user_id": "ivan", "login": "ivan", "password": "12345", "name": "Ivan Ivanovich", "company_id": 1, "company": { "company_id": 1, "company_name": "Roga \u0026 Kopyta" }, "credit_card": "[\"*****-1234\", \"*****-5678\"]" }, "order_items": [{ "id": 2, "order_id": 2, "price_per_unit": 23, "quantity": "11", "product": "Corrugated Box", "deliveries": [{ "id": 2, "order_item_id": 2, "delivered_quantity": "11" }] }, { "id": 12, "order_id": 2, "price_per_unit": 0, "quantity": "21", "product": "Hand sanitizer", "deliveries": [] }], "created_at": "2020-01-15T17:34:12Z" }, { "id": 2, "order_name": "PO #002-I", "customer_id": "ivan", "customer": { "user_id": "ivan", "login": "ivan", "password": "12345", "name": "Ivan Ivanovich", "company_id": 1, "company": { "company_id": 1, "company_name": "Roga \u0026 Kopyta" }, "credit_card": "[\"*****-1234\", \"*****-5678\"]" }, "order_items": [{ "id": 2, "order_id": 2, "price_per_unit": 23, "quantity": "11", "product": "Corrugated Box", "deliveries": [{ "id": 2, "order_item_id": 2, "delivered_quantity": "11" }] }, { "id": 12, "order_id": 2, "price_per_unit": 0, "quantity": "21", "product": "Hand sanitizer", "deliveries": [] }], "created_at": "2020-01-15T17:34:12Z" }, { "id": 3, "order_name": "PO #003-I", "customer_id": "ivan", "customer": { "user_id": "ivan", "login": "ivan", "password": "12345", "name": "Ivan Ivanovich", "company_id": 1, "company": { "company_id": 1, "company_name": "Roga \u0026 Kopyta" }, "credit_card": "[\"*****-1234\", \"*****-5678\"]" }, "order_items": [{ "id": 3, "order_id": 3, "price_per_unit": 123, "quantity": "12", "product": "Corrugated Box", "deliveries": [{ "id": 3, "order_item_id": 3, "delivered_quantity": "12" }] }, { "id": 13, "order_id": 3, "price_per_unit": 273, "quantity": "22", "product": "Hand sanitiZER", "deliveries": [] }], "created_at": "2020-01-05T05:34:12Z" }], "limit": 5, "page": 1, "total_rows": 10, "total_pages": 2 }

    const wrapper = mount(MyPagination, {
      props: {
        totalData: data.data.length,
        maxVisibleButtons: 3,
        totalPages: data.total_pages,
        total: data.total_rows,
        perPage: data.limit,
        currentPage: data.page,
      }
    });
    expect(wrapper.text()).toMatch(`${data.data.length}`);
  });
});
