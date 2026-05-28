import sys
import subprocess

def main():
    # This wrapper ensures the notebooklm-mcp server is launched correctly via python3
    # It acts as a bridge for Antigravity's MCP implementation.
    # Log arguments to stderr (visible in Antigravity logs but won't break MCP)
    print(f"DEBUG: Wrapper received arguments: {sys.argv}", file=sys.stderr)
    
    try:
        # Run the notebooklm-mcp module and pass through all arguments after the script name
        # If Antigravity passes the script path as arg[0], we need sys.argv[1:]
        server_args = sys.argv[1:]
        print(f"DEBUG: Launching server with args: {server_args}", file=sys.stderr)
        
        subprocess.run([sys.executable, "-m", "notebooklm_mcp.server"] + server_args, check=True)
    except Exception as e:
        print(f"Error starting NotebookLM MCP server: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
