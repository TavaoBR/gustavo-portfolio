# 05. Especificação do Lab Interativo & Design Engineering Playground

## 1. Conceito e Propósito
O **Lab Interativo** é o laboratório vivo do portfólio. Ele serve como prova irrefutável de que Gustavo domina tanto o rigor do backend quanto a física de ponta do frontend. Em vez de apenas ler que o desenvolvedor constrói interfaces com padrão Apple, o visitante **toca, manipula e sente** a resposta dos componentes em tempo real.

---

## 2. Módulos do Playground

### Módulo 1: Simulador de Física de Molas (Apple WWDC Fluid Motion)
Inspirado na palestra *Designing Fluid Interfaces* da Apple:
* **Interface:**
  * Um card interativo arrastável (Direct Manipulation com `PointerEvents` e `setPointerCapture`).
  * 3 controles deslizantes (Sliders) calibrados:
    * **Stiffness (Rigidez):** de `100` a `800` (Padrão: `400`)
    * **Damping (Amortecimento):** de `10` a `60` (Padrão: `28`)
    * **Mass (Massa):** de `0.5` a `3.0` (Padrão: `1.0`)
* **Comportamento Físico:**
  * O card segue o ponteiro com proporção 1:1 exata (sem centralizar no dedo).
  * Ao soltar (Pointer Up), o componente herda a **velocidade de lançamento do usuário** (*gesture velocity handoff*) e oscila suavemente até o repouso.
  * O usuário pode agarrar o card no meio da oscilação (*interruptible animation*) sem saltos ou travamentos.
* **Saída de Código em Tempo Real:**
  * Um bloco de código compacto exibe os parâmetros calculados (ex: `spring(stiffness: 400, damping: 28, mass: 1)`), prontos para cópia com um clique.

---

### Módulo 2: Spotlight Sheen Inspector (Dribbble Pure Monochrome)
Demonstração visual do algoritmo de reflexo dinâmico:
* **Interface:**
  * Um painel de cards com grid Obsidian (`#050505`).
  * Controles de alternância de intensidade do brilho:
    * *Subtle (6% opacidade)*
    * *Crisp (12% opacidade)*
    * *Prismatic Silver (Gradiente de prata monocromático)*
* **Lógica Técnica:**
  * Coordenadas `(clientX, clientY)` são capturadas via `requestAnimationFrame` para evitar recalcular estilos fora do ciclo de renderização.
  * O brilho é renderizado via variável CSS `--mouse-x` e `--mouse-y` em um pseudo-elemento com aceleração de hardware.

---

### Módulo 3: Visualizador de Fluxo Transacional (del.tech PIX Simulator)
Une design engineering com experiência em sistemas financeiros:
* **Interface:**
  * Um fluxo interativo em miniatura simulando uma transação PIX ponta a ponta:
    1. *Payload Webhook Recebido*
    2. *Verificação de Idempotência no Redis*
    3. *Validação de Assinatura & DTOs*
    4. *Persistência Atômica no PostgreSQL*
    5. *Confirmação de Liquidação 200 OK*
* **Interatividade:**
  * O visitante clica em *"Disparar Webhook Simultâneo (Simular Concorrência)"* e observa os nós gráficos se iluminarem em sequência, com exibição de logs no formato JSON limpo.

---

### Módulo 4: Command Palette Global (`Cmd+K` / `Ctrl+K`)
* **Ativação:**
  * Teclas de atalho `Cmd+K` (macOS) ou `Ctrl+K` (Windows/Linux), ou clique no botão de busca da navbar.
* **Recursos:**
  * Busca difusa (Fuzzy search) por projetos, competências técnicas e seções.
  * Ações instantâneas:
    * `> Baixar Currículo em PDF`
    * `> Alternar Idioma (EN / PT)`
    * `> Copiar E-mail (jamesgustavo14@gmail.com)`
    * `> Ir para Caso: del.tech PIX (+1M)`
    * `> Abrir GitHub (TavaoBR)`
* **Acessibilidade:**
  * Navegação completa por setas do teclado (`ArrowDown`, `ArrowUp`, `Enter`, `Escape`).
  * Foco retido no modal (`focus trap`) e leitura por leitores de tela com `role="combobox"` e `aria-expanded`.
