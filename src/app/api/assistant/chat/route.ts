import { NextRequest, NextResponse } from 'next/server';
import { generateAssistantResponse, ChatMessage } from '@/lib/ai/assistant-engine';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message || '';
    const history: ChatMessage[] = body.history || [];

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Query message is required' },
        { status: 400 }
      );
    }

    const response = await generateAssistantResponse(message, history);

    return NextResponse.json({
      success: true,
      reply: response.reply,
      actions: response.actions || [],
      suggestedPrompts: response.suggestedPrompts || [],
    });
  } catch (error: any) {
    console.error('[Error in /api/assistant/chat]:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process AI assistant query. Please try again.' 
      },
      { status: 500 }
    );
  }
}
