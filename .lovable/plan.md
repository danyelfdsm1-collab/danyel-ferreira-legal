
## Plano para Corrigir os Artigos

### Problema Identificado
A página de Artigos tem duas funcionalidades não implementadas:

1. **Links dos artigos não funcionam** - Os links apontam para `/artigos/:id`, mas essa rota não existe no sistema
2. **Filtros não funcionam** - Os botões de categoria e a busca são apenas visuais, sem nenhuma lógica de filtragem

---

### Etapa 1: Adicionar Estado e Lógica de Filtragem

Modificar `src/pages/Artigos.tsx` para incluir:
- Estado para categoria selecionada (`selectedCategory`)
- Estado para termo de busca (`searchTerm`)
- Lógica para filtrar artigos baseada nesses estados
- Handlers `onClick` nos botões de categoria
- Handler `onChange` no campo de busca

### Etapa 2: Criar Página de Artigo Individual

Criar novo arquivo `src/pages/ArtigoDetalhes.tsx` que:
- Recebe o ID do artigo via parâmetro de rota
- Busca os dados do artigo correspondente
- Exibe o conteúdo completo com título, data, categoria e texto
- Inclui link para voltar à lista de artigos
- Mostra artigos relacionados na mesma categoria

### Etapa 3: Configurar Rota

Adicionar em `src/App.tsx`:
- Rota dinâmica `/artigos/:id` apontando para `ArtigoDetalhes`

---

### Resumo das Alterações

| Arquivo | Alteração |
|---------|-----------|
| `src/pages/Artigos.tsx` | Adicionar estados e lógica de filtragem por categoria e busca |
| `src/pages/ArtigoDetalhes.tsx` | Criar página para exibir artigo individual |
| `src/App.tsx` | Adicionar rota `/artigos/:id` |

---

### Detalhes Técnicos

**Filtragem de Artigos:**
```text
┌─────────────────────────────────────────────────┐
│  Estado: selectedCategory, searchTerm           │
│                                                 │
│  Filtro aplicado:                              │
│  1. Se categoria != "Todos", filtra por ela    │
│  2. Se searchTerm != "", filtra por título     │
│     ou excerpt que contenha o termo            │
└─────────────────────────────────────────────────┘
```

**Página de Detalhes:**
- Usar `useParams()` do React Router para obter o ID
- Buscar artigo no array `articles` pelo ID
- Exibir conteúdo expandido (será estático por enquanto, podendo futuramente vir de banco de dados)
- Mostrar navegação "Voltar para artigos"
