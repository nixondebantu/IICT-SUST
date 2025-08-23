// src/lib/services/news.service.ts

import { APIUrl } from "../constants/url.config";
import { ApiPaginatedResponse } from "../dtos/getData.dto";
import {
  NewsCreateRes,
  NewsDeleteRes,
  NewsReq,
  NewsRes,
} from "../dtos/news.dto";
import { QueryParams } from "../dtos/query.dto";
import httpClient from "../utils/httpClient";

export class NewsService {
  async get(params: QueryParams) {
    const response = await httpClient.get<ApiPaginatedResponse<NewsRes>>(
      APIUrl.news.getNews,
      { params }
    );
    return response.data;
  }

  async getById(id: number) {
    const response = await httpClient.get<NewsRes>(
      APIUrl.news.getNewsById(id.toString())
    );
    return response.data;
  }

  async create(data: NewsReq) {
    const response = await httpClient.post<NewsCreateRes>(
      APIUrl.news.createNews,
      data
    );
    return response.data;
  }

  async update(id: number, data: Partial<NewsReq>) {
    const response = await httpClient.put<NewsCreateRes>(
      APIUrl.news.updateNews(id.toString()),
      data
    );
    return response.data;
  }

  async delete(id: number) {
    const response = await httpClient.delete<NewsDeleteRes>(
      APIUrl.news.deleteNews(id.toString())
    );
    return response.data;
  }
}

const newsService = new NewsService();
export default newsService;
