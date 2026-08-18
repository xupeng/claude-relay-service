const REASONING_EFFORT_MAP = new Map([
  ['max', 'xhigh'],
  ['ultra', 'xhigh']
])

function normalizeReasoningEffortValue(value) {
  if (typeof value !== 'string') {
    return value
  }

  return REASONING_EFFORT_MAP.get(value.trim().toLowerCase()) || value
}

function normalizeOpenAIReasoningEffort(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return body
  }

  const nestedEffort = body.reasoning?.effort
  const normalizedNestedEffort = normalizeReasoningEffortValue(nestedEffort)
  const rootEffort = body.reasoning_effort
  const normalizedRootEffort = normalizeReasoningEffortValue(rootEffort)

  if (normalizedNestedEffort === nestedEffort && normalizedRootEffort === rootEffort) {
    return body
  }

  const normalizedBody = { ...body }

  if (normalizedNestedEffort !== nestedEffort) {
    normalizedBody.reasoning = {
      ...body.reasoning,
      effort: normalizedNestedEffort
    }
  }

  if (normalizedRootEffort !== rootEffort) {
    normalizedBody.reasoning_effort = normalizedRootEffort
  }

  return normalizedBody
}

module.exports = {
  normalizeOpenAIReasoningEffort
}
