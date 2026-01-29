
# Plano: Corrigir Erro de Recuperação de Senha

## Problema Identificado

Quando o usuário clica no link de recuperação de senha, a página `/redefinir-senha` mostra a mensagem "Link inválido ou expirado" (tela escura com acesso negado). Isso ocorre devido a uma **race condition** na detecção da sessão de recuperação.

### Causa Raiz

1. **Race condition**: O `checkSession()` verifica a sessão imediatamente, mas o evento `PASSWORD_RECOVERY` ainda não foi disparado
2. **Timing do onAuthStateChange**: A verificação inicial `getSession()` pode retornar `null` porque a sessão de recuperação ainda está sendo estabelecida
3. **Hash na URL**: Quando o usuário clica no link de e-mail, os tokens vêm como fragmento de hash na URL (`#access_token=...&type=recovery`). O Supabase precisa processar esse hash antes da sessão estar disponível

## Solução

Modificar `src/pages/RedefinirSenha.tsx` para:

1. **Aguardar o processamento do hash da URL**: Detectar tokens na URL e aguardar o Supabase processá-los
2. **Priorizar o evento `PASSWORD_RECOVERY`**: Configurar o listener ANTES de verificar a sessão existente
3. **Adicionar timeout de segurança**: Dar tempo suficiente para o evento ser processado antes de invalidar

### Mudanças Técnicas

**Arquivo**: `src/pages/RedefinirSenha.tsx`

```typescript
useEffect(() => {
  // Configurar listener PRIMEIRO - CRÍTICO para capturar PASSWORD_RECOVERY
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      console.log('Auth event:', event); // Para debug
      
      if (event === 'PASSWORD_RECOVERY') {
        setIsValidSession(true);
      } else if (event === 'SIGNED_IN' && session) {
        // Também aceita SIGNED_IN após recovery
        setIsValidSession(true);
      }
    }
  );

  // Verificar se há tokens na URL (fragmento hash)
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const hasRecoveryToken = hashParams.get('type') === 'recovery' || 
                           hashParams.get('access_token');

  // Se há tokens na URL, aguardar processamento
  if (hasRecoveryToken) {
    // Dar tempo para o Supabase processar os tokens
    const timeout = setTimeout(() => {
      // Se após 3 segundos ainda não validou, verificar sessão manual
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session && isValidSession === null) {
          setIsValidSession(true);
        } else if (isValidSession === null) {
          setIsValidSession(false);
        }
      });
    }, 3000);

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }

  // Sem tokens na URL, verificar sessão existente
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsValidSession(true);
    } else {
      // Aguardar um pouco antes de invalidar
      setTimeout(() => {
        if (isValidSession === null) {
          setIsValidSession(false);
        }
      }, 2000);
    }
  };

  checkSession();

  return () => subscription.unsubscribe();
}, []);
```

## Arquivos a Modificar

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/pages/RedefinirSenha.tsx` | Modificar | Corrigir lógica de detecção de sessão de recuperação |

## Resultado Esperado

1. Usuário solicita recuperação em `/recuperar-senha`
2. Recebe e-mail com link
3. Clica no link e é redirecionado para `/redefinir-senha#access_token=...`
4. A página detecta os tokens e aguarda o processamento
5. O evento `PASSWORD_RECOVERY` é capturado corretamente
6. Formulário de nova senha é exibido
7. Usuário define nova senha com sucesso
