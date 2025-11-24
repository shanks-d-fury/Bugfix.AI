"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const backend_url = "https://bugfix-backend-cl57.vercel.app";
function CopyButton({ content }) {
	const [copied, setCopied] = useState(false);
	return (
		<button
			onClick={() => {
				navigator.clipboard.writeText(content);
				setCopied(true);
				setTimeout(() => setCopied(false), 1500);
			}}
			className="absolute top-2 right-2 text-sm px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600"
			aria-label="Copy to clipboard"
		>
			{copied ? "Copied" : "Copy"}
		</button>
	);
}

export default function Page() {
	let yamlFileContent = `name: AI review for last pushed file

on:
  push:

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 2

      - name: Find the last changed file
        id: detect_file
        run: |
          CHANGED_FILES=$(git diff --name-only \${{ github.event.before }} \${{ github.sha }})
          LAST_FILE=$(echo "$CHANGED_FILES" | tail -n 1)
          echo "last_file=$LAST_FILE" >> $GITHUB_OUTPUT

      - name: Read the entire file
        id: read_file
        run: |
          cat "\${{ steps.detect_file.outputs.last_file }}" > filecontent.txt

      - name: Send code and commit info to AI API
        run: |
          USERNAME="\${{ github.actor }}"
          COMMIT_ID="\${{ github.sha }}"
          COMMIT_MSG=$(git log -1 --pretty=%B)
          COMMITTER_EMAIL=$(git log -1 --pretty=format:'%ae')
          CODE_CONTENT=$(cat filecontent.txt)

          JSON_PAYLOAD=$(jq -n \\
            --arg code "$CODE_CONTENT" \\
            --arg user "$USERNAME" \\
            --arg commitId "$COMMIT_ID" \\
            --arg commitMsg "$COMMIT_MSG" \\
            --arg email "$COMMITTER_EMAIL" \\
            '{code: $code, username: $user, commit_id: $commitId, commit_msg: $commitMsg, email: $email}')

          curl -X POST \\
            -H "Content-Type: application/json" \\
            -d "$JSON_PAYLOAD" \\
            ${backend_url}/api/analyze`;

	const [email, setEmail] = useState("");
	const [saved, setSaved] = useState(false);

	const handleEmailSubmit = async (e) => {
		e.preventDefault();
		if (email.trim()) {
			try {
				const response = await fetch(`${backend_url}/api/email`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: email.trim() }),
				});

				if (response.ok) {
					console.log("email sent");
					setSaved(true);
					setTimeout(() => setSaved(false), 1800);
				} else {
					console.error("Failed to save email");
				}
			} catch (error) {
				console.error("Error saving email:", error);
			}
		}
	};

	return (
		<main className="min-h-screen bg-[#0d0d0d] text-gray-200 font-sans">
			<Link
				href="/"
				className="fixed top-4 left-4 w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 border border-gray-600 flex items-center justify-center transition-colors z-50"
				aria-label="Go to home"
			>
				<i className="fa-regular fa-house"></i>
			</Link>

			<div className="pt-16 text-center">
				<h1 className="text-5xl font-extrabold tracking-tight">BugFix.AI</h1>
				<p className="mt-4 text-lg text-gray-400">
					An automated AI that fixes bugs and optimizes code.
				</p>
			</div>

			<section className="max-w-5xl mx-auto my-16">
				<div className="bg-[#121212] border border-gray-700 rounded-md shadow-lg">
					<div className="px-8 py-3 text-gray-300">
						<h2 className="text-3xl font-bold mb-2">How to Use?</h2>
						<span className="font-semibold text-blue-400">Step 1: </span> Open
						Your Repository on GitHub
					</div>
					<div className="px-8 py-3 text-gray-300">
						<p>
							<span className="font-semibold text-blue-400">Step 2: </span>
							Create (or Enter) the Workflows Directory
						</p>
						<ul className="list-disc ml-6">
							<li className="text-sm">Click "Add file" → "Create new file".</li>
							<li className="text-sm">
								In the filename box, type{" "}
								<b className="text-blue-400">.github/workflows/ai-review.yml</b>{" "}
								(or any name ending in .yml).
							</li>
						</ul>
						<div className="flex mt-4 w-full justify-between items-center">
							<Image
								src="/guidingImage1.png"
								alt="Step 2 Guide 1"
								width={450}
								height={400}
								className="rounded border border-gray-700"
							/>
							<Image
								src="/guidingImage2.png"
								alt="Step 2 Guide 2"
								width={450}
								height={400}
								className="rounded border border-gray-700"
							/>
						</div>
					</div>
					<div className="px-8 py-3 text-gray-300">
						<span className="font-semibold text-blue-400">Step 3: </span> Copy
						this code and add it to a GitHub Actions workflow YAML file in your
						repository
					</div>
					<div className="relative mx-8 mb-10 bg-[#0f0f0f] border border-gray-800 rounded">
						<pre className="overflow-x-auto p-4 text-[9px] leading-relaxed font-mono text-[#62b3d3]">
							{yamlFileContent}
						</pre>
						<CopyButton content={yamlFileContent} />
					</div>
					<div className="px-8 py-4 text-gray-300">
						<p>
							<span className="font-semibold text-blue-400">Step 4: </span>
							Enter the email address where you want to receive the report.
						</p>
						<ul className="list-disc ml-6">
							<li className="text-sm">
								If left blank, the default email address from your GitHub
								account will be used.
							</li>
						</ul>
						<form
							onSubmit={handleEmailSubmit}
							className="mt-4 flex flex-col sm:flex-row gap-3"
						>
							<div className="flex justify-between items-center gap-4 w-full">
								<input
									type="email"
									required
									placeholder="you@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="flex-1 px-3 py-2 rounded bg-[#1b1b1b] border border-gray-700 text-gray-200 text-sm focus:outline-none focus:border-gray-500 max-w-1/2"
								/>
								<div>
									{saved && (
										<span className="text-green-400 text-sm self-center mr-3">
											Saved
										</span>
									)}
									<button
										type="submit"
										className="px-4 py-2 text-sm font-medium rounded bg-gray-700 hover:bg-gray-600 text-gray-100 border border-gray-600"
									>
										Save Email
									</button>
								</div>
							</div>
						</form>
					</div>
					<div className="px-8 py-4 text-gray-300 ">
						<span className="font-semibold text-blue-400">Step 5:</span> Push
						your code file to your repository. The workflow will automatically
						detect the last changed file, analyze it for bugs, and send a
						detailed report to your saved email address.
					</div>
				</div>
			</section>
		</main>
	);
}
