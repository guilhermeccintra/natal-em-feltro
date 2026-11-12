# Natal em Feltro — projeto revisado

## Abrir ou publicar

Extraia o ZIP inteiro. Para visualizar a página, abra `index.html` mantendo `styles.css`, `checkout.js`, `app.js` e a pasta `assets` juntos.

Para atualizar o site existente, envie os arquivos do projeto à sua hospedagem pelo seu processo habitual. A integração de servidor em `api/capi.js` depende de um ambiente compatível, como a Vercel. Abrir o HTML localmente ou usar apenas hospedagem estática não executa essa função.

A pasta `.vercel` foi preservada. O histórico `.git` não acompanha este pacote de entrega. Nenhuma publicação foi feita durante esta revisão.

## Destinos dos botões

O endereço efetivo permanece definido em `checkout.js`, com todos os parâmetros que já estavam no arquivo enviado.

Quatro botões levam diretamente ao checkout:
- Quero o guia e os moldes, após a prévia do conteúdo;
- Quero meu Natal em Feltro, no bloco de oferta;
- Quero começar a criar, no encerramento;
- Quero meu kit, na barra fixa do celular.

Os botões iniciais e o link Ver oferta continuam direcionando para `#oferta`. Os links de navegação continuam em suas seções originais.

Os quatro botões de compra possuem `data-checkout`, aproveitando o comportamento e o rastreamento existentes em `app.js`. Seus `href` também correspondem ao endereço configurado, para funcionar sem JavaScript. Ao trocar o checkout no futuro, atualize `checkout.js` e os quatro `href` no HTML.

## O que foi preservado

CSS, imagens, ícones, preços, conteúdo comercial, `app.js`, `api/capi.js`, galeria, perguntas frequentes e configuração da hospedagem. Não foi adicionada a classe de largura total da oferta aos outros botões.

Consulte `REVISAO_BOTOES.md` para o relatório de validação e um ponto de atenção sobre a chave da Meta.
