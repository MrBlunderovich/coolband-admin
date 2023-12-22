import {
  CreateParams,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  UpdateManyParams,
  UpdateParams,
  fetchUtils,
} from "react-admin";
import { stringify } from "query-string";

const apiUrl = import.meta.env.VITE_POCKETHOST_URL;
const httpClient = fetchUtils.fetchJson;

function composeURL(resource: string, id?: string) {
  const idString = id ? id + "/" : "";
  return `${apiUrl}/${resource}/records/${idString}`;
}

export default {
  getList: async (resource: string, params: GetListParams) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      page,
      perPage,
      sort: `${order === "ASC" ? "-" : ""}${field}`,
    };
    const url = `${composeURL(resource)}?${stringify(query)}`;
    const { json, headers } = await httpClient(url);
    return {
      data: json.items,
      total: json.totalItems,
    };
  },

  getOne: async (resource: string, params: GetOneParams) => {
    const url = composeURL(resource, params.id);
    const { json } = await httpClient(url);
    return { data: json };
  },

  getMany: async (resource: string, params: GetManyParams) => {
    console.log(params.ids);
    const query = {
      filter: `(id?=('${params.ids}'))`,
    };
    const url = `${composeURL(resource)}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return { data: json };
  },

  getManyReference: async (
    resource: string,
    params: GetManyReferenceParams
  ) => {
    //did not implement
    return {
      data: [],
      total: 0,
    };
  },

  create: async (resource: string, params: CreateParams) => {
    const url = composeURL(resource);
    const { json } = await httpClient(url, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  update: async (resource: string, params: UpdateParams) => {
    const url = composeURL(resource, params.id);
    const { json } = await httpClient(url, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  updateMany: async (resource: string, params: UpdateManyParams) => {
    //did not implement
    return { data: [] };
  },

  delete: async (resource: string, params: DeleteParams) => {
    const url = composeURL(resource, params.id);
    const { json } = await httpClient(url, {
      method: "DELETE",
    });
    return { data: json };
  },

  deleteMany: async (resource: string, params: DeleteManyParams) => {
    const ids: string[] = params.ids;
    const promises = ids.map((id) => {
      try {
        const url = composeURL(resource, id);
        return httpClient(url, {
          method: "DELETE",
        }).then((res) => res.json);
      } catch (_) {
        return Promise.reject("failed to delete");
      }
    });

    return Promise.all(promises).then((results) => ({ data: results }));
  },
};
