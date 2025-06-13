import { APIUrl } from "../constants/url.config";
import { DirectorMessage } from "../dtos/directorMessage.dto";
import httpClient from "../utils/httpClient";

class DirectorMessageService {
  async getMessages(): Promise<DirectorMessage[]> {
    const response = await httpClient.get<DirectorMessage[]>(APIUrl.directorMessage.getMessages);
    return response.data;
  }

  async createMessage(data: FormData) {
    const response = await httpClient.post(APIUrl.directorMessage.createMessage, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  async updateMessage(id: number, data: FormData) {
    const response = await httpClient.put(APIUrl.directorMessage.updateMessage(String(id)), data, {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  }

  async deleteMessage(id: number) {
    const response = await httpClient.delete(APIUrl.directorMessage.deleteMessage(String(id)));
    return response.data;
  }
}

const directorMessageService = new DirectorMessageService();
export default directorMessageService;