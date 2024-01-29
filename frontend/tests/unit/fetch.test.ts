import axios, { AxiosInstance } from "axios";
// import { api } from "../../src/http/api";

const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080"
})

test("fetchOrders", async () => {
  const response = await api.get("/orders", { params: { limit: 5 }});
  expect(response.status).toBe(200);
  expect(response.data.data.length).toBe(5);
});
