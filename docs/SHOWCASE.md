# Guided evidence tour · Visita guiada às evidências

[README](../README.md) · [Validation / Validação](../docs/VALIDATION.md)

## The question · A pergunta

**EN:** How do surface costs and clearance change a proposed route?

**PT:** Como custo de piso e folga alteram um percurso proposto?

## First result · Primeiro resultado

Narrow passage: clearance 0 gives 7.5 model units of distance and cost 15; clearance 1 blocks the route. / Passagem estreita: folga 0 resulta em distância de 7,5 unidades do modelo e custo 15; folga 1 bloqueia a rota.

**EN:** These are committed examples of software behavior. Follow the installation and execution commands in the [README](../README.md#english); the source inputs and expected outputs below allow inspection before installation.

**PT:** São exemplos versionados do comportamento do software. Siga a instalação e os comandos do [README](../README.md#portugues); as entradas e saídas abaixo permitem inspecionar o resultado antes de instalar.

## Compare one assumption · Compare uma premissa

**EN:** Import narrow-passage, compare clearance 0 and 1, then distinguish distance from weighted cost. Keep the original input, change a copy, rerun the implementation and compare the complete output, including warnings and excluded records.

**PT:** Importe narrow-passage, compare folgas 0 e 1 e separe distância de custo ponderado. Preserve a entrada original, altere uma cópia, execute novamente e compare a saída completa, incluindo avisos e registros excluídos.

## Inputs and expected outputs · Entradas e saídas esperadas

| Input · Entrada | Expected output · Saída esperada | Inspect · Inspecione |
| --- | --- | --- |
| [courtyard.json](../examples/courtyard.json) | [courtyard.expected.json](../examples/courtyard.expected.json) | Compare the complete record / Compare o registro completo |
| [learning-centre.json](../examples/learning-centre.json) | [learning-centre.expected.json](../examples/learning-centre.expected.json) | Compare the complete record / Compare o registro completo |
| [narrow-passage.json](../examples/narrow-passage.json) | [narrow-passage.expected.json](../examples/narrow-passage.expected.json) | Compare the complete record / Compare o registro completo |

## Review the evidence · Revise as evidências

1. **Input / Entrada:** identify units, identifiers and assumptions before interpreting a result. / Identifique unidades, identificadores e premissas antes de interpretar o resultado.
2. **Implementation / Implementação:** follow the domain code linked in the README. / Acompanhe o código de domínio indicado no README.
3. **Output / Saída:** compare both the headline and the complete record. / Compare o destaque e o registro completo.
4. **Checks / Verificações:** read [validation notes](../docs/VALIDATION.md) and the current workflow result. / Leia as [notas de validação](../docs/VALIDATION.md) e o resultado atual da automação.

**EN:** The banner illustrates the workflow; it is not a screenshot. Example values describe the supplied scenarios. They do not establish physical performance, institutional endorsement or an outcome beyond the documented software scope. Domain-specific assumptions and limitations remain in the README and method documents.

**PT:** O banner ilustra o fluxo; não é uma captura de tela. Os valores descrevem os cenários fornecidos. Não estabelecem desempenho físico, endosso institucional ou resultado além do escopo documentado do software. Premissas e limites do domínio permanecem no README e nos documentos de método.
