import OpenAI from "openai";
import dotenv from "dotenv";

if (process.env.NODE_ENV != "production") {
	dotenv.config();
}
const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function BugFix(userInput, onProgress) {
	const client = new OpenAI({ baseURL: endpoint, apiKey: token });
	let result = "";

	const stream = await client.chat.completions.create({
		messages: [
			{
				role: "system",
				content:
					"You are an advanced AI code debugger and optimizer. Your task is to analyze code, identify errors, inefficiencies, and potential improvements while maintaining its original intent. Provide short explanations for detected issues and suggest optimized solutions with well-structured, efficient, and clean code. Ensure best practices, performance enhancements, and readability. If necessary, refactor the code while preserving its functionality. If the code is correct, suggest improvements or optimizations where applicable.",
			},
			{
				role: "user",
				content: userInput,
			},
		],
		model: modelName,
		stream: true,
		stream_options: { include_usage: true },
	});

	try {
		for await (const part of stream) {
			const content = part.choices[0]?.delta?.content || "";
			result += content;
			// Send each chunk as it arrives
			onProgress?.(content);
		}
	} catch (error) {
		console.error("Stream error:", error);
		throw error;
	}

	return result;
}
