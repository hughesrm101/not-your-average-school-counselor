interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options: Array<{
    name: string;
    type: string;
    values: Array<{
      id: number;
      title: string;
    }>;
  }>;
  variants: Array<{
    id: number;
    sku: string;
    cost: number;
    price: number;
    is_enabled: boolean;
    is_default: boolean;
    is_available: boolean;
    options: number[];
  }>;
  images: Array<{
    src: string;
    variant_ids: number[];
    position: string;
    is_default: boolean;
  }>;
  created_at: string;
  updated_at: string;
  visible: boolean;
  is_locked: boolean;
  external: {
    id: string;
    handle: string;
  };
}

interface PrintifyOrder {
  id: string;
  order_number: number;
  address_to: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    region: string;
    city: string;
    address1: string;
    address2?: string;
    zip: string;
  };
  line_items: Array<{
    id: string;
    variant_id: number;
    quantity: number;
    price: number;
    cost: number;
  }>;
  shipping_method: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export class PrintifyService {
  private static readonly API_BASE = 'https://api.printify.com/v1';
  private static readonly API_KEY = process.env.PRINTIFY_API_KEY || '';

  private static async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.API_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Printify API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get all products
  static async getProducts(): Promise<PrintifyProduct[]> {
    try {
      const response = await this.makeRequest('/catalog/blueprints.json');
      return response;
    } catch (error) {
      console.error('Error fetching Printify products:', error);
      return [];
    }
  }

  // Get product by ID
  static async getProduct(productId: string): Promise<PrintifyProduct | null> {
    try {
      const response = await this.makeRequest(`/catalog/blueprints/${productId}.json`);
      return response;
    } catch (error) {
      console.error('Error fetching Printify product:', error);
      return null;
    }
  }

  // Create an order
  static async createOrder(orderData: {
    external_id: string;
    line_items: Array<{
      product_id: string;
      variant_id: number;
      quantity: number;
    }>;
    shipping_method: number;
    send_shipping_notification: boolean;
    address_to: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      country: string;
      region: string;
      city: string;
      address1: string;
      address2?: string;
      zip: string;
    };
  }): Promise<PrintifyOrder | null> {
    try {
      const response = await this.makeRequest('/orders.json', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
      return response;
    } catch (error) {
      console.error('Error creating Printify order:', error);
      return null;
    }
  }

  // Get order by ID
  static async getOrder(orderId: string): Promise<PrintifyOrder | null> {
    try {
      const response = await this.makeRequest(`/orders/${orderId}.json`);
      return response;
    } catch (error) {
      console.error('Error fetching Printify order:', error);
      return null;
    }
  }

  // Get shipping methods
  static async getShippingMethods(): Promise<any[]> {
    try {
      const response = await this.makeRequest('/shipping.json');
      return response;
    } catch (error) {
      console.error('Error fetching shipping methods:', error);
      return [];
    }
  }

  // Sync product to store
  static async syncProduct(productId: string, storeId: string): Promise<boolean> {
    try {
      await this.makeRequest(`/catalog/blueprints/${productId}/publish.json`, {
        method: 'POST',
        body: JSON.stringify({
          title: true,
          description: true,
          images: true,
          variants: true,
          tags: true,
          keyFeatures: true,
          shipping_template: true,
        }),
      });
      return true;
    } catch (error) {
      console.error('Error syncing product:', error);
      return false;
    }
  }
}
