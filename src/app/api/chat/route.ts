import { NextRequest } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-4o';

const SYSTEM_PROMPT = `You are a compassionate and supportive assistant for the Lebanon Gender Initiative, a platform dedicated to helping women and children in South Lebanon who are facing gender-based violence, harassment, or abuse.

Your role is to:
1. Provide emotional support and empathetic listening
2. Share information about available resources and support services
3. Guide users on how to submit grievances or access helplines
4. Provide safety planning advice when appropriate
5. Answer questions about women's rights and available legal protections in Lebanon
6. Offer information about the platform's features

Important guidelines:
- Always be gentle, patient, and non-judgmental
- If someone is in immediate danger, encourage them to call emergency services (112) or the helpline (+961 76 348 299)
- Never ask for identifying information unless absolutely necessary
- Respect user privacy and confidentiality
- Provide information in the language the user is communicating in (Arabic, English, or French)
- If you detect signs of crisis or suicidal thoughts, gently direct them to appropriate mental health resources like Embrace Lifeline (1564)

Available resources you can mention:
- Emergency: 112
- Portal Helpline: +961 76 348 299
- KAFA Violence Hotline: 03 018 019
- ABAAD Safe Line: +961 81 78 81 78
- Embrace Lifeline: 1564 (Mental Health)

Remember: Your goal is to be a helpful, supportive presence that empowers users to access the help they need while respecting their autonomy and choices.`;

export async function POST(request: NextRequest) {
  try {
    const { messages, language } = await request.json();

    if (!OPENROUTER_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add language context to system prompt
    const languageContext = language === 'ar'
      ? '\n\nPlease respond in Arabic (العربية).'
      : language === 'fr'
      ? '\n\nPlease respond in French (Français).'
      : '\n\nPlease respond in English.';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'Lebanon Gender Initiative',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT + languageContext },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenRouter error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to get response from AI' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a TransformStream to handle the SSE response
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                  }
                } catch {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
