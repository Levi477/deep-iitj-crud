// crublibrary.ts
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
    const url = `${this.apiUri}${path}?apiKey=${this.apiKey}`;
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
    return this.request('POST', '', data);
  }

  async read(id?: string) {
    const path = id ? `/${id}` : '';
    return this.request('GET', path);
  }

  async update(id: string, data: Record<string, any>) {
    return this.request('PUT', `/${id}`, data);
  }

  async delete(id: string) {
    return this.request('DELETE', `/${id}`);
  }
}
