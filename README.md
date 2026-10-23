# Duelo de Campanhas

Compare duas versões de uma campanha no Instagram feed a partir de um briefing e de resultados fictícios. Escolha o objetivo e veja CTR, conversão e custo por contato, com fórmulas, vencedor e limitações dos dados. A IA ajuda a criar os textos e explicar o resultado; os cálculos são feitos em código. O produto não publica anúncios.

- **Aplicação:** [duelo-de-campanhas.vercel.app](https://duelo-de-campanhas.vercel.app)
- **Repositório:** [jubittencourt/Openai-Hackathon](https://github.com/jubittencourt/Openai-Hackathon)

## Como rodar

Com Node.js e npm instalados, abra a pasta do projeto e instale as dependências:

```bash
npm install
```

Crie `.env.local` na raiz, usando `.env.example` como referência:

```env
OPENAI_API_KEY=sua-chave
OPENAI_MODEL=gpt-6.1-sol
```

A chave é usada somente no servidor. Não versione `.env.local`. Sem `OPENAI_API_KEY`, as rotas usam o conteúdo de exemplo para permitir a demonstração.

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Para executar os testes de métricas:

```bash
npm test
```

## Demonstração

Use o briefing e os resultados de exemplo. No objetivo CTR, A vence com 3,0% contra 2,0%. Ao trocar para custo por contato, B tem o melhor valor: R$ 25,00 contra R$ 40,00. O selo continua sendo **Empate técnico** nesse indicador; a amostra pequena não permite cravar a vitória.

O roteiro de gravação está em [docs/roteiro-video.md](docs/roteiro-video.md). Os critérios de aceite estão em [REQUISITOS.md](REQUISITOS.md), e o andamento é acompanhado em [STATUS.md](STATUS.md).

## Equipe

Feito pela equipe **Claudio-maestro, Julia, Brenno, Andrey e Felipe** para o Desafio 17 do DevDay Community Hackathon SP.
