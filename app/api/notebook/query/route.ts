import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

interface QueryResult {
    success: boolean;
    content?: any[];
    citations?: any[];
    error?: string;
}

/**
 * POST /api/notebook/query
 * Query NotebookLM notebook with a specific question
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { query, notebook_id } = body;

        if (!query) {
            return NextResponse.json(
                { success: false, error: 'Query parameter is required' },
                { status: 400 }
            );
        }

        const pythonScript = path.join(process.cwd(), 'python-services', 'notebooklm_client.py');
        const result = await executeQuery(pythonScript, query, notebook_id);

        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json(result, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

/**
 * Execute query via Python script
 */
function executeQuery(
    scriptPath: string,
    query: string,
    notebookId?: string
): Promise<QueryResult> {
    return new Promise((resolve) => {
        const args = ['--query', query];
        if (notebookId) {
            args.push('--notebook', notebookId);
        }

        const python = spawn('python3', [scriptPath, ...args]);

        let stdout = '';
        let stderr = '';

        python.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        python.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        python.on('close', (code) => {
            if (code !== 0) {
                resolve({
                    success: false,
                    error: `Query failed with code ${code}: ${stderr}`,
                });
                return;
            }

            try {
                const result = JSON.parse(stdout);
                resolve(result);
            } catch (error) {
                resolve({
                    success: false,
                    error: `Failed to parse response: ${error}`,
                });
            }
        });

        python.on('error', (error) => {
            resolve({
                success: false,
                error: `Failed to execute query: ${error.message}`,
            });
        });

        // Timeout after 30 seconds
        setTimeout(() => {
            python.kill();
            resolve({
                success: false,
                error: 'Query timeout after 30 seconds',
            });
        }, 30000);
    });
}
