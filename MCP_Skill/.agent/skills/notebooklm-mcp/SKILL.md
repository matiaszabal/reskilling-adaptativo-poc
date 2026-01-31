---
name: NotebookLM MCP Expert
description: Comprehensive guide for using NotebookLM MCP server to interact with Google NotebookLM programmatically
---

# NotebookLM MCP Skill

This skill provides expert guidance on using the NotebookLM MCP (Model Context Protocol) server to interact programmatically with Google's NotebookLM for research, content management, and AI-powered analysis.

## Overview

NotebookLM MCP exposes NotebookLM's capabilities as MCP tools, enabling:
- **Zero-hallucination answers** based on your own notebooks and sources
- **Automated workflow integration** with AI agents
- **Content generation** (audio overviews, videos, infographics, slide decks)
- **Research automation** with web and Google Drive discovery
- **Source management** across multiple formats (URLs, YouTube, PDFs, Google Drive, text)

## Core Capabilities

### 1. Notebook Management

**List all notebooks:**
```
Use list_resources to see available notebooks from notebooklm-mcp-server
```

**Create a new notebook:**
- Tool: `notebook_create`
- Use case: Starting a new research project or knowledge base

**Get notebook details:**
- Tool: `notebook_get`
- Returns: Notebook metadata, sources, and structure

**Describe notebook:**
- Tool: `notebook_describe`
- Returns: AI-generated summary of the notebook's content

**Rename notebook:**
- Tool: `notebook_rename`
- Parameters: notebook_id, new_name

**Delete notebook:**
- Tool: `notebook_delete`
- ⚠️ Requires confirmation

### 2. Source Management

**Add sources to notebooks:**
- `notebook_add_url` - Add URLs or YouTube videos
- `notebook_add_text` - Add pasted text content
- `notebook_add_drive` - Add Google Drive documents
- Also supports: PDFs, DOCX files

**Manage existing sources:**
- `source_describe` - Get AI summary and keywords for a source
- `source_get_content` - Retrieve raw text content (no AI processing)
- `source_list_drive` - List Google Drive sources with freshness status
- `source_sync_drive` - Sync stale Google Drive sources (requires confirmation)
- `source_delete` - Remove a source (requires confirmation)

### 3. Querying and Analysis

**Query notebooks for answers:**
- Tool: `notebook_query`
- Use case: Ask questions and get AI-generated answers with citations
- Returns: Citations from sources, ensuring zero-hallucination responses

**Configure chat settings:**
- Tool: `chat_configure`
- Parameters: goal, style, response_length
- Use to customize the AI's response behavior

### 4. Content Generation (Studio Artifacts)

All content generation tools require confirmation and can be monitored via `studio_status`:

- `audio_overview_create` - Generate podcast-style audio overviews
- `video_overview_create` - Generate video overviews
- `infographic_create` - Generate visual infographics
- `slide_deck_create` - Generate presentation slide decks
- `studio_status` - Check generation status
- `studio_delete` - Delete generated artifacts (requires confirmation)

### 5. Research Automation

**Start research:**
- Tool: `research_start`
- Types: Web research or Google Drive research
- Use case: Automatically discover relevant sources

**Monitor research:**
- Tool: `research_status`
- Returns: Progress and discovered sources

**Import research results:**
- Tool: `research_import`
- Adds discovered sources to your notebook

### 6. Authentication

- `refresh_auth` - Reload authentication tokens or re-authenticate
- `save_auth_tokens` - Save cookies for authentication

> [!IMPORTANT]
> NotebookLM MCP uses browser cookie authentication. Ensure authentication is properly configured before using tools.

## Best Practices

### 1. Context Window Management

NotebookLM MCP exposes ~31 tools, which can consume significant context window space.

**Recommendation:** 
- Disable the MCP server when not actively using it
- Only enable when you need NotebookLM-specific operations
- Consider creating a dedicated session for NotebookLM work

### 2. Account Usage

- Use a dedicated Google account for automation (similar to web scraping best practices)
- Don't use your primary Google account for automated operations

### 3. Workflow Patterns

**Pattern 1: Research Project Setup**
1. `notebook_create` - Create project notebook
2. `notebook_add_url` / `notebook_add_drive` - Add initial sources
3. `research_start` - Discover additional sources
4. `research_import` - Import discovered sources
5. `notebook_query` - Start asking questions

**Pattern 2: Content Analysis**
1. Select existing notebook with `notebook_list`
2. `notebook_query` - Ask specific questions
3. Use citations to verify sources
4. `source_get_content` - Get raw content when needed

**Pattern 3: Content Generation**
1. Prepare notebook with relevant sources
2. `chat_configure` - Set desired output style
3. `audio_overview_create` or other studio tools
4. `studio_status` - Monitor generation
5. Retrieve generated content

### 4. Error Handling

- Many operations require confirmation (delete, sync operations)
- Always check operation status with appropriate status tools
- Use `refresh_auth` if authentication errors occur

## Integration Modes

NotebookLM MCP supports multiple integration methods:

1. **MCP Protocol (STDIO)** - Direct integration with MCP clients like Claude Code, Cursor
2. **HTTP REST API** - Integration with n8n, Zapier, Make.com, custom apps
3. **Docker Deployment** - Isolated server deployment

## Common Use Cases

### Research and Knowledge Management
- Building knowledge bases from multiple sources
- Automated literature review
- Organizing research materials with AI summaries

### Content Creation
- Generating podcasts from research materials
- Creating presentation decks from notebooks
- Producing visual summaries (infographics)

### Automated Workflows
- Monitoring Google Drive for new documents
- Auto-importing relevant research
- Building follow-up questions automatically

### Zero-Hallucination Q&A
- Asking questions with guaranteed source citations
- Fact-checking against your knowledge base
- Extracting specific information from large document sets

## Tool Selection Guide

| Task | Primary Tool | Follow-up Tools |
|------|-------------|-----------------|
| Start new project | `notebook_create` | `notebook_add_*` |
| Add research materials | `notebook_add_url`, `research_start` | `research_import` |
| Ask questions | `notebook_query` | `source_get_content` |
| Generate content | `audio_overview_create`, etc. | `studio_status` |
| Clean up | `source_delete`, `notebook_delete` | - |
| Fix auth issues | `refresh_auth` | - |

## Important Limitations

1. **Browser dependency**: Requires browser cookie authentication
2. **Rate limits**: Subject to NotebookLM's usage limits
3. **Confirmation required**: Destructive operations require user confirmation
4. **Context consumption**: Large tool set consumes significant context
5. **Source limits**: Check NotebookLM's limits for sources per notebook

## Security Considerations

- Never commit authentication tokens to version control
- Use dedicated accounts for automation
- Be mindful of data privacy when uploading sources
- Review NotebookLM's terms of service for automated usage

## When to Use NotebookLM MCP

✅ **Use when:**
- You need cited, hallucination-free answers from specific sources
- Building knowledge bases from diverse content types
- Automating research workflows
- Generating content from curated sources

❌ **Don't use when:**
- You need general knowledge queries (use standard LLM)
- Sources aren't critical to your task
- Context window space is limited
- Real-time web search is needed (use other tools)

## Example Workflows

### Workflow: Academic Research Assistant

1. Create notebook for research topic
2. Add academic papers (PDFs, URLs)
3. Start web research for additional sources
4. Import discovered papers
5. Query notebook with research questions
6. Generate audio overview for review
7. Create slide deck for presentation

### Workflow: Product Documentation Analysis

1. Create notebook for product
2. Add Drive docs, URLs, PDFs
3. Sync Drive sources regularly
4. Query for specific features/requirements
5. Generate infographic summaries
6. Export key findings

### Workflow: Content Creation Pipeline

1. Gather sources in notebook
2. Configure chat style for content type
3. Query for key insights
4. Generate multiple studio artifacts
5. Monitor status and retrieve results

## Troubleshooting

**Authentication failures:**
- Run `refresh_auth` to reload tokens
- Check browser cookies are valid
- Verify Google account access

**Missing tools:**
- Confirm MCP server is running
- Check server configuration
- Verify tools are enabled in client

**Slow responses:**
- NotebookLM operations can be slow (AI processing)
- Use status tools to monitor progress
- Consider async patterns for long operations

**Context overflow:**
- Disable MCP when not needed
- Use focused sessions
- Minimize concurrent tool availability

---

> [!TIP]
> For maximum efficiency, prepare your notebooks with sources first, then batch your queries. This minimizes authentication overhead and optimizes NotebookLM's processing.
