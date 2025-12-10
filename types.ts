export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number; // The threshold for the alert (e.g., 15)
  unit: string;
  location: string; // New field for shelf/bin location
  lastUpdated: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: 'office' | 'organization' | 'safety';
  duration: string;
  imageUrl: string;
}

export interface StockMovement {
  id: string;
  itemId: string;
  itemName: string;
  type: 'IN' | 'OUT';
  quantity: number;
  date: string;
  employeeName?: string; // Required for OUT
}

export interface FinancialRecord {
  id: string;
  invoiceNumber: string;
  supplier: string;
  date: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}