import axios, { AxiosInstance } from "axios";
// import { api } from "../../src/http/api";

const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080"
})

describe("fetchOrders", () => {
  it("check limit api is 5", async () => {
    const response = await api.get("/orders", { params: { limit: 5 } });
    expect(response.status).toBe(200);
    expect(response.data.data.length).toBe(5);
  });
  it("check limit api is 1", async () => {
    const response = await api.get("/orders", { params: { limit: 1 } });
    expect(response.status).toBe(200);
    expect(response.data.data.length).toBe(1);
  });
  it("check filter by name", async () => {
    const response = await api.get("/orders", { params: { q: 'petr' } });
    expect(response.status).toBe(200);
    expect(response.data.data[0].customer.user_id).toBe('petr');
  });
  it("check empty array", async () => {
    const response = await api.get("/orders", { params: { page: 1000 } });
    expect(response.status).toBe(200);
    expect(response.data.data.length).toBe(0);
  });
});
