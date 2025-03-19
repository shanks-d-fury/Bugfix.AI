import { BugFix } from "../../lib/BugFixAI.js";

export async function POST(request) {
	try {
		const { code } = await request.json();

		const encoder = new TextEncoder();
		const stream = new ReadableStream({
			async start(controller) {
				await BugFix(code, (chunk) => {
					controller.enqueue(encoder.encode(chunk));
				});
				controller.close();
			},
		});

		return new Response(stream);
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
