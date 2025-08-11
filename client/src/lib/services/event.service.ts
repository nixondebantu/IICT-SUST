// src/lib/services/event.service.ts

import { APIUrl } from "../constants/url.config";
import { ApiPaginatedResponse } from "../dtos/getData.dto";
import {
  EventCreateRes,
  EventDeleteRes,
  EventReq,
  EventRes,
} from "../dtos/event.dto";
import { QueryParams } from "../dtos/query.dto";
import httpClient from "../utils/httpClient";

export class EventService {
  async get(params: QueryParams) {
    const response = await httpClient.get<ApiPaginatedResponse<EventRes>>(
      APIUrl.event.getEvents,
      {
        params,
      }
    );
    return response.data;
  }

  async getById(id: number) {
    const response = await httpClient.get<EventRes>(
      APIUrl.event.getEventById(id.toString())
    );
    return response.data;
  }

  async create(data: EventReq) {
    const response = await httpClient.post<EventCreateRes>(
      APIUrl.event.createEvent,
      data
    );
    return response.data;
  }

  async update(id: number, data: EventReq) {
    const response = await httpClient.put<EventCreateRes>(
      APIUrl.event.updateEvent(id.toString()),
      data
    );
    return response.data;
  }

  async delete(id: number) {
    const response = await httpClient.delete<EventDeleteRes>(
      APIUrl.event.deleteEvent(id.toString())
    );
    return response.data;
  }
}

const eventService = new EventService();
export default eventService;
