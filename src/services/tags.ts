import type { AxiosInstance } from "axios";

class TagService {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async create(name: string) {
    const { data } = await this.api.post("/tags", { name });
    return data;
  }

  async findAll() {
    const { data } = await this.api.get("/tags");
    return data;
  }

  async delete(tagId: string) {
    const { data } = await this.api.delete(`/tags/${tagId}`);
    return data;
  }
}

export default TagService;
