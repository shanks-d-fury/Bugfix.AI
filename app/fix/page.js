"use client";
import React, { useState } from "react";
import "./page.css";
import MarkdownRenderer from "../components/MarkdownRenderer";
import InputFields from "../components/InputFields";

const Page = () => {
	const [result, setResult] = useState(""); // Add this state
	const [loading, setLoading] = useState(false); // Add loading state
	const [selectedFile, setSelectedFile] = useState(null);
	const [inputValue, setInputValue] = useState("");
	return (
		<>
			<div className="flex justify-center relative top-6">
				<h1 className="text-4xl font-bold text-cyan-100 rubik-text">
					BUGFIX.AI
				</h1>
			</div>
			<div className="grid grid-rows-[1px_1fr_20px] items-center justify-items-center min-h-screen pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] text-sm">
				<div className="scroll-div flex-1 overflow-y-auto w-full max-w-2xl bg-gray rounded-lg shadow-sm border-0.5 border-gray-200 text-black mb-8">
					<h3 className="text-sm font-semibold mb-1">
						{result ? (
							<div className="pt-0 p-2 -mt-4 rounded-lg text-gray-300 font-semibold">
								<MarkdownRenderer content={result} />
							</div>
						) : (
							<div className="flex items-center justify-center h-full">
								<p className="text-2xl text-gray-300 font-medium">
									What can I help you with the coding?
								</p>
							</div>
						)}
					</h3>
				</div>
				<div className="flex flex-col items-center gap-8 mt-auto row-start-1 w-full max-w-2xl bg-gray-950 ">
					<InputFields
						result={result}
						setResult={setResult}
						loading={loading}
						setLoading={setLoading}
						selectedFile={selectedFile}
						setSelectedFile={setSelectedFile}
						inputValue={inputValue}
						setInputValue={setInputValue}
					/>
				</div>
			</div>
		</>
	);
};

export default Page;
