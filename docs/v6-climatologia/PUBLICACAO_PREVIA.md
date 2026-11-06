# Publicação da prévia de Climatologia

Em 06/11/2026, o responsável autorizou: “Publique”, após a entrega da candidata 0.1.0 no PR #22. Essa autorização permite a incorporação desse lote à main e sua publicação. Não representa aprovação científica integral nem altera o status EM_AUDITORIA.

O conteúdo disponível neste lote é uma prévia de leitura. Para torná-la acessível sem promover antecipadamente a candidata, a mesma página é gerada em `public/previas/climatologia.html`, com aviso de revisão, descrição de que não salva respostas/progresso e link de volta à plataforma. Nenhum banco operacional ou manifesto canônico é alterado.

Endereço previsto após deploy:
https://ude-ctrl.github.io/Estudo-para-Concurso/previas/climatologia.html

Reprodução:

```sh
node scripts/preview-climatologia.mjs --public
node scripts/preview-climatologia.mjs --public --check
CLIMA_PREVIEW_FILE=public/previas/climatologia.html node tests/climatologia-candidate.browser.mjs
```

A igualdade entre a página pública e o conteúdo da candidata faz parte dos testes. O workflow de publicação passa a conferir também o hash dessa página no endereço público, além dos seis arquivos anteriormente verificados. A integração ao motor V6 e a promoção editorial permanecem pendentes conforme o relatório da candidata.

Este registro documenta o escopo autorizado; a conclusão do deploy deve ser confirmada pela execução do GitHub Actions e pela leitura do endereço público.
