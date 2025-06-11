import { APIUrl } from "../constants/url.config";
import { CarouselSlide } from "../dtos/carousel.dto";
import httpClient from "../utils/httpClient";

export class CarouselService {
  /**
   * Fetches all carousel slides from the API.
   * @returns A promise that resolves to an array of carousel slides.
   */
  async getSlides(): Promise<CarouselSlide[]> {
    try {
      const response = await httpClient.get<CarouselSlide[]>(
        APIUrl.carousel.getSlides
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch carousel slides:", error);
      // Re-throw the error to be handled by the calling component
      throw error;
    }
  }
    /**
   * Creates a new carousel slide.
   * @param data The form data (including the image file).
   */
  async createSlide(data: FormData) {
    const response = await httpClient.post(APIUrl.carousel.createSlide, data, {
      headers: {
        // This header is crucial for file uploads
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  /**
   * Updates an existing carousel slide.
   * @param id The ID of the slide to update.
   * @param data The form data (can include a new image).
   */
  async updateSlide(id: number, data: FormData) {
    const response = await httpClient.put(APIUrl.carousel.updateSlide(String(id)), data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  /**
   * Deletes a carousel slide.
   * @param id The ID of the slide to delete.
   */
  async deleteSlide(id: number) {
    const response = await httpClient.delete(APIUrl.carousel.deleteSlide(String(id)));
    return response.data;
  }
}


const carouselService = new CarouselService();
export default carouselService;

