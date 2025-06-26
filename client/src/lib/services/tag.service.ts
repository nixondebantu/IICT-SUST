import { APIUrl } from "../constants/url.config";
import { QueryParams } from "../dtos/query.dto";
import { TagCreateRes, TagReq, TagRes } from "../dtos/tag.dto";
import httpClient from "../utils/httpClient";

class TagService {
  async get(params: QueryParams) {
    const response = await httpClient.get<TagRes[]>(APIUrl.tag.getTags, {
      params,
    });
    return response.data;
  }

  async create(data: TagReq) {
    const response = await httpClient.post<TagCreateRes>(
      APIUrl.tag.createTag,
      data
    );
    return response.data;
  }
}

const tagService = new TagService();
export default tagService;
