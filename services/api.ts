
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const chatService = {
  async sendMessageStream(message: string, onChunk: (chunk: string) => void): Promise<void> {
    try {
      const response = await fetch('http://localhost:8001/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') return;
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.content) {
                        onChunk(parsed.content);
                    }
                } catch (e) {
                    // Ignore parse errors for partial chunks
                }
            }
        }
      }
    } catch (error) {
      console.error('Chat stream error:', error);
      throw error;
    }
  }
};
