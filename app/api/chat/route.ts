import { NextRequest, NextResponse } from 'next/server';

const LANGUAGE_RESPONSES: Record<string, string[]> = {
  en: [
    "That's a great question! Let me help you with that. Based on your current progress, I'd suggest focusing on consistent daily actions.",
    "I'm here to support you on your ecommerce journey! Remember, small steps lead to big results.",
    "Great thinking! Building multiple income streams is a smart strategy. Would you like some tips on how to balance them?",
    "I can see you're making progress! Keep up the momentum and don't hesitate to ask if you need guidance.",
    "That's an interesting approach. Let me share some insights that might help you with that decision.",
  ],
  es: [
    "¡Esa es una gran pregunta! Déjame ayudarte con eso. Según tu progreso actual, te sugiero enfocarte en acciones diarias consistentes.",
    "¡Estoy aquí para apoyarte en tu viaje de comercio electrónico! Recuerda, los pequeños pasos conducen a grandes resultados.",
    "¡Excelente pensamiento! Construir múltiples flujos de ingresos es una estrategia inteligente. ¿Te gustaría algunos consejos sobre cómo equilibrarlos?",
    "¡Puedo ver que estás progresando! Mantén el impulso y no dudes en preguntar si necesitas orientación.",
    "Ese es un enfoque interesante. Déjame compartir algunas ideas que podrían ayudarte con esa decisión.",
  ],
  fr: [
    "C'est une excellente question ! Laissez-moi vous aider. Selon vos progrès actuels, je suggère de vous concentrer sur des actions quotidiennes cohérentes.",
    "Je suis là pour vous soutenir dans votre parcours e-commerce ! Rappelez-vous, les petits pas mènent à de grands résultats.",
    "Excellente réflexion ! Construire plusieurs flux de revenus est une stratégie intelligente. Voulez-vous des conseils pour les équilibrer ?",
    "Je vois que vous progressez ! Gardez l'élan et n'hésitez pas à demander si vous avez besoin de conseils.",
    "C'est une approche intéressante. Laissez-moi partager quelques idées qui pourraient vous aider avec cette décision.",
  ],
};

export async function POST(request: NextRequest) {
  try {
    const { message, messages, language = 'en' } = await request.json();

    // Get responses for the selected language, fallback to English
    const responses = LANGUAGE_RESPONSES[language] || LANGUAGE_RESPONSES.en;

    // Simple mock response - randomly select one
    const mockResponse = responses[Math.floor(Math.random() * responses.length)];

    // Simulate a slight delay to make it feel more natural
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ message: mockResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
