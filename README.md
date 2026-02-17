## agent-v0 frontend

Static frontend for calling the backend `/api/agent` endpoint.

### Chat features

- Persistent conversation history (localStorage)
- Conversation starters
- Backend URL + secret editable from the UI
- Full message history is sent to keep context

### Local check

Run a static server from this folder:

```bash
python3 -m http.server 4173
```

Then open:

`http://127.0.0.1:4173/index.html`

In the UI, set:
- backend API URL
- `x-agent-secret`

Use `Save config` then `Re-check API`.

### Backend check (before Vercel)

```bash
curl -sS -X POST "$BACKEND_URL" \
  -H "Content-Type: application/json" \
  -H "x-agent-secret: $AGENT_SECRET" \
  -d '{"messages":[{"role":"user","content":"ping"}]}'
```
