import { log } from "console";

type CrudConfig = {
  apiKey: string;
  apiUri: string;
};

export class CrudClient {
  private apiKey: string;
  private apiUri: string;

  constructor(config: CrudConfig) {
    this.apiKey = config.apiKey;
    this.apiUri = config.apiUri.replace(/\/+$/, ''); // remove trailing slash
  }

  private async request(method: string, path: string = '', data?: any) {
    // Ensure the URL is correctly formatted, including the API key
    const url = `${this.apiUri}${path}?apiKey=${this.apiKey}`;
    log(url);

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Error ${response.status}`);
    }

    return response.json();
  }

  async create(data: Record<string, any>) {
    // Use POST method to create a new entry
    return this.request('POST', '/api/create', data);
  }

  async read(id?: string) {
    // Use GET method to retrieve data by id (or all data if no id provided)
    const path = id ? `/api/get?id=${id}` : '/api/get';
    return this.request('GET', path);
  }

  async update(id: string, data: Record<string, any>) {
    // Use PUT method to update an existing entry
    return this.request('PUT', `/api/update?id=${id}`, data);
  }

  async delete(id: string) {
    // Use DELETE method to delete an entry
    return this.request('DELETE', `/api/delete?id=${id}`);
  }
}
