"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "./MarkdownRenderer.css";

const MarkdownRenderer = ({ content }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async (codeText) => {
		try {
			await navigator.clipboard.writeText(codeText);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<div className="prose prose-invert max-w-none prose-p:my-4 prose-pre:my-4 space-y-4">
			<ReactMarkdown
				components={{
					code({ node, inline, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "");
						const codeText = String(children).replace(/\n$/, "");

						return !inline && match ? (
							<div className="relative group">
								<button
									onClick={() => handleCopy(codeText)}
									className="absolute right-2 top-2 p-2 rounded-lg bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
								>
									{copied ? (
										<span className="text-green-300 text-sm">Copied!</span>
									) : (
										<i className="fas fa-copy text-gray-400 hover:text-white text-sm" />
									)}
								</button>
								<SyntaxHighlighter
									language={match[1]}
									PreTag="div"
									{...props}
									style={oneDark}
									className="code-slider"
								>
									{codeText}
								</SyntaxHighlighter>
							</div>
						) : (
							<code
								className="bg-gray-900 px-2 py-0 rounded text-gray-200 "
								{...props}
							>
								{children}
							</code>
						);
					},
					p({ children }) {
						return <p className="my-4">{children}</p>;
					},
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};

export default MarkdownRenderer;
