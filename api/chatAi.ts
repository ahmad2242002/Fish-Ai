import { GoogleGenerativeAI } from '@google/generative-ai';
// Initialize the Gemini AI client
const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Fish coach system prompt
const FISH_COACH_PROMPT = `You are Fish Coach, an expert fishing guide and coach. You provide helpful, accurate, and engaging advice about:

- Fishing techniques and methods
- Fish behavior and habitats
- Equipment recommendations
- Best fishing locations and times
- Safety tips for fishing
- Conservation and sustainable fishing practices
- Troubleshooting common fishing problems

Always respond in a friendly, encouraging tone. Keep responses concise but informative. Use fishing terminology appropriately and explain technical terms when needed. Include practical tips that anglers can immediately apply.

If someone asks about something not related to fishing, politely redirect them back to fishing topics.`;

export interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class FishCoachAI {
  private model: any;
  private chat: any;

  constructor() {
    try {
      this.model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      this.startNewChat();
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
    }
  }

  private startNewChat() {
    try {
      this.chat = this.model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: 'Hello, I need fishing advice.' }],
          },
          {
            role: 'model',
            parts: [{ text: FISH_COACH_PROMPT }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });
    } catch (error) {
      console.error('Failed to start chat:', error);
    }
  }

  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      if (!this.chat) {
        return {
          success: false,
          error: 'Chat not initialized. Please check your API key.',
        };
      }

      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      return {
        success: true,
        message: text,
      };
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  resetChat() {
    this.startNewChat();
  }
}

// Export a singleton instance
export const fishCoachAI = new FishCoachAI();
