import { APIUrl } from "../constants/url.config";
import { DirectorMessage } from "../dtos/directorMessage.dto";
import { DirectorMessageFormValues } from "../validators/directorMessage.validator";
import httpClient from "../utils/httpClient";

class DirectorMessageService {
  /**
   * Fetches the single director's message.
   * Can return null if no message is found (404).
   */
  async getMessage(): Promise<DirectorMessage | null> {
    try {
      const response = await httpClient.get<DirectorMessage>(
        APIUrl.directorMessage.getMessage
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return null; // No message found, this is an expected outcome
      }
      throw error; // Re-throw other errors
    }
  }

  /**
   * Creates the single director's message.
   */
  async createMessage(data: DirectorMessageFormValues) {
    const response = await httpClient.post(
      APIUrl.directorMessage.createMessage,
      data
    );
    return response.data;
  }

  /**
   * Updates the existing director's message.
   */
  async updateMessage(id: number, data: DirectorMessageFormValues) {
    const response = await httpClient.put(
      APIUrl.directorMessage.updateMessage(String(id)),
      data
    );
    return response.data;
  }
}

const directorMessageService = new DirectorMessageService();
export default directorMessageService;