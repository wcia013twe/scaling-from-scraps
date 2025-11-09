import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'pt' | 'ar' | 'hi' | 'ru';

interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  language: Language;
}

interface ChatbotActions {
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
  setLanguage: (language: Language) => void;
}

export const useChatbotStore = create<ChatbotState & ChatbotActions>()(
  persist(
    (set) => ({
      // State
      isOpen: false,
      messages: [],
      isLoading: false,
      language: 'en',

      // Actions
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      setOpen: (open) => set({ isOpen: open }),

      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: Math.random().toString(36).substring(7),
              timestamp: Date.now(),
            },
          ],
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      clearMessages: () => set({ messages: [] }),

      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'chatbot-storage',
      partialize: (state) => ({ messages: state.messages, language: state.language }),
    }
  )
);
