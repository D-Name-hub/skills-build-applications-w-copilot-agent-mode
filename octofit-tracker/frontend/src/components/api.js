const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const DEFAULT_LOCAL_API_HOST = 'http://localhost:8000'

export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : DEFAULT_LOCAL_API_HOST

export function buildApiEndpoint(componentName) {
  return `${API_BASE_URL}/api/${componentName}/`
}

export function normalizeApiResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload?.data && Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload?.items && Array.isArray(payload.items)) {
    return payload.items
  }

  if (payload?.results && Array.isArray(payload.results)) {
    return payload.results
  }

  return payload ? [payload] : []
}

export async function fetchApiItems(componentName) {
  const endpoint = buildApiEndpoint(componentName)
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Failed to load ${componentName}: ${response.status} ${response.statusText}`)
  }

  const payload = await response.json()
  return normalizeApiResponse(payload)
}
