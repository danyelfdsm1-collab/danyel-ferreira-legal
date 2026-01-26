import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Lista de temas jurídicos para geração automática
const TEMAS_JURIDICOS = [
  { tema: "Direitos trabalhistas em home office", area: "Direito Trabalhista" },
  { tema: "Divórcio consensual: passo a passo completo", area: "Direito de Família" },
  { tema: "Indenização por danos morais: quando é cabível", area: "Direito Civil" },
  { tema: "Direitos do inquilino: o que a lei garante", area: "Direito Imobiliário" },
  { tema: "Como recorrer de multas de trânsito", area: "Direito de Trânsito" },
  { tema: "Aposentadoria especial: quem tem direito", area: "Direito Previdenciário" },
  { tema: "Herança: ordem de sucessão e direitos", area: "Direito das Sucessões" },
  { tema: "Pensão por morte: requisitos e beneficiários", area: "Direito Previdenciário" },
  { tema: "Direito do consumidor em compras online", area: "Direito do Consumidor" },
  { tema: "Guarda compartilhada: como funciona na prática", area: "Direito de Família" },
  { tema: "Rescisão de contrato de trabalho: direitos do empregado", area: "Direito Trabalhista" },
  { tema: "Usucapião: como adquirir propriedade pelo tempo", area: "Direito Imobiliário" },
  { tema: "Pensão alimentícia: cálculo e revisão", area: "Direito de Família" },
  { tema: "Acidentes de trabalho: responsabilidades e indenizações", area: "Direito Trabalhista" },
  { tema: "Inventário: judicial vs extrajudicial", area: "Direito das Sucessões" },
  { tema: "Contrato de aluguel: cláusulas essenciais", area: "Direito Imobiliário" },
  { tema: "Aposentadoria por invalidez: requisitos atuais", area: "Direito Previdenciário" },
  { tema: "Dívidas prescritas: quando não precisa mais pagar", area: "Direito Civil" },
  { tema: "Assédio moral no trabalho: como provar e agir", area: "Direito Trabalhista" },
  { tema: "União estável: direitos e deveres", area: "Direito de Família" },
  { tema: "Testamento: tipos e como fazer", area: "Direito das Sucessões" },
  { tema: "Despejo: prazos e procedimentos legais", area: "Direito Imobiliário" },
  { tema: "FGTS: saque e direitos do trabalhador", area: "Direito Trabalhista" },
  { tema: "Divórcio litigioso: quando é necessário", area: "Direito de Família" },
  { tema: "Direitos do passageiro aéreo", area: "Direito do Consumidor" },
  { tema: "Aposentadoria rural: regras específicas", area: "Direito Previdenciário" },
  { tema: "Cobrança indevida: direitos do consumidor", area: "Direito do Consumidor" },
  { tema: "Adoção: processo e requisitos legais", area: "Direito de Família" },
  { tema: "Seguro de vida: quando a seguradora deve pagar", area: "Direito Civil" },
  { tema: "Férias trabalhistas: cálculo e direitos", area: "Direito Trabalhista" },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials not configured");
    }

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Verificar último artigo criado
    const { data: lastArticle, error: fetchError } = await supabase
      .from("articles")
      .select("created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching last article:", fetchError);
      throw new Error("Erro ao verificar último artigo");
    }

    // Calcular se deve gerar novo artigo (3 dias = 72 horas)
    const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
    const now = new Date();
    
    if (lastArticle) {
      const lastCreatedAt = new Date(lastArticle.created_at);
      const timeSinceLastArticle = now.getTime() - lastCreatedAt.getTime();
      
      if (timeSinceLastArticle < THREE_DAYS_MS) {
        const hoursRemaining = Math.ceil((THREE_DAYS_MS - timeSinceLastArticle) / (1000 * 60 * 60));
        console.log(`Último artigo criado há menos de 3 dias. Próximo em ${hoursRemaining} horas.`);
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: `Próximo artigo será gerado em ${hoursRemaining} horas`,
            nextGenerationIn: hoursRemaining
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Selecionar tema aleatório
    const randomIndex = Math.floor(Math.random() * TEMAS_JURIDICOS.length);
    const selectedTopic = TEMAS_JURIDICOS[randomIndex];

    console.log(`Gerando artigo sobre: ${selectedTopic.tema}`);

    // Gerar artigo via IA
    const systemPrompt = `Você é um especialista em Direito brasileiro e redator jurídico profissional. Sua tarefa é criar artigos jurídicos educativos e informativos.

REGRAS DE FORMATAÇÃO:
1. Use linguagem simples e acessível, evitando jargões excessivos
2. Inclua emojis relevantes para destacar pontos importantes (📌 ⚖️ ✅ ❌ 💡 ⚠️ 📝 🔍 💼 🏛️ 📋 ⏰ 💰)
3. Siga estrutura profissional inspirada em normas ABNT:
   - Título claro e objetivo
   - Introdução contextualizando o tema
   - Desenvolvimento com subtítulos numerados
   - Pontos-chave em listas
   - Conclusão com orientações práticas
   - Referências quando aplicável

4. Estruture o artigo em seções claras com títulos em **negrito**
5. Use listas com marcadores para facilitar a leitura
6. Inclua exemplos práticos do cotidiano
7. Adicione dicas e alertas importantes com emojis

FORMATO DE SAÍDA (JSON):
{
  "title": "Título do artigo com emoji relevante",
  "excerpt": "Resumo de 1-2 linhas do artigo",
  "content": "Conteúdo completo formatado em Markdown",
  "category": "Área do direito",
  "readTime": "X min",
  "imagePrompt": "Descrição em inglês para gerar imagem ilustrativa profissional relacionada ao tema jurídico"
}`;

    const userPrompt = `Crie um artigo jurídico educativo sobre o seguinte tema:

**Tema:** ${selectedTopic.tema}
**Área do Direito:** ${selectedTopic.area}

O artigo deve ser completo, informativo e seguir todas as regras de formatação especificadas.`;

    const articleResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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

    if (!articleResponse.ok) {
      const errorText = await articleResponse.text();
      console.error("AI gateway error:", articleResponse.status, errorText);
      throw new Error("Erro ao gerar artigo via IA");
    }

    const aiResponse = await articleResponse.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Resposta vazia da IA");
    }

    // Parse JSON from AI response
    let articleData;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      articleData = JSON.parse(jsonString.trim());
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Falha ao processar resposta da IA");
    }

    console.log(`Artigo gerado: ${articleData.title}`);

    // Gerar imagem ilustrativa
    let imageUrl = null;
    if (articleData.imagePrompt) {
      try {
        const enhancedPrompt = `Professional legal illustration for a law firm blog article. ${articleData.imagePrompt}. Clean, modern, corporate style. Blue and gold color scheme. No text overlay. 16:9 aspect ratio. Ultra high resolution.`;

        const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image",
            messages: [
              {
                role: "user",
                content: enhancedPrompt,
              },
            ],
            modalities: ["image", "text"],
          }),
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
          console.log("Imagem gerada com sucesso");
        } else {
          console.warn("Falha ao gerar imagem, usando placeholder");
        }
      } catch (imageError) {
        console.warn("Erro ao gerar imagem:", imageError);
      }
    }

    // Salvar artigo no banco de dados
    const { data: insertedArticle, error: insertError } = await supabase
      .from("articles")
      .insert({
        title: articleData.title,
        excerpt: articleData.excerpt,
        content: articleData.content,
        category: articleData.category || selectedTopic.area,
        read_time: articleData.readTime || "5 min",
        image_url: imageUrl,
        published: true,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting article:", insertError);
      throw new Error("Erro ao salvar artigo no banco de dados");
    }

    console.log(`Artigo salvo com sucesso: ${insertedArticle.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Artigo gerado e salvo com sucesso",
        article: {
          id: insertedArticle.id,
          title: insertedArticle.title,
          category: insertedArticle.category,
        }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in automatic article generation:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Erro desconhecido ao gerar artigo" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
