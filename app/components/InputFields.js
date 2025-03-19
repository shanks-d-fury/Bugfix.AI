import React, { useState } from "react";

const InputFields = ({
	result,
	setResult,
	loading,
	setLoading,
	selectedFile,
	setSelectedFile,
	inputValue,
	setInputValue,
}) => {
	const onSubmit = async () => {
		try {
			setLoading(true);
			setResult(""); // Clear previous result

			const response = await fetch("/api/bugfix", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code: selectedFile ? await readFile(selectedFile) : inputValue,
				}),
			});

			if (!response.ok) throw new Error("Network response was not ok");

			const reader = response.body.getReader();
			const decoder = new TextDecoder();

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value);
				setResult((prev) => prev + chunk); // Append each chunk to the result
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	// Add this new handler for text input
	const handleTextChange = (event) => {
		setInputValue(event.target.value);
	};
	const readFile = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = (e) => resolve(e.target.result);
			reader.onerror = (e) => reject(e);

			reader.readAsText(file);
		});
	};
	return (
		<div className="fixed bottom-8 flex flex-col items-center gap-4 w-full max-w-2xl">
			{selectedFile && (
				<p className="text-sm text-gray-400 self-start pl-2">
					File Selected : {selectedFile.name}
				</p>
			)}
			<div className="flex w-full items-center gap-2">
				<div className="flex items-center w-full rounded-full border border-gray-300 ">
					<label className="flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-l-full cursor-pointer text-black text-lg">
						<input type="file" onChange={handleFileChange} className="hidden" />
						<i className="fa-regular fa-file "></i>
					</label>
					<input
						type="text"
						value={inputValue}
						onChange={handleTextChange}
						placeholder="Ask BugFix.AI"
						className="w-full px-4 py-2 outline-none bg-transparent"
					/>
				</div>
				<button
					className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer text-black transition-colors whitespace-nowrap"
					onClick={onSubmit}
					type="submit"
				>
					<i className="fa-regular fa-paper-plane"></i>
				</button>
			</div>
		</div>
	);
};

export default InputFields;
