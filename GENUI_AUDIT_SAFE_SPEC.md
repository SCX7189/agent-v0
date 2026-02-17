# GenUI Audit-Safe Spec (IA Visibility Lab)

## 1) Scope

Objectif: garder une interface stable pour la décision, avec génération IA uniquement dans des blocs contrôlés.

Principe:
- Layout global fixe (3 écrans).
- Composants dynamiques à l'intérieur des blocs.
- Toute assertion doit être taggée `[Fact]`, `[Hypothesis]` ou `[Unknown]`.

## 2) Écrans

### A. Diagnostic
Blocs fixes:
1. Executive Summary
2. Fact / Hypothesis / Unknown
3. Evidence Gaps
4. Market Signals

Sortie attendue (JSON):
```json
{
  "screen": "diagnostic",
  "summary": "string",
  "facts": [{"text":"string","source":"string"}],
  "hypotheses": [{"text":"string"}],
  "unknowns": [{"text":"string","evidence_required":"string"}],
  "evidence_gaps": [{"priority":"high|medium|low","item":"string"}],
  "signals": [{"label":"string","value":0,"delta":0}]
}
```

### B. Scénarios
Blocs fixes:
1. Base / Upside / Downside
2. Hypothèses clés
3. Triggers
4. KPI de surveillance

Sortie attendue (JSON):
```json
{
  "screen": "scenarios",
  "scenarios": [
    {"name":"base","narrative":"string","confidence":"low|medium|high"},
    {"name":"upside","narrative":"string","confidence":"low|medium|high"},
    {"name":"downside","narrative":"string","confidence":"low|medium|high"}
  ],
  "assumptions": [{"text":"string","tag":"Fact|Hypothesis|Unknown"}],
  "triggers": [{"signal":"string","threshold":"string","impact":"string"}],
  "kpis": [{"name":"string","target":"string","cadence":"weekly|monthly"}]
}
```

### C. Décision
Blocs fixes:
1. Options A/B/C
2. Trade-offs
3. Recommandation
4. Plan 30/60/90
5. Risques d’exécution

Sortie attendue (JSON):
```json
{
  "screen": "decision",
  "options": [
    {"id":"A","title":"string","pros":["string"],"cons":["string"]},
    {"id":"B","title":"string","pros":["string"],"cons":["string"]},
    {"id":"C","title":"string","pros":["string"],"cons":["string"]}
  ],
  "recommendation": {"option_id":"A|B|C","rationale":"string"},
  "plan_30_60_90": {
    "d30":["string"],
    "d60":["string"],
    "d90":["string"]
  },
  "execution_risks": [{"risk":"string","mitigation":"string"}]
}
```

## 3) UX Rules

1. Même structure visuelle pour tous les sujets.
2. Les tags de preuve sont toujours visibles.
3. Un bloc "Données manquantes" est obligatoire.
4. Un bouton "Rejouer avec focus" est présent sur chaque écran.

## 4) Focus Modes

Focus supportés:
- `diagnostic`
- `finance`
- `competition`
- `red_team`
- `board_memo`

Comportement:
- Le focus ne change pas le layout global.
- Le focus change uniquement le contenu et la pondération des blocs.

## 5) Logging / Audit

À logger par réponse:
- `session_id`
- `screen`
- `focus_mode`
- `model`
- `web_search_used`
- `prompt_version`
- `decision_id` (si écran Décision)

## 6) Implementation Plan (MVP)

1. Ajouter un sélecteur `screen` + `focus` dans l’UI.
2. Demander au backend une sortie JSON stricte (schema par écran).
3. Mapper JSON -> composants React/HTML fixes.
4. Ajouter validation JSON côté backend avant réponse.
5. Ajouter log technique et métier en Airtable.
