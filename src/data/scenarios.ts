// ─── Question Types ────────────────────────────────────────────────────────────

export type Difficulty = "easy" | "medium" | "hard";
export type QuestionType = "multiple-choice" | "ordering" | "multi-select";

// Multiple-choice
export interface MCAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

// Ordering (drag/tap-to-place)
export interface OrderItem {
  id: string;
  text: string;
  emoji?: string;
}

// Multi-select
export interface MSOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

// ─── Base + Discriminated Union ────────────────────────────────────────────────

interface BaseScenario {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  relatedConcept: string;
  correctExplanation: string;
  wrongExplanation: string;
  scoringMultiplier: number;
}

export interface MultipleChoiceScenario extends BaseScenario {
  questionType: "multiple-choice";
  answers: MCAnswer[];
}

export interface OrderingScenario extends BaseScenario {
  questionType: "ordering";
  instruction: string;
  items: OrderItem[];
  correctOrder: string[]; // Array of item IDs in correct order
}

export interface MultiSelectScenario extends BaseScenario {
  questionType: "multi-select";
  instruction: string;
  options: MSOption[];
}

export type Scenario =
  | MultipleChoiceScenario
  | OrderingScenario
  | MultiSelectScenario;

// ─── Scenarios (aligned 100% with the video script) ───────────────────────────

export const SCENARIOS: Scenario[] = [
  // ── Q1 · EASY · Multiple Choice ─────────────────────────────────────────────
  {
    id: "q1_modes",
    title: "Eligiendo tu Modalidad",
    description:
      "Tu jefe te pide redactar el reporte de resultados del equipo. Es la misma estructura cada semana: mismas secciones, mismo formato, solo cambian los números. ¿Qué modalidad de trabajo con IA es la más adecuada?",
    difficulty: "easy",
    questionType: "multiple-choice",
    answers: [
      {
        id: "a",
        text: "Agencia — configurar un agente autónomo que lo redacte solo cada semana.",
        isCorrect: false,
      },
      {
        id: "b",
        text: "Aumento (Colaboración) — discutir con la IA qué datos incluir y cómo estructurarlo.",
        isCorrect: false,
      },
      {
        id: "c",
        text: "Automatización — darle los datos del período con instrucciones claras y que lo ejecute rápido.",
        isCorrect: true,
      },
      {
        id: "d",
        text: "Delegación total — entregarle la tarea sin revisar el resultado porque la estructura ya está definida.",
        isCorrect: false,
      },
    ],
    relatedConcept: "Bloque 1: Los tres modos de trabajo con IA",
    correctExplanation:
      "La automatización es perfecta para tareas repetitivas y predecibles. Tienes un resultado claro: el mismo reporte de siempre, con datos nuevos. No necesitas colaborar ni configurar nada complejo.",
    wrongExplanation:
      "Cuando la tarea es predecible y el resultado está bien definido, la automatización es lo correcto. El aumento es para explorar ideas; la agencia es para flujos complejos y autónomos.",
    scoringMultiplier: 1.0,
  },

  // ── Q2 · EASY · Ordering ────────────────────────────────────────────────────
  {
    id: "q2_4d_order",
    title: "Las 4D en Secuencia",
    description:
      "Anthropic diseñó el framework de las 4D como una secuencia lógica. Hay un orden natural en el que deberías aplicar estas cuatro habilidades al trabajar en cualquier proyecto.",
    difficulty: "easy",
    questionType: "ordering",
    instruction: "Coloca las 4D en el orden correcto en que deberías aplicarlas.",
    items: [
      { id: "descripcion", text: "Descripción", emoji: "🟣" },
      { id: "delegacion", text: "Delegación", emoji: "🔵" },
      { id: "diligencia", text: "Diligencia", emoji: "🟢" },
      { id: "discernimiento", text: "Discernimiento", emoji: "🟠" },
    ],
    correctOrder: ["delegacion", "descripcion", "discernimiento", "diligencia"],
    relatedConcept: "Bloque 1 & 3: El framework de las 4D",
    correctExplanation:
      "Primero decides QUÉ delegar (Delegación). Después describes CÓMO pedirlo (Descripción). Evalúas el resultado (Discernimiento). Y cierras asumiendo la responsabilidad final (Diligencia). Este orden tiene lógica clara.",
    wrongExplanation:
      "El orden es: Delegación → Descripción → Discernimiento → Diligencia. Primero defines el problema y lo que delegas, luego lo comunicas bien, evalúas el resultado, y siempre cierras con responsabilidad.",
    scoringMultiplier: 1.0,
  },

  // ── Q3 · MEDIUM · Multiple Choice ───────────────────────────────────────────
  {
    id: "q3_hallucinations",
    title: "El Experto Alucinado",
    description:
      "Estás investigando un caso legal que ocurrió hace dos meses. La IA te entrega una respuesta muy detallada con nombres de jueces, fechas exactas y citas de leyes. Todo suena convincente. ¿Cuál es el riesgo principal?",
    difficulty: "medium",
    questionType: "multiple-choice",
    answers: [
      {
        id: "a",
        text: "La ventana de contexto se llenará demasiado rápido con información legal.",
        isCorrect: false,
      },
      {
        id: "b",
        text: "Fecha de corte + alucinaciones: puede inventar datos convincentes pero completamente falsos.",
        isCorrect: true,
      },
      {
        id: "c",
        text: "La IA no está entrenada para entender terminología legal compleja.",
        isCorrect: false,
      },
      {
        id: "d",
        text: "La respuesta será demasiado general porque no tiene acceso a bases de datos legales en tiempo real.",
        isCorrect: false,
      },
    ],
    relatedConcept: "Bloque 2: Limitaciones reales — fecha de corte y alucinaciones",
    correctExplanation:
      "La IA tiene fecha de corte y no sabe qué pasó después. Cuando intenta ser útil sin tener la información, 'alucina': inventa nombres, fechas y citas que suenan completamente reales pero son falsas. Lo hace con total confianza.",
    wrongExplanation:
      "No es falta de capacidad — la IA entiende lenguaje legal perfectamente. El problema es técnico: predice palabras estadísticamente en lugar de buscar hechos verificados en tiempo real.",
    scoringMultiplier: 1.5,
  },

  // ── Q4 · MEDIUM · Multi-Select ───────────────────────────────────────────────
  {
    id: "q4_delegation_limits",
    title: "El Límite de la Delegación",
    description:
      "El curso de Anthropic es claro: hay tareas que puedes delegar completamente a la IA, y hay decisiones que deben permanecer en manos humanas. ¿Cuáles de las siguientes son seguras para delegar a la IA sin revisión humana posterior?",
    difficulty: "medium",
    questionType: "multi-select",
    instruction: "Selecciona todas las que apliquen.",
    options: [
      {
        id: "a",
        text: "Redactar el primer borrador de un correo para un cliente.",
        isCorrect: true,
      },
      {
        id: "b",
        text: "Decidir si contratar o no a un candidato en un proceso de selección.",
        isCorrect: false,
      },
      {
        id: "c",
        text: "Generar 15 opciones de nombres para un nuevo producto.",
        isCorrect: true,
      },
      {
        id: "d",
        text: "Publicar un artículo con datos financieros específicos sin verificarlos.",
        isCorrect: false,
      },
    ],
    relatedConcept: "Bloque 3: Delegación — decisiones exclusivamente humanas",
    correctExplanation:
      "Borradores e ideas son perfectas para delegar: son creativas y sin consecuencias directas sobre personas. Tú revisas y decides qué usar — eso es exactamente lo que hace el ciclo de Discernimiento.",
    wrongExplanation:
      "La contratación involucra sesgos en los datos de entrenamiento y afecta vidas reales. Publicar datos sin verificar viola directamente la Diligencia — tú firmas el trabajo, no la IA.",
    scoringMultiplier: 1.5,
  },

  // ── Q5 · HARD · Multiple Choice ─────────────────────────────────────────────
  {
    id: "q5_context_window",
    title: "La Sesión que se Descarriló",
    description:
      "Llevas 3 horas desarrollando una app con IA. Al principio todo iba bien, pero ahora la IA ignora instrucciones que le diste al inicio, repite código que ya descartaste y genera errores raros. ¿Qué está pasando y qué deberías hacer?",
    difficulty: "hard",
    questionType: "multiple-choice",
    answers: [
      {
        id: "a",
        text: "La IA está 'sobrecargada'. Cierra el navegador, espera unos minutos y regresa a la misma conversación.",
        isCorrect: false,
      },
      {
        id: "b",
        text: "Tu código tiene errores de arquitectura que la IA detecta de forma implícita. Hay que reescribirlo.",
        isCorrect: false,
      },
      {
        id: "c",
        text: "La ventana de contexto se llenó — la IA perdió el hilo. Abre un chat nuevo con un prompt más claro y limpio.",
        isCorrect: true,
      },
      {
        id: "d",
        text: "Es una limitación del modelo. Cambia a uno más avanzado dentro de la misma conversación.",
        isCorrect: false,
      },
    ],
    relatedConcept: "Bloque 2 & 4: Ventana de contexto — cuándo empezar de cero",
    correctExplanation:
      "La ventana de contexto es la 'memoria de trabajo' de la IA. Cuando se llena, empieza a olvidar las instrucciones del inicio. La solución no es corregirla en el mismo chat — es abrir uno nuevo con un prompt más preciso. Así obtienes mejores resultados mucho más rápido.",
    wrongExplanation:
      "La IA no se 'cansa' ni detecta errores inconscientemente. El problema es físico y técnico: la ventana de contexto tiene un límite. Seguir en la misma conversación solo empeorará la situación.",
    scoringMultiplier: 2.0,
  },

  // ── Q6 · HARD · Multiple Choice ─────────────────────────────────────────────
  {
    id: "q6_diligence_final",
    title: "La Responsabilidad Final",
    description:
      "Generaste un reporte financiero con IA y lo presentarás a la junta mañana. Un colega te dice: 'Si hay errores en los datos, fue la IA — tú solo pediste el reporte.' ¿Qué dice la Diligencia sobre esto?",
    difficulty: "hard",
    questionType: "multiple-choice",
    answers: [
      {
        id: "a",
        text: "Tu colega tiene razón. La responsabilidad del output es del modelo que lo generó.",
        isCorrect: false,
      },
      {
        id: "b",
        text: "Depende: si mencionas que usaste IA, la responsabilidad se divide entre tú y el modelo.",
        isCorrect: false,
      },
      {
        id: "c",
        text: "Tu colega está equivocado. Tú debes verificar cada cifra, ser transparente sobre el uso de IA y asumir la responsabilidad total.",
        isCorrect: true,
      },
      {
        id: "d",
        text: "La solución es usar solo modelos premium que garanticen 100% de precisión en datos financieros.",
        isCorrect: false,
      },
    ],
    relatedConcept: "Bloque 3: Diligencia — 'A la IA no la pueden despedir. A ti sí.'",
    correctExplanation:
      "A la IA no la pueden despedir. A ti sí. La Diligencia es clara: verificas los hechos, declaras el uso de IA con quienes necesitan saberlo, y tú firmas el trabajo. La responsabilidad profesional y ética siempre es humana.",
    wrongExplanation:
      "No existe modelo que garantice 100% de precisión, y la responsabilidad nunca se 'divide' con una máquina. El curso lo dice directamente: usar IA sin Diligencia es manejar a 200 km/h con los ojos vendados.",
    scoringMultiplier: 2.0,
  },
];
