

# Plano: Sistema de Administrador Completo

## Visão Geral

Implementaremos um sistema de administração seguro seguindo as melhores práticas de segurança, com tabela de roles separada, painel administrativo dedicado e controle de acesso robusto.

## O que será implementado

### Funcionalidades do Admin

1. **Painel Administrativo** - Página dedicada para gestão do sistema
2. **Gestão de Artigos** - Criar, editar, despublicar artigos jurídicos
3. **Gestão de Consultas** - Visualizar e gerenciar todos os agendamentos
4. **Gestão de Usuários** - Ver lista de usuários cadastrados

### Segurança

- Roles armazenados em tabela separada (não no perfil)
- Função SECURITY DEFINER para verificação de roles
- Políticas RLS específicas para admins
- Validação server-side em todas as operações

---

## Etapas de Implementação

### 1. Estrutura do Banco de Dados

Criaremos a seguinte estrutura:

- **Enum `app_role`**: Define os tipos de roles (`admin`, `moderator`, `user`)
- **Tabela `user_roles`**: Relaciona usuários com seus roles
- **Função `has_role`**: Verifica se usuário possui determinado role (SECURITY DEFINER)
- **Políticas RLS**: Permissões específicas para admins

**Novas políticas para a tabela `articles`:**
- Admins podem INSERT, UPDATE e DELETE artigos
- Admins podem ver todos os artigos (inclusive não publicados)

**Novas políticas para a tabela `appointments`:**
- Admins podem visualizar todas as consultas
- Admins podem atualizar status de consultas

### 2. Hook de Autenticação Admin

**Novo arquivo:** `src/hooks/useAdmin.ts`

- Verificação se usuário logado é admin
- Cache do estado de admin
- Função para buscar role do banco de dados

### 3. Componentes do Painel Admin

**Novos arquivos:**

- `src/pages/Admin.tsx` - Página principal do painel
- `src/components/admin/AdminLayout.tsx` - Layout com sidebar
- `src/components/admin/AdminArticles.tsx` - Gestão de artigos
- `src/components/admin/AdminAppointments.tsx` - Gestão de consultas
- `src/components/admin/AdminUsers.tsx` - Listagem de usuários
- `src/components/admin/AdminDashboard.tsx` - Dashboard com estatísticas

### 4. Formulário de Artigos

**Funcionalidades:**
- Criar novo artigo com título, conteúdo, categoria
- Editar artigos existentes
- Publicar/despublicar artigos
- Deletar artigos (soft delete opcional)

### 5. Navegação e Acesso

**Modificações em arquivos existentes:**

- `src/App.tsx`: Adicionar rotas `/admin/*`
- `src/components/layout/Header.tsx`: Link para admin (visível apenas para admins)
- `src/integrations/supabase/types.ts`: Atualização automática com novos tipos

### 6. Componente de Proteção de Rota

**Novo arquivo:** `src/components/admin/AdminGuard.tsx`

- Redireciona usuários não-admin para home
- Exibe loading durante verificação
- Mensagem de acesso negado se necessário

---

## Arquitetura de Segurança

```text
+-------------------+
|     Frontend      |
+-------------------+
         |
         v
+-------------------+
|  useAdmin Hook    |  <-- Verifica role via RLS
+-------------------+
         |
         v
+-------------------+
|  AdminGuard       |  <-- Protege rotas /admin/*
+-------------------+
         |
         v
+-------------------+
|   Supabase RLS    |  <-- Políticas verificam has_role()
+-------------------+
         |
         v
+-------------------+
|  has_role()       |  <-- SECURITY DEFINER function
+-------------------+
         |
         v
+-------------------+
|  user_roles       |  <-- Tabela de roles
+-------------------+
```

---

## Detalhes Técnicos

### Migração SQL

```sql
-- 1. Criar enum para roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Criar tabela de roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 3. Habilitar RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Políticas para user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- 5. Função SECURITY DEFINER para verificar role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 6. Políticas admin para articles
CREATE POLICY "Admins can manage all articles"
ON public.articles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- 7. Políticas admin para appointments
CREATE POLICY "Admins can view all appointments"
ON public.appointments FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all appointments"
ON public.appointments FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- 8. Política admin para profiles (visualizar todos)
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));
```

### Hook useAdmin

```typescript
// Verifica role no banco via Supabase
const checkAdminStatus = async () => {
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .maybeSingle();
  
  setIsAdmin(!!data);
};
```

---

## Como Atribuir Admin

Após a implementação, você precisará atribuir o role de admin a um usuário existente. Isso será feito inserindo um registro na tabela `user_roles`:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('ID_DO_USUARIO', 'admin');
```

Posso ajudar a identificar o ID correto do usuário que deve ser admin.

---

## Resumo dos Arquivos

| Arquivo | Ação |
|---------|------|
| `supabase/migrations/[timestamp].sql` | Criar |
| `src/hooks/useAdmin.ts` | Criar |
| `src/pages/Admin.tsx` | Criar |
| `src/components/admin/AdminLayout.tsx` | Criar |
| `src/components/admin/AdminGuard.tsx` | Criar |
| `src/components/admin/AdminDashboard.tsx` | Criar |
| `src/components/admin/AdminArticles.tsx` | Criar |
| `src/components/admin/AdminAppointments.tsx` | Criar |
| `src/components/admin/AdminUsers.tsx` | Criar |
| `src/App.tsx` | Modificar |
| `src/components/layout/Header.tsx` | Modificar |

