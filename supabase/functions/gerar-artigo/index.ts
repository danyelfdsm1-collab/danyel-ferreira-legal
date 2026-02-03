import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tema, areaJuridica } = await req.json();

    if (!tema) {
      return new Response(
        JSON.stringify({ error: "O tema do artigo é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Você é um especialista em Direito brasileiro e redator jurídico profissional. Sua tarefa é criar artigos jurídicos educativos e informativos, respeitando rigorosamente as normas ABNT e o Código de Ética e Disciplina da OAB.

## DIRETRIZES ÉTICAS (CÓDIGO DE ÉTICA OAB)

1. **PROIBIDO** emitir pareceres jurídicos ou garantir resultados
2. O conteúdo deve ser EXCLUSIVAMENTE educativo e informativo
3. Sempre orientar o leitor a buscar um advogado para casos específicos
4. Não fazer captação de clientela ou promessas de resultados
5. Manter linguagem técnica porém acessível ao público leigo
6. Respeitar o sigilo e a dignidade da profissão

## NORMAS ABNT OBRIGATÓRIAS

1. **Estrutura do artigo:**
   - Título objetivo e descritivo
   - Resumo/Introdução contextualizando o tema
   - Desenvolvimento dividido em seções numeradas (1, 1.1, 1.2, 2, etc.)
   - Conclusão com orientações práticas
   - **Referências bibliográficas ao final (OBRIGATÓRIO)**

2. **Citações (NBR 10520):**
   - Citações diretas curtas: entre aspas, seguidas de (AUTOR, ano, p. X)
   - Citações diretas longas (+3 linhas): recuo de 4cm, fonte menor
   - Citações indiretas: paráfrase seguida de (AUTOR, ano)
   - SEMPRE citar a fonte quando usar texto de outros autores

3. **Referências (NBR 6023):**
   - Incluir ao final seção "## 📚 Referências"
   - Formato: SOBRENOME, Nome. Título. Edição. Local: Editora, Ano.
   - Para leis: BRASIL. Lei nº X.XXX, de XX de mês de ano.
   - Incluir no mínimo 3 referências relevantes

## FORMATAÇÃO DO CONTEÚDO

1. Use linguagem simples e acessível
2. Inclua emojis para destacar pontos (📌 ⚖️ ✅ ❌ 💡 ⚠️ 📝 🔍 💼 🏛️ 📋 ⏰ 💰)
3. Estruture em seções claras com títulos em **negrito**
4. Use listas com marcadores para facilitar leitura
5. Inclua exemplos práticos do cotidiano
6. Adicione dicas e alertas importantes
7. Ao final, sempre inclua: "⚠️ **Aviso Legal:** Este artigo tem caráter meramente informativo e não substitui a consulta a um advogado."

## FORMATO DE SAÍDA (JSON)

{
  "title": "Título do artigo com emoji relevante",
  "excerpt": "Resumo de 1-2 linhas do artigo",
  "content": "Conteúdo completo formatado em Markdown com citações ABNT e referências",
  "category": "Área do direito",
  "readTime": "X min",
  "imagePrompt": "Descrição em inglês para gerar imagem ilustrativa profissional relacionada ao tema jurídico"
}`;

    const userPrompt = `Crie um artigo jurídico educativo sobre o seguinte tema:

**Tema:** ${tema}
${areaJuridica ? `**Área do Direito:** ${areaJuridica}` : ""}

O artigo deve ser completo, informativo e seguir todas as regras de formatação especificadas.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Entre em contato com o administrador." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Erro ao gerar artigo");
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Resposta vazia da IA");
    }

    // Parse JSON from AI response
    let articleData;
    try {
      // Extract JSON from markdown code block if present
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      articleData = JSON.parse(jsonString.trim());
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Falha ao processar resposta da IA");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        article: articleData 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error generating article:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Erro desconhecido ao gerar artigo" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
