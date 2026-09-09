import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import fs from 'fs';
import path from 'path';

function textNode(text: string, format = 0) {
  return {
    type: 'text',
    text,
    format,
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
  };
}

function paragraphNode(children: any[]) {
  return {
    type: 'paragraph',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children,
  };
}

function headingNode(tag: 'h2' | 'h3' | 'h4', text: string) {
  return {
    type: 'heading',
    tag,
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [textNode(text)],
  };
}

function quoteNode(text: string) {
  return {
    type: 'quote',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [textNode(text)],
  };
}

function codeBlockNode(code: string, language = 'typescript') {
  return {
    type: 'block',
    version: 2,
    fields: {
      blockType: 'Code',
      language,
      code,
    },
  };
}

function listNode(listType: 'bullet' | 'number', items: string[]) {
  return {
    type: 'list',
    listType,
    start: 1,
    tag: listType === 'number' ? 'ol' : 'ul',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: items.map((item, idx) => ({
      type: 'listitem',
      value: idx + 1,
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [textNode(item)],
    })),
  };
}

function hrNode() {
  return {
    type: 'horizontalrule',
    version: 1,
  };
}

const MCP_SAMPLE_CODE = `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Initialize server instance
const server = new McpServer({
  name: "portfolio-agent-hub",
  version: "1.0.0",
});

// Register dynamic tool with schema validation
server.tool(
  "query-portfolio-projects",
  {
    category: z.enum(["web", "ai", "systems"]).describe("Project category to filter"),
    includeStats: z.boolean().default(true).describe("Include stars/metrics"),
  },
  async ({ category, includeStats }) => {
    const projects = await fetchProjects(category);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ results: projects, count: projects.length }, null, 2),
        },
      ],
    };
  }
);

// Connect via standard I/O transport
const transport = new StdioServerTransport();
await server.connect(transport);`;

const ARTICLE_CONTENT = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      paragraphNode([
        textNode('The transition from monolithic prompt engineering to '),
        textNode('modular, decoupled agentic tools', 1),
        textNode(' has fundamentally changed modern software architecture. Anthropic’s '),
        textNode('Model Context Protocol (MCP)', 2),
        textNode(' establishes a standardized JSON-RPC communication bridge between AI models and external services, environments, and databases.'),
      ]),
      quoteNode('Intelligence without context is hallucination. Tools without well-defined protocol boundaries are unpredictable.'),
      headingNode('h2', '1. The Core Architecture of MCP'),
      paragraphNode([
        textNode('At its core, MCP divides responsibilities cleanly between the client (the host IDE or agent runtime) and the server (the provider of prompts, tools, and resources). Here is a production-grade TypeScript MCP server implementation:'),
      ]),
      codeBlockNode(MCP_SAMPLE_CODE, 'typescript'),
      headingNode('h2', '2. Key Benefits of Modular Agent Architecture'),
      paragraphNode([
        textNode('Adopting standardized protocols over custom proprietary connectors provides several immediate advantages:'),
      ]),
      listNode('bullet', [
        'Strict separation of concerns between reasoning models and execution capabilities.',
        'Sandboxed tool execution using JSON-RPC transports over stdio, HTTP-SSE, or WebSockets.',
        'Seamless multi-agent handoffs without re-engineering API client layers.',
        'Auditable logging and rate-limiting at the transport boundary.',
      ]),
      hrNode(),
      headingNode('h3', 'Looking Ahead'),
      paragraphNode([
        textNode('As agentic systems mature, standardized protocols like MCP will replace one-off tool functions. In upcoming articles, we’ll explore multi-tenant session management and real-time streaming notifications in production agents.'),
      ]),
    ],
  },
};

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });

    // 1. Ensure "AI Engineering" Topic exists
    const existingTopics = await payload.find({
      collection: 'topics',
      where: { slug: { equals: 'ai-engineering' } },
      limit: 1,
    });

    let topicId: number;
    if (existingTopics.docs.length > 0) {
      topicId = existingTopics.docs[0].id;
    } else {
      const newTopic = await payload.create({
        collection: 'topics',
        data: {
          name: 'AI Engineering',
          slug: 'ai-engineering',
          description: 'Artificial intelligence, agentic frameworks, and modular tool protocols.',
        },
      });
      topicId = newTopic.id;
    }

    // 2. Upload cover image to Media collection if not present
    let coverImageId: number | undefined;
    const existingMedia = await payload.find({
      collection: 'media',
      where: { alt: { equals: 'Exploring Agentic AI & MCP' } },
      limit: 1,
    });

    if (existingMedia.docs.length > 0) {
      coverImageId = existingMedia.docs[0].id;
    } else {
      const localImagePath = path.join(process.cwd(), 'public/assets/images/blog/agentic_ai.jpg');
      if (fs.existsSync(localImagePath)) {
        const fileBuffer = fs.readFileSync(localImagePath);
        const createdMedia = await payload.create({
          collection: 'media',
          data: {
            alt: 'Exploring Agentic AI & MCP',
            caption: 'Model Context Protocol architecture and agent communication.',
          },
          file: {
            data: fileBuffer,
            name: 'agentic_ai.jpg',
            mimetype: 'image/jpeg',
            size: fileBuffer.length,
          },
        });
        coverImageId = createdMedia.id;
      }
    }

    // 3. Create or update the flagship blog post
    const existingPosts = await payload.find({
      collection: 'posts',
      where: { slug: { equals: 'exploring-agentic-ai-mcp' } },
      limit: 1,
    });

    const postData = {
      title: 'Exploring Agentic AI & Model Context Protocol (MCP)',
      slug: 'exploring-agentic-ai-mcp',
      excerpt: 'A deep dive into building modular AI tools, serverless architectures, and reactive LLM integrations with MCP servers.',
      topic: topicId,
      category: 'AI Engineering',
      tags: ['AI Engineering', 'MCP', 'Claude', 'Agentic'],
      coverImage: coverImageId,
      imageUrl: '/assets/images/blog/agentic_ai.jpg',
      content: ARTICLE_CONTENT as any,
      status: 'published' as const,
      publishedDate: '2026-09-01T00:00:00.000Z',
      readingTime: 4,
    };

    let postResult;
    if (existingPosts.docs.length > 0) {
      postResult = await payload.update({
        collection: 'posts',
        id: existingPosts.docs[0].id,
        data: postData,
      });
    } else {
      postResult = await payload.create({
        collection: 'posts',
        data: postData,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully!',
      topic: { id: topicId, name: 'AI Engineering' },
      mediaId: coverImageId,
      post: { id: postResult.id, title: postResult.title, slug: postResult.slug },
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
