# Revisão dos botões — 12/11/2026

## Decisão

Manter a apresentação da oferta como destino dos primeiros botões ajuda quem ainda está conhecendo o produto a conferir preço e conteúdo. Depois da demonstração do material, no encerramento e na barra do celular, o visitante tem uma opção direta de compra.

Esta é uma decisão de navegação para o projeto; não é uma promessa de aumento de conversão. O efeito comercial deve ser medido em campanha.

| Posição / botão | Destino final |
| --- | --- |
| Cabeçalho — Ver oferta | Bloco #oferta |
| Abertura — Quero criar meus enfeites | Bloco #oferta |
| Galeria — Quero fazer os meus | Bloco #oferta |
| Iniciantes — Quero começar do primeiro ponto | Bloco #oferta |
| Prévia — Quero o guia e os moldes | Checkout configurado |
| Oferta — Quero meu Natal em Feltro | Checkout configurado |
| Encerramento — Quero começar a criar | Checkout configurado |
| Barra do celular — Quero meu kit | Checkout configurado |

O texto da barra do celular mudou de Ver oferta para Quero meu kit para corresponder ao novo destino. A coerência entre rótulo e destino segue o princípio descrito pelo Nielsen Norman Group: https://www.nngroup.com/articles/link-promise/

## Correção de consistência

O HTML apontava a oferta lg3OL8, enquanto o checkout.js apontava yyEtYQ com parâmetros adicionais. Como app.js utiliza a configuração de checkout.js, esse já era o endereço efetivo para visitantes com JavaScript. Os quatro href foram alinhados ao endereço efetivo, preservando os sete parâmetros existentes.

## Validação realizada

Oito cenários automatizados passaram, executando os scripts reais em um ambiente de teste com elementos obtidos do HTML. Rede e geometria da tela foram simuladas; nenhum evento de teste foi enviado à Meta ou ao checkout.

1. Quatro botões de compra recebem o checkout configurado.
2. Os primeiros botões continuam apontando para #oferta e não disparam InitiateCheckout.
3. Cada clique de compra dispara um evento de navegador e um de CAPI, com o mesmo identificador.
4. Os href originais do HTML usam o mesmo destino e preservam os parâmetros.
5. Configuração vazia ou inválida abre o diálogo existente em todos os botões de compra.
6. A ausência da função do Meta Pixel não bloqueia o link nem o evento CAPI.
7. A barra do celular preserva suas condições de exibição e ocultação.
8. ViewContent permanece limitado a um disparo, com identificador comum entre navegador e CAPI.

Também foram conferidos 48 caminhos de recursos locais, 61 referências de âncoras/ícones, unicidade de IDs e sintaxe dos três arquivos JavaScript.

Comparação de conteúdo confirmou que styles.css, todos os assets, app.js e api/capi.js permanecem idênticos aos originais. As classes de estilo dos links também foram preservadas. Nos arquivos de execução, apenas index.html mudou; checkout.js recebeu somente comentários explicativos, sem mudar a configuração.

Limite: o ambiente bloqueou a inicialização do Chromium. Não houve inspeção visual em navegador nem confirmação de recebimento de eventos pela Meta ou pela hospedagem de produção.

## Ponto de atenção encontrado no projeto original

api/capi.js contém uma chave de acesso da Meta escrita diretamente no código como alternativa à variável META_ACCESS_TOKEN. Seu valor não é reproduzido neste relatório. O arquivo foi preservado para não interromper a integração existente durante uma revisão dos botões.

Recomendação: renovar essa chave, cadastrar a nova em META_ACCESS_TOKEN na hospedagem e então remover o valor fixo do código. Mantenha este pacote privado, pois ele preserva o arquivo original do servidor. Não coloque uma chave de acesso em JavaScript servido ao navegador.
