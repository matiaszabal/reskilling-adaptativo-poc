# NotebookLM Integration

This directory contains the Python client for integrating with NotebookLM MCP server.

## Files

- `notebooklm_client.py` - Main MCP client for querying NotebookLM

## Setup

### Prerequisites

1. NotebookLM MCP server installed:
```bash
uvx notebooklm-mcp --help
```

2. Authenticated with NotebookLM:
```bash
uvx notebooklm-mcp-auth
```

## Usage

### Test Connection

```bash
python3 notebooklm_client.py --test
```

### Query Notebook

```bash
python3 notebooklm_client.py --query "What are the latest AI security threats?"
```

### Get Latest Security Updates

```bash
python3 notebooklm_client.py
```

This will output JSON with the latest content from NotebookLM.

## Integration with Next.js

The Python client is called by the Next.js API routes:

- `/api/content-update` - GET/POST to fetch latest security updates
- `/api/notebook/query` - POST to query with custom questions

See `/lib/content-manager.ts` for TypeScript utilities.

## Troubleshooting

**Error: MCP server not found**
```bash
# Install the server
uvx notebooklm-mcp-server
```

**Error: Authentication failed**
```bash
# Re-authenticate
uvx notebooklm-mcp-auth
```

**Error: Notebook not found**
- Create a notebook in NotebookLM first
- Add security research sources to it
- The script will auto-detect available notebooks
