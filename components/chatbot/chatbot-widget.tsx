'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Trash2, Languages, Check } from 'lucide-react';
import { useChatbotStore, Language } from '@/lib/stores/chatbot-store';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export function ChatbotWidget() {
  const { isOpen, messages, isLoading, language, toggleOpen, addMessage, setLoading, clearMessages, setLanguage } =
    useChatbotStore();
  const [input, setInput] = useState('');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    addMessage({ role: 'user', content: userMessage });
    setLoading(true);

    try {
      // Call API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, messages, language }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      addMessage({ role: 'assistant', content: data.message });
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={toggleOpen}
              className="h-16 w-16 rounded-full bg-white hover:shadow-2xl transition-all duration-300 shadow-lg overflow-hidden border-2 border-[#003ac9] hover:scale-110"
            >
              <Image
                src="/Scaling from Scraps - Character.png"
                alt="Steve"
                width={100}
                height={100}
                className="object-cover scale-150"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-6 bottom-6 top-24 w-96 max-w-[calc(100vw-3rem)] z-50 flex flex-col bg-card border rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-[#003ac9]/10 to-[#adff02]/10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-[#003ac9]">
                  <Image
                    src="/Scaling from Scraps - Character.png"
                    alt="AI Coach"
                    width={100}
                    height={100}
                    className="object-cover scale-150"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">Steve</h3>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[#adff02]/30 text-[#003ac9] font-medium uppercase">
                      {language}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Language Selector */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="h-8 w-8"
                    title={`Current language: ${LANGUAGES.find(l => l.code === language)?.name}`}
                  >
                    <span className="text-lg">
                      {LANGUAGES.find(l => l.code === language)?.flag}
                    </span>
                  </Button>

                  <AnimatePresence>
                    {showLanguageMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 top-10 w-48 bg-card border rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto"
                      >
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setShowLanguageMenu(false);
                            }}
                            className={`w-full flex items-center justify-between gap-3 px-4 py-2 hover:bg-muted transition-colors text-left ${
                              language === lang.code ? 'bg-[#adff02]/20 font-semibold' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{lang.flag}</span>
                              <span className="text-sm font-medium">{lang.name}</span>
                            </div>
                            {language === lang.code && (
                              <Check size={16} className="text-[#003ac9]" strokeWidth={3} />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearMessages}
                  className="h-8 w-8"
                  title="Clear chat"
                >
                  <Trash2 size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleOpen}
                  className="h-8 w-8"
                >
                  <X size={20} />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-[#003ac9] mb-4">
                    <Image
                      src="/Scaling from Scraps - Character.png"
                      alt="Steve"
                      width={96}
                      height={96}
                      className="object-cover scale-150"
                    />
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Hey! I'm your AI business coach.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ask me anything about your ecommerce journey!
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-[#003ac9] to-[#adff02] text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-background/50 backdrop-blur rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-[#adff02] disabled:opacity-50"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#003ac9] to-[#adff02] hover:shadow-lg transition-all"
                >
                  <Send size={18} className="text-white" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
