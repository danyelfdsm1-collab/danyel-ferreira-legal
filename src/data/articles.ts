export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: 'Conheça seus direitos como consumidor em compras online',
    excerpt: 'Entenda as garantias legais e o que fazer quando algo dá errado em suas compras pela internet.',
    content: `As compras online se tornaram parte do cotidiano dos brasileiros, mas muitos consumidores ainda desconhecem seus direitos nesse ambiente digital.

O Código de Defesa do Consumidor (CDC) garante proteção integral nas compras realizadas fora do estabelecimento comercial, incluindo as feitas pela internet.

**Direito de Arrependimento**

Um dos direitos mais importantes é o de arrependimento, previsto no artigo 49 do CDC. Você tem até 7 dias corridos, contados a partir do recebimento do produto, para desistir da compra sem precisar justificar o motivo. Neste caso, o fornecedor deve devolver integralmente o valor pago, incluindo o frete.

**Prazo de Entrega**

O fornecedor é obrigado a informar o prazo de entrega e cumpri-lo. Se houver atraso, você pode:
- Exigir o cumprimento forçado da entrega
- Aceitar produto ou serviço equivalente
- Cancelar a compra com restituição integral do valor pago

**Produto com Defeito**

Para produtos com defeito, o CDC estabelece que o fornecedor tem 30 dias para resolver o problema. Caso não seja solucionado nesse prazo, você pode optar por:
- Substituição do produto
- Restituição do valor pago
- Abatimento proporcional do preço

**Como Reclamar**

Se seus direitos forem desrespeitados, você pode:
1. Entrar em contato com o SAC da empresa
2. Registrar reclamação no Procon
3. Utilizar a plataforma consumidor.gov.br
4. Buscar orientação jurídica especializada

Lembre-se: guardar todos os comprovantes de compra, conversas e e-mails é fundamental para garantir seus direitos.`,
    category: 'Direito do Consumidor',
    date: '2024-01-22',
    readTime: '5 min',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'INSS: Como funciona a aposentadoria por tempo de contribuição',
    excerpt: 'Tudo o que você precisa saber sobre regras de transição, cálculos e documentação necessária.',
    content: `A Reforma da Previdência de 2019 trouxe mudanças significativas nas regras de aposentadoria. Entender essas alterações é fundamental para planejar seu futuro.

**Regras de Transição**

Para quem já estava no mercado de trabalho antes da reforma, existem regras de transição que podem ser mais vantajosas:

1. **Sistema de Pontos**: Soma da idade com o tempo de contribuição deve atingir um mínimo, que aumenta a cada ano.

2. **Idade Mínima Progressiva**: A idade mínima aumenta gradualmente até atingir 62 anos para mulheres e 65 para homens.

3. **Pedágio de 50%**: Para quem estava a menos de 2 anos de se aposentar, é possível pagar um pedágio de 50% do tempo que faltava.

4. **Pedágio de 100%**: Permite aposentar com idade menor, desde que cumpra o dobro do tempo que faltava.

**Cálculo do Benefício**

O valor da aposentadoria é calculado com base em:
- Média de todos os salários de contribuição desde julho de 1994
- Aplicação de um coeficiente que varia conforme o tempo de contribuição

**Documentação Necessária**

Para dar entrada no pedido de aposentadoria, você precisa:
- Documento de identificação com foto
- CPF
- Carteira de Trabalho
- Carnês de contribuição (se autônomo)
- Certidões de nascimento dos filhos

**Dica Importante**

Antes de solicitar a aposentadoria, faça uma simulação no Meu INSS e, se possível, consulte um advogado previdenciário para verificar qual regra é mais vantajosa para seu caso.`,
    category: 'Direito Previdenciário',
    date: '2024-01-20',
    readTime: '8 min',
    image: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Pensão alimentícia: quem tem direito e como solicitar',
    excerpt: 'Saiba quais são os critérios legais e os passos para requerer ou revisar pensão alimentícia.',
    content: `A pensão alimentícia é um direito fundamental que visa garantir a subsistência de quem não pode prover seu próprio sustento. Veja como funciona.

**Quem Tem Direito**

A pensão alimentícia pode ser solicitada por:
- Filhos menores de idade
- Filhos maiores até 24 anos que estejam estudando
- Filhos com deficiência, independente da idade
- Ex-cônjuge ou ex-companheiro
- Pais idosos ou necessitados

**Como É Calculado o Valor**

O valor da pensão é definido com base no binômio:
- **Necessidade** de quem recebe
- **Possibilidade** de quem paga

Geralmente, para filhos, o valor varia entre 20% a 30% da renda do alimentante, mas não existe um percentual fixo na lei.

**Como Solicitar**

O pedido pode ser feito:
1. **Extrajudicialmente**: Acordo entre as partes, que pode ser homologado em cartório
2. **Judicialmente**: Através de ação de alimentos, com advogado ou Defensoria Pública

**Revisão de Pensão**

A pensão pode ser revisada sempre que houver:
- Alteração na situação financeira de quem paga
- Mudança nas necessidades de quem recebe
- Outros fatos relevantes

**Consequências do Não Pagamento**

O não pagamento da pensão pode resultar em:
- Prisão civil de 1 a 3 meses
- Penhora de bens
- Desconto direto em folha de pagamento
- Negativação do nome

Se você precisa de pensão alimentícia ou quer revisar valores, procure orientação jurídica especializada.`,
    category: 'Direito de Família',
    date: '2024-01-18',
    readTime: '6 min',
    image: '/placeholder.svg',
  },
  {
    id: 4,
    title: 'Rescisão trabalhista: entenda todas as verbas devidas',
    excerpt: 'Conheça seus direitos ao ser demitido e aprenda a conferir se recebeu tudo corretamente.',
    content: `Ao ser desligado de uma empresa, é fundamental conhecer todos os seus direitos para garantir que receberá as verbas rescisórias corretamente.

**Tipos de Demissão**

1. **Demissão Sem Justa Causa**
O empregador decide encerrar o contrato sem motivo grave. Neste caso, você tem direito a:
- Saldo de salário
- Aviso prévio (trabalhado ou indenizado)
- 13º salário proporcional
- Férias vencidas + 1/3
- Férias proporcionais + 1/3
- Multa de 40% sobre o FGTS
- Saque do FGTS
- Seguro-desemprego

2. **Pedido de Demissão**
Quando você decide sair, tem direito a:
- Saldo de salário
- 13º salário proporcional
- Férias vencidas + 1/3
- Férias proporcionais + 1/3

3. **Demissão por Justa Causa**
Aplicada em casos de falta grave, você recebe apenas:
- Saldo de salário
- Férias vencidas + 1/3

**Prazos**

O empregador tem até 10 dias corridos após o término do contrato para pagar as verbas rescisórias e entregar os documentos necessários.

**O Que Conferir**

- Valores calculados corretamente
- TRCT (Termo de Rescisão do Contrato de Trabalho)
- Chave de acesso ao FGTS
- Guias do seguro-desemprego (se aplicável)

Se identificar irregularidades, procure orientação jurídica imediatamente.`,
    category: 'Direito do Trabalho',
    date: '2024-01-15',
    readTime: '7 min',
    image: '/placeholder.svg',
  },
  {
    id: 5,
    title: 'O que fazer se você for vítima de um crime: passo a passo',
    excerpt: 'Orientações importantes sobre como agir e quais órgãos procurar em situações de crime.',
    content: `Ser vítima de um crime é uma situação difícil, mas saber como agir pode fazer toda a diferença para garantir seus direitos e a responsabilização do autor.

**Primeiros Passos**

1. **Garanta sua segurança**: Afaste-se do local de perigo se ainda estiver em risco
2. **Procure ajuda**: Ligue para o 190 (Polícia Militar) em caso de emergência
3. **Preserve as provas**: Não altere a cena do crime, guarde objetos e mensagens

**Registro do Boletim de Ocorrência**

O B.O. é fundamental para:
- Documentar oficialmente o crime
- Iniciar as investigações
- Garantir seus direitos a indenização
- Solicitar medidas protetivas

Você pode registrar:
- Na delegacia de polícia
- Online, para alguns tipos de crimes
- Em delegacias especializadas (mulher, idoso, etc.)

**Direitos da Vítima**

A lei garante que você tem direito a:
- Atendimento digno e respeitoso
- Acompanhar o processo criminal
- Ser informado sobre o andamento
- Proteção e medidas protetivas quando necessário
- Indenização pelos danos sofridos

**Órgãos de Apoio**

- **DEAM**: Delegacia da Mulher
- **CREAS**: Centro de Referência Especializado de Assistência Social
- **Defensoria Pública**: Para assistência jurídica gratuita
- **Ministério Público**: Para representar interesses da sociedade

Não tenha receio de buscar seus direitos. A denúncia é importante para sua proteção e para evitar que outras pessoas passem pela mesma situação.`,
    category: 'Direito Penal',
    date: '2024-01-12',
    readTime: '6 min',
    image: '/placeholder.svg',
  },
  {
    id: 6,
    title: 'Contratos de aluguel: cláusulas essenciais e cuidados',
    excerpt: 'Aprenda a identificar os principais pontos de atenção antes de assinar um contrato de locação.',
    content: `Antes de assinar um contrato de aluguel, é essencial conhecer os principais pontos que devem ser observados para evitar problemas futuros.

**Elementos Obrigatórios**

Todo contrato de locação deve conter:
- Identificação completa das partes
- Descrição detalhada do imóvel
- Valor do aluguel e forma de pagamento
- Índice de reajuste anual
- Prazo de locação
- Garantias exigidas

**Tipos de Garantia**

A Lei do Inquilinato permite apenas UMA garantia:
- **Fiador**: Pessoa que se responsabiliza pelo pagamento
- **Caução**: Depósito de até 3 meses de aluguel
- **Seguro-fiança**: Contratado junto a seguradora
- **Título de capitalização**: Investimento que serve como garantia

**Cláusulas de Atenção**

Fique atento a:
- Multa por rescisão antecipada (proporcional ao tempo restante)
- Responsabilidade por reparos (ordinários x estruturais)
- Condições para devolução da caução
- Prazo para vistoria de entrada e saída
- Regras do condomínio

**Direitos do Inquilino**

- Receber recibos de pagamento
- Preferência em caso de venda do imóvel
- Renovação do contrato comercial (se cumpridos os requisitos)
- Receber o imóvel em condições de uso

**Direitos do Locador**

- Receber o aluguel em dia
- Reaver o imóvel ao fim do contrato
- Exigir reparos por danos causados pelo inquilino
- Retomar o imóvel para uso próprio (com requisitos legais)

Sempre leia todo o contrato antes de assinar e, em caso de dúvida, consulte um advogado.`,
    category: 'Direito Civil',
    date: '2024-01-10',
    readTime: '5 min',
    image: '/placeholder.svg',
  },
];

export const categories = [
  'Todos',
  'Direito do Consumidor',
  'Direito Previdenciário',
  'Direito de Família',
  'Direito do Trabalho',
  'Direito Penal',
  'Direito Civil',
];
