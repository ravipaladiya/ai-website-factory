import { demoScript, getDemo } from "@/lib/demo-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const session = getDemo(params.id);
  if (!session) {
    return new Response("Not found", { status: 404 });
  }

  const encoder = new TextEncoder();
  const events = demoScript(session);

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encoder.encode("retry: 10000\n\n"));
      for (const { delayMs, event } of events) {
        await new Promise((r) => setTimeout(r, delayMs));
        const chunk = `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`;
        try {
          controller.enqueue(encoder.encode(chunk));
        } catch {
          return;
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
      "x-accel-buffering": "no",
    },
  });
}
