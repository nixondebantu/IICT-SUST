import { APIUrl } from "../constants/url.config";
import { ApiPaginatedResponse } from "../dtos/getData.dto";
import {
  NoticeCreateRes,
  NoticeDeleteRes,
  NoticeReq,
  NoticeRes,
} from "../dtos/notice.dto";
import { QueryParams } from "../dtos/query.dto";
import httpClient from "../utils/httpClient";

export class NoticeService {
  async get(params: QueryParams) {
    const response = await httpClient.get<ApiPaginatedResponse<NoticeRes>>(
      APIUrl.notice.getNotices,
      {
        params,
      }
    );
    return response.data;
  }

  async getById(id: number) {
    const response = await httpClient.get<NoticeRes>(
      APIUrl.notice.getNoticeById(id.toString())
    );
    return response.data;
  }

  async create(data: NoticeReq) {
    const response = await httpClient.post<NoticeCreateRes>(
      APIUrl.notice.createNotice,
      data
    );
    return response.data;
  }

  async update(id: number, data: NoticeReq) {
    const response = await httpClient.put<NoticeCreateRes>(
      APIUrl.notice.updateNotice(id.toString()),
      data
    );
    return response.data;
  }

  async delete(id: number) {
    const response = await httpClient.delete<NoticeDeleteRes>(
      APIUrl.notice.deleteNotice(id.toString())
    );
    return response.data;
  }
}

const noticeService = new NoticeService();
export default noticeService;
