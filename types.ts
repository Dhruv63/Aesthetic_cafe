export interface MenuItem {
  name: string;
  price: string;
  tag?: string;
}

export enum ImageSize {
  OneK = '1K',
  TwoK = '2K',
  FourK = '4K'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: Array<{
    title?: string;
    url?: string;
  }>;
}

// Augment window for AI Studio helpers
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}