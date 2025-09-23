export const API_BASE = 'http://127.0.0.1:5000/api'

async function request(path, method='GET', body=null, token=null){
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['x-auth-token'] = token

  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  })

  const data = await res.json().catch(()=>null)

  if (!res.ok) {
    const msg = data?.msg || data?.message || `Request failed (${res.status})`
    throw new Error(msg)
  }

  return data
}

export const api = {
  get: (p) => request(p, 'GET'),
  post: (p, body, token) => request(p, 'POST', body, token)
}
