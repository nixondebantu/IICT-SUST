import { APIUrl } from "../constants/url.config";
import { Notice } from "../dtos/notice.dto";
import httpClient from "../utils/httpClient";

export class NoticeService {
  async getNotices(): Promise<Notice[]> {
    const response = await httpClient.get<Notice[]>(APIUrl.notice.getNotices);
    return response.data;
  }

  async createNotice(data: FormData) {
    const response = await httpClient.post(APIUrl.notice.createNotice, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  async updateNotice(id: number, data: FormData) {
    const response = await httpClient.put(APIUrl.notice.updateNotice(String(id)), data, {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  }

  async deleteNotice(id: number) {
    const response = await httpClient.delete(APIUrl.notice.deleteNotice(String(id)));
    return response.data;
  }
}

const noticeService = new NoticeService();
export default noticeService;