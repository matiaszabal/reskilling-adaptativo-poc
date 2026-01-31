#!/usr/bin/env python3
"""
NotebookLM MCP Client
Connects to NotebookLM MCP server to fetch latest Agentic AI Security content
"""

import sys
import json
import subprocess
from typing import Dict, List, Any, Optional

class NotebookLMClient:
    def __init__(self):
        self.server_command = ["uvx", "notebooklm-mcp-server"]
        
    def _send_request(self, method: str, params: Optional[Dict] = None) -> Dict[str, Any]:
        """Send a request to the MCP server via stdio"""
        request = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params or {}
        }
        
        # Start MCP server process
        process = subprocess.Popen(
            self.server_command,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Send request
        request_str = json.dumps(request) + "\n"
        stdout, stderr = process.communicate(input=request_str, timeout=30)
        
        # Parse response
        if stderr:
            print(f"Warning: {stderr}", file=sys.stderr)
            
        try:
            response = json.loads(stdout)
            return response
        except json.JSONDecodeError as e:
            return {"error": f"Failed to parse response: {e}", "raw": stdout}
    
    def list_notebooks(self) -> List[Dict[str, str]]:
        """List all available notebooks"""
        try:
            response = self._send_request("tools/list")
            # Extract notebook resources
            if "result" in response and "tools" in response["result"]:
                notebooks = []
                for tool in response["result"]["tools"]:
                    if "notebook" in tool.get("name", "").lower():
                        notebooks.append({
                            "name": tool.get("name", ""),
                            "description": tool.get("description", "")
                        })
                return notebooks
            return []
        except Exception as e:
            print(f"Error listing notebooks: {e}", file=sys.stderr)
            return []
    
    def query_notebook(self, query: str, notebook_id: Optional[str] = None) -> Dict[str, Any]:
        """Query a notebook for content"""
        try:
            params = {
                "name": "notebook_query",
                "arguments": {
                    "query": query
                }
            }
            
            if notebook_id:
                params["arguments"]["notebook_id"] = notebook_id
                
            response = self._send_request("tools/call", params)
            
            if "result" in response:
                return {
                    "success": True,
                    "content": response["result"].get("content", []),
                    "citations": response["result"].get("citations", [])
                }
            else:
                return {
                    "success": False,
                    "error": response.get("error", "Unknown error")
                }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_latest_security_updates(self) -> Dict[str, Any]:
        """Get latest Agentic AI security content updates"""
        queries = {
            "threats": "What are the latest security threats in Agentic AI systems?",
            "vulnerabilities": "What are recent vulnerabilities discovered in LLMs and AI agents?",
            "best_practices": "What are the current best practices for securing AI agents?",
            "research": "What is the latest research on prompt injection and jailbreaking?"
        }
        
        results = {}
        for category, query in queries.items():
            result = self.query_notebook(query)
            if result["success"]:
                # Extract text from content
                content_text = ""
                for item in result.get("content", []):
                    if isinstance(item, dict) and "text" in item:
                        content_text += item["text"] + "\n"
                    elif isinstance(item, str):
                        content_text += item + "\n"
                
                results[category] = {
                    "summary": content_text.strip(),
                    "citations": result.get("citations", [])
                }
            else:
                results[category] = {
                    "summary": f"Error: {result.get('error', 'Unknown error')}",
                    "citations": []
                }
        
        return {
            "success": True,
            "timestamp": self._get_timestamp(),
            "updates": results
        }
    
    def _get_timestamp(self) -> str:
        """Get current timestamp"""
        from datetime import datetime
        return datetime.now().isoformat()

def main():
    """Main entry point for command-line usage"""
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        # Test mode
        client = NotebookLMClient()
        print("Testing NotebookLM MCP connection...")
        
        # List notebooks
        print("\n1. Listing notebooks:")
        notebooks = client.list_notebooks()
        print(json.dumps(notebooks, indent=2))
        
        # Get updates
        print("\n2. Fetching latest security updates:")
        updates = client.get_latest_security_updates()
        print(json.dumps(updates, indent=2))
        
    elif len(sys.argv) > 1 and sys.argv[1] == "--query":
        # Query mode
        if len(sys.argv) < 3:
            print("Usage: notebooklm_client.py --query '<your question>'")
            sys.exit(1)
            
        client = NotebookLMClient()
        query = sys.argv[2]
        result = client.query_notebook(query)
        print(json.dumps(result, indent=2))
        
    else:
        # Default: get latest updates
        client = NotebookLMClient()
        updates = client.get_latest_security_updates()
        print(json.dumps(updates))

if __name__ == "__main__":
    main()
