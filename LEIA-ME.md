# Natal em Feltro

Landing page estática, responsiva e sem dependências externas.

## Adicionar o checkout

Edite `dist/checkout.js` e substitua o valor vazio de `checkoutUrl` pelo endereço completo do checkout, começando com `https://`.

O botão de compra do bloco `#oferta` usa esse endereço. Os CTAs dos blocos anteriores e a barra inferior no celular levam para `#oferta`. Enquanto o endereço estiver vazio, a página informa que as compras ainda não estão disponíveis; nenhuma compra é simulada.

## Conteúdo

- Preço informado no briefing: R$ 29,90, pagamento único.
- 25 projetos-base, sugestões de variações, moldes A4 e 5 bônus conforme o escopo do produto enviado pelo usuário.
- A galeria usa as 25 imagens dos projetos extraídas do ebook; a capa é a página original. As próprias imagens do ebook são representações digitais, como indicado no material.
- A seção Por dentro mostra 6 páginas extraídas dos PDFs finais: 2 tutoriais, 1 página de técnicas e 3 páginas de moldes. O ebook tem 60 páginas; o PDF separado de moldes tem 25 folhas A4.
- Apenas imagens de prévia são distribuídas pelo site. Os PDFs completos do produto não estão publicados.
- As prévias não servem como arquivos para impressão em escala: o comprador deve utilizar os PDFs em tamanho real (100%).
- A origem de cada imagem e prévia está registrada em asset-provenance.json.
- Não foram adicionados depoimentos, números de clientes, descontos anteriores, escassez, promessa de renda ou garantia não informados.

## Hospedagem

Publique o conteúdo de `dist/` em qualquer hospedagem de arquivos estáticos. `index.html`, `styles.css`, `checkout.js`, `app.js` e `assets/` devem ficar juntos.

A publicação pelo Sites utiliza `.openai/hosting.json`. O site foi criado com acesso privado para revisão pelo proprietário. Os metadados canônicos e Open Graph devem ser atualizados se o site for movido para um domínio diferente.
