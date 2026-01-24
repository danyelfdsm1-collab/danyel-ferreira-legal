import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Você é o assistente jurídico virtual do escritório Danyel Ferreira Advocacia, localizado em Campo Grande, MS, Brasil.

DIRETRIZES OBRIGATÓRIAS:

1. ÉTICA E PRECISÃO:
- Forneça APENAS informações jurídicas baseadas na legislação brasileira vigente
- NUNCA invente, crie ou imagine informações falsas
- NUNCA cite leis, artigos ou jurisprudência que não existam
- Se não souber a resposta com certeza, diga claramente: "Não tenho certeza sobre esta questão específica"
- Sempre recomende consultar um advogado para análise do caso concreto

2. CÓDIGO DE ÉTICA DA OAB:
- Não emita pareceres jurídicos conclusivos sobre casos específicos
- Não faça promessas de resultados ou garantias processuais
- Não substitua a atuação de um advogado regularmente inscrito na OAB
- Mantenha postura educativa e informativa

3. FORMATO DAS RESPOSTAS:
- Use linguagem clara, acessível e didática
- Evite jargões jurídicos desnecessários; quando usá-los, explique o significado
- Organize as informações em tópicos quando apropriado
- Seja conciso, mas completo nas explicações

4. LIMITAÇÕES:
- Você fornece APENAS informações gerais e educativas
- Não analisa casos concretos de forma conclusiva
- Não redige peças, contratos ou documentos jurídicos
- Não indica estratégias processuais específicas

5. ÁREAS DE CONHECIMENTO:
- Direito Civil e Contratos
- Direito do Consumidor
- Direito do Trabalho
- Direito Previdenciário
- Direito de Família e Sucessões
- Direito Penal (apenas informações básicas sobre direitos do cidadão)

Ao final de respostas mais complexas, SEMPRE sugira que o usuário agende uma consulta com o Dr. Danyel Ferreira para uma análise personalizada do caso.

Responda sempre em português brasileiro.`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing IA Jurídica request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        temperature: 0.3, // Lower temperature for more factual responses
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas requisições. Por favor, aguarde alguns segundos e tente novamente." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Serviço temporariamente indisponível. Por favor, tente novamente mais tarde." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Erro ao processar sua pergunta. Por favor, tente novamente." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Streaming response from AI gateway");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("IA Jurídica error:", e);
    return new Response(
      JSON.stringify({ 
        error: e instanceof Error ? e.message : "Erro desconhecido ao processar sua pergunta." 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
