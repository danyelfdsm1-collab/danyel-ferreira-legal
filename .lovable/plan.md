

## Plano: Geração Automática de Artigos com IA

### Visão Geral

Implementar um sistema que gera automaticamente novos artigos jurídicos a cada 3 dias usando inteligência artificial. Os artigos serão salvos no banco de dados e exibidos automaticamente no blog.

---

### Arquitetura da Solução

```text
┌─────────────────────────────────────────────────────────────┐
│                    FLUXO DE GERAÇÃO                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐    ┌─────────────────┐    ┌───────────────┐  │
│  │ pg_cron  │───▶│ Edge Function   │───▶│ Lovable AI    │  │
│  │ (3 dias) │    │ gerar-artigo-   │    │ (Gemini)      │  │
│  └──────────┘    │ automatico      │    └───────────────┘  │
│                  └────────┬────────┘                        │
│                           │                                 │
│                           ▼                                 │
│                  ┌─────────────────┐                        │
│                  │ Tabela:         │                        │
│                  │ articles        │                        │
│                  │ (banco de dados)│                        │
│                  └────────┬────────┘                        │
│                           │                                 │
│                           ▼                                 │
│                  ┌─────────────────┐                        │
│                  │ Página de       │                        │
│                  │ Artigos         │                        │
│                  │ (exibição)      │                        │
│                  └─────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

---

### Etapa 1: Criar Tabela de Artigos

Nova tabela `articles` no banco de dados:

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | Identificador único |
| title | text | Título do artigo |
| excerpt | text | Resumo curto |
| content | text | Conteúdo em Markdown |
| category | text | Área do direito |
| read_time | text | Tempo de leitura |
| image_url | text | URL da imagem gerada |
| published | boolean | Se está publicado |
| created_at | timestamp | Data de criação |

**Políticas RLS:** Leitura pública para artigos publicados.

---

### Etapa 2: Criar Edge Function para Geração Automática

Nova função `gerar-artigo-automatico`:

1. Verifica se já existe artigo criado nos últimos 3 dias
2. Se não existir, seleciona um tema aleatório da lista de temas jurídicos
3. Chama a IA para gerar o artigo
4. Gera a imagem ilustrativa
5. Salva no banco de dados

**Lista de Temas Automáticos:**
- Direitos trabalhistas em home office
- Divórcio: como funciona o processo
- Indenização por danos morais
- Direitos do inquilino na pandemia
- Como recorrer de multas de trânsito
- Aposentadoria especial
- Herança: quem tem direito
- Pensão por morte: requisitos
- E outros 20+ temas jurídicos relevantes

---

### Etapa 3: Configurar Cron Job (Agendamento)

Usar **pg_cron** + **pg_net** para executar a função periodicamente:

- **Frequência:** A cada 3 dias (72 horas)
- **Horário sugerido:** 09:00 (horário de Brasília)
- **Expressão cron:** `0 12 */3 * *` (12:00 UTC = 09:00 BRT)

---

### Etapa 4: Adaptar Frontend

Modificar as páginas para buscar artigos do banco de dados:

1. **`src/pages/Artigos.tsx`**: Buscar artigos via Supabase ao invés do arquivo estático
2. **`src/pages/ArtigoDetalhes.tsx`**: Buscar artigo individual do banco
3. **Manter artigos estáticos como fallback** durante transição

---

### Resumo das Alterações

| Arquivo/Recurso | Ação |
|-----------------|------|
| Tabela `articles` | Criar no banco de dados |
| `supabase/functions/gerar-artigo-automatico/index.ts` | Criar edge function |
| `supabase/config.toml` | Adicionar configuração da nova função |
| Cron job (pg_cron) | Configurar agendamento |
| `src/pages/Artigos.tsx` | Buscar do banco de dados |
| `src/pages/ArtigoDetalhes.tsx` | Buscar do banco de dados |
| `src/hooks/useArticles.ts` | Criar hook para gerenciar artigos |

---

### Benefícios

- **Conteúdo sempre atualizado:** Novos artigos a cada 3 dias automaticamente
- **Zero manutenção:** A IA gera, formata e publica sem intervenção
- **SEO melhorado:** Mais conteúdo indexável pelo Google
- **Engajamento:** Usuários têm motivo para voltar ao site

---

### Detalhes Técnicos

**Edge Function - Verificação de Intervalo:**
```text
1. Busca último artigo criado
2. Calcula diferença de tempo
3. Se >= 3 dias OU tabela vazia:
   - Seleciona tema aleatório
   - Gera artigo com IA
   - Gera imagem
   - Insere no banco
4. Retorna status da operação
```

**Cron Job - Configuração SQL:**
```text
- Habilitar extensões: pg_cron, pg_net
- Agendar chamada HTTP para edge function
- Executar a cada 3 dias às 09:00
```

