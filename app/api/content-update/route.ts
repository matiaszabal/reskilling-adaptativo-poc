import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

interface ContentUpdate {
    success: boolean;
    timestamp: string;
    updates?: {
        threats?: { summary: string; citations: any[] };
        vulnerabilities?: { summary: string; citations: any[] };
        best_practices?: { summary: string; citations: any[] };
        research?: { summary: string; citations: any[] };
    };
    error?: string;
}

// Cache for content updates (5 minute TTL)
let cachedContent: ContentUpdate | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * GET /api/content-update
 * Returns cached content updates or triggers a new fetch
 */
export async function GET(request: NextRequest) {
    const forceRefresh = request.nextUrl.searchParams.get('refresh') === 'true';

    // Return cached content if available and not forcing refresh
    if (!forceRefresh && cachedContent && (Date.now() - cacheTimestamp) < CACHE_TTL) {
        return NextResponse.json({
            ...cachedContent,
            cached: true,
            cacheAge: Math.floor((Date.now() - cacheTimestamp) / 1000), // seconds
        });
    }

    // Fetch new content
    return fetchContentUpdates();
}

/**
 * POST /api/content-update
 * Triggers manual content update
 */
export async function POST() {
    return fetchContentUpdates();
}

/**
 * Fetch content updates from NotebookLM via Python client
 */
async function fetchContentUpdates(): Promise<NextResponse> {
    try {
        const pythonScript = path.join(process.cwd(), 'python-services', 'notebooklm_client.py');

        const result = await executePythonScript(pythonScript);

        if (result.success) {
            // Cache the successful result
            cachedContent = result;
            cacheTimestamp = Date.now();

            return NextResponse.json({
                ...result,
                cached: false,
            });
        } else {
            // Return cached content if fetch failed
            if (cachedContent) {
                return NextResponse.json({
                    ...cachedContent,
                    cached: true,
                    warning: 'Using cached content due to fetch error',
                    error: result.error,
                });
            }

            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Content update error:', error);

        // Return cached content if available
        if (cachedContent) {
            return NextResponse.json({
                ...cachedContent,
                cached: true,
                warning: 'Using cached content due to system error',
            });
        }

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
 * Execute Python script and return parsed JSON result
 */
function executePythonScript(scriptPath: string): Promise<ContentUpdate> {
    return new Promise((resolve, reject) => {
        const python = spawn('python3', [scriptPath]);

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
                    timestamp: new Date().toISOString(),
                    error: `Python script exited with code ${code}: ${stderr}`,
                });
                return;
            }

            try {
                const result = JSON.parse(stdout);
                resolve(result);
            } catch (error) {
                resolve({
                    success: false,
                    timestamp: new Date().toISOString(),
                    error: `Failed to parse Python output: ${error}`,
                });
            }
        });

        python.on('error', (error) => {
            resolve({
                success: false,
                timestamp: new Date().toISOString(),
                error: `Failed to spawn Python process: ${error.message}`,
            });
        });

        // Timeout after 30 seconds
        setTimeout(() => {
            python.kill();
            resolve({
                success: false,
                timestamp: new Date().toISOString(),
                error: 'Request timeout after 30 seconds',
            });
        }, 30000);
    });
}
