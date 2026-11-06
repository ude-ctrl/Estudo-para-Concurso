// Dados autorais hipotéticos: não representam estações nem anos observados.
export const datasets = [
  {
    id: 'v6-clima-visual-a',
    name: 'Localidade hipotética A',
    temperature: [26, 26.1, 26.3, 26.5, 26.8, 27, 27.2, 27.4, 27.3, 27.1, 26.8, 26.4],
    precipitation: [280, 300, 350, 320, 260, 180, 150, 120, 130, 160, 190, 240],
  },
  {
    id: 'v6-clima-visual-b',
    name: 'Localidade hipotética B',
    temperature: [27, 27, 26.5, 25.5, 24, 22.5, 23, 25, 27, 28, 27.5, 27],
    precipitation: [280, 250, 230, 140, 60, 20, 10, 20, 70, 140, 210, 270],
  },
];
export const months = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];
export const metrics = (d) => ({
  amplitude: Math.round((Math.max(...d.temperature) - Math.min(...d.temperature)) * 10) / 10,
  precipitation: d.precipitation.reduce((a, b) => a + b, 0),
  months_below_60mm: d.precipitation.filter((p) => p < 60).length,
});
const number = (n) => String(n).replace('.', ',');
export function visual(d) {
  const x = (i) => 68 + i * 38;
  const yp = (p) => 290 - p * 0.55;
  const yt = (t) => 290 - t * 5.5;
  const caption = `${d.name} — dados hipotéticos autorais; janeiro a dezembro de um ciclo anual didático, sem período observado ou localização geográfica.`;
  const description =
    'Barras de precipitação mensal, eixo esquerdo de 0 a 400 mm. Linha com pontos de temperatura média mensal, eixo direito de 0 a 40 °C. Escalas independentes; cruzamentos não definem déficit hídrico. A tabela seguinte contém todos os valores.';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 350" role="img" aria-labelledby="${d.id}-title ${d.id}-desc" style="display:block;width:100%;height:auto;background:#fff;color:#182b36"><title id="${d.id}-title">${d.name}: climograma</title><desc id="${d.id}-desc">${description}</desc><text x="18" y="30" font-size="15" fill="#182b36">Precipitação (mm)</text><text x="390" y="30" font-size="15" fill="#182b36">Temperatura (°C)</text>${[0, 100, 200, 300, 400].map((p) => `<line x1="48" x2="506" y1="${yp(p)}" y2="${yp(p)}" stroke="#b6c4cc"/><text x="40" y="${yp(p) + 5}" text-anchor="end" fill="#182b36" font-size="14">${p}</text><text x="514" y="${yp(p) + 5}" fill="#182b36" font-size="14">${p / 10}</text>`).join('')}${d.precipitation.map((p, i) => `<rect data-month="${i}" x="${x(i) - 12}" y="${yp(p)}" width="24" height="${p * 0.55}" fill="#176585"/>`).join('')}<polyline points="${d.temperature.map((t, i) => `${x(i)},${yt(t)}`).join(' ')}" fill="none" stroke="#a52b19" stroke-width="3"/>${d.temperature.map((t, i) => `<circle cx="${x(i)}" cy="${yt(t)}" r="4" fill="#a52b19"/>`).join('')}${months.map((m, i) => `<text x="${x(i)}" y="315" text-anchor="middle" fill="#182b36" font-size="13">${m}</text>`).join('')}<text x="55" y="340" fill="#182b36" font-size="13">Barras: chuva · Linha com pontos: temperatura</text></svg>`;
  const rows = months.map((m, i) => [m, d.temperature[i], d.precipitation[i]]);
  const table = `<table><caption>${d.name}: valores mensais hipotéticos</caption><thead><tr><th scope="col">Mês</th><th scope="col">Temperatura média (°C)</th><th scope="col">Precipitação (mm)</th></tr></thead><tbody>${rows.map(([m, t, p]) => `<tr><th scope="row">${m}</th><td>${number(t)}</td><td>${p}</td></tr>`).join('')}</tbody></table>`;
  return {
    id: d.id,
    kind: 'climogram',
    caption,
    heads: ['Mês', 'Temperatura média (°C)', 'Precipitação (mm)'],
    rows,
    svg,
    transcript: description,
    source_kind: 'authored-hypothetical',
    source_id: 'clima-dados-autorais',
    measurement_note:
      'Série didática de 12 valores mensais; não é uma normal climatológica nem uma previsão. Escalas gráficas independentes, sem critério ombrotérmico.',
    data: d,
    metrics: metrics(d),
    html: `<figure id="${d.id}">${svg}<figcaption>${caption}</figcaption></figure><p>${description}</p>${table}`,
  };
}

export const newQuestions = [
  {
    suffix: 'climograma-amplitude',
    visual: 'v6-clima-visual-a',
    difficulty: 2,
    cognitive: 2,
    prompt:
      'Na localidade hipotética A, qual é a amplitude térmica anual, calculada pelas médias mensais da tabela?',
    options: ['1,4 °C', '53,4 °C', '27,4 °C', '26,0 °C', '14,0 °C'],
    correct: 0,
    explanation:
      'O maior valor mensal é 27,4 °C, em agosto; o menor é 26,0 °C, em janeiro. A amplitude é 27,4 − 26,0 = 1,4 °C. Não é a diferença entre extremos diários.',
    feedback: [
      'A diferença entre máximo e mínimo mensais é 1,4 °C.',
      '53,4 soma os extremos; amplitude exige subtração.',
      '27,4 é a maior média mensal, não sua diferença para a menor.',
      '26,0 é a menor média mensal.',
      '14,0 resulta de deslocar indevidamente a vírgula.',
    ],
  },
  {
    suffix: 'climograma-estacao',
    visual: 'v6-clima-visual-b',
    difficulty: 2,
    cognitive: 3,
    prompt:
      'Para este exercício, marque meses relativamente pouco chuvosos quando P < 60 mm. Esse limiar didático não define sozinho tipo climático nem seca agrícola. Na localidade B, quantos meses atendem ao critério e quais são eles?',
    options: [
      'Quatro: maio a agosto.',
      'Dois: junho e julho.',
      'Três: junho, julho e agosto.',
      'Cinco: maio a setembro.',
      'Nenhum, porque há chuva em todos os meses.',
    ],
    correct: 2,
    explanation:
      'Junho (20 mm), julho (10 mm) e agosto (20 mm) ficam abaixo de 60 mm. Maio tem exatamente 60 mm e não entra em P < 60. Identificar baixa precipitação não basta para calcular balanço hídrico.',
    feedback: [
      'Maio tem 60 mm e o critério exige valor estritamente menor.',
      'Agosto também tem 20 mm e atende ao critério.',
      'São os três meses consecutivos com 20, 10 e 20 mm.',
      'Maio tem 60 mm e setembro 70 mm; ambos ficam fora.',
      'Baixa precipitação relativa não exige ausência absoluta de chuva.',
    ],
  },
  {
    suffix: 'climograma-inferencia',
    visual: 'v6-clima-visual-a',
    difficulty: 3,
    cognitive: 3,
    prompt:
      'Uma pessoa afirma que a localidade A só pode ser Belém e que seus números provam a atuação da ZCIT em cada mês. Qual avaliação é sustentada pelo material?',
    options: [
      'A afirmação é certa porque toda localidade quente e úmida é Belém.',
      'O total anual identifica sozinho a latitude.',
      'A linha acima das barras comprova ausência de déficit hídrico.',
      'Agosto mais quente demonstra que a cidade está no Hemisfério Norte.',
      'O padrão é quente e chuvoso, mas os dados hipotéticos não identificam cidade nem comprovam o mecanismo de cada chuva.',
    ],
    correct: 4,
    explanation:
      'Descrição não é identificação nem atribuição causal. A tabela foi criada para exercício, sem estação real. Investigar ZCIT exigiria localização, período e informações de circulação; investigar déficit hídrico exigiria outras variáveis.',
    feedback: [
      'Locais distintos podem ter regimes semelhantes.',
      'O total não determina latitude, relevo ou posição oceânica.',
      'As escalas são independentes; cruzar barras e linha não é um balanço hídrico.',
      'Um máximo isolado, sobretudo com baixa amplitude, não prova hemisfério.',
      'A conclusão distingue o que os dados descrevem do que não permitem afirmar.',
    ],
  },
  {
    suffix: 'climograma-comparacao',
    visual: 'v6-clima-visual-b',
    difficulty: 3,
    cognitive: 3,
    prompt:
      'A soma das precipitações mensais de B é 1.700 mm. Uma terceira localidade hipotética C tem também 1.700 mm anuais, distribuídos por igual entre os 12 meses. Qual conclusão é válida?',
    options: [
      'O regime mensal é idêntico, pois o total é igual.',
      'Os totais são iguais, mas B concentra a chuva de modo desigual e C tem aproximadamente 141,7 mm por mês.',
      'C necessariamente tem clima polar.',
      'B necessariamente tem maior evapotranspiração anual.',
      'A igualdade dos totais prova ausência de risco de seca nas duas localidades.',
    ],
    correct: 1,
    explanation:
      'Em C, 1.700 ÷ 12 ≈ 141,7 mm mensais. Em B, julho tem 10 mm e janeiro 280 mm: o total anual oculta essa sazonalidade. Temperatura, demanda evaporativa e armazenamento de água não são determinados apenas pelo total de chuva.',
    feedback: [
      'Uma soma igual não implica parcelas mensais iguais.',
      'O cálculo e a comparação mostram por que média e distribuição precisam ser examinadas juntas.',
      'Sem dados térmicos não se atribui clima polar.',
      'Evapotranspiração depende também de energia, umidade, vento e superfície.',
      'Totais anuais não eliminam períodos secos nem informam disponibilidade efetiva de água.',
    ],
  },
];
