import React from "react";
import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";

const backend_url = "https://bugfix-backend-cl57.vercel.app";

const InputFields = ({
	result,
	setResult,
	loading,
	setLoading,
	selectedFile,
	setSelectedFile,
	inputValue,
	setInputValue,
	setHasSubmitted,
}) => {
	const fileInputRef = React.useRef(null);

	const onSubmit = async () => {
		try {
			setLoading(true);
			setResult("");

			const response = await fetch(`${backend_url}/api/bugfix`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code: selectedFile
						? `${await readFile(selectedFile)}\n\nQuestion: ${inputValue}`
						: inputValue,
				}),
			}).catch((err) => {
				// Network/CORS errors
				throw new Error(
					`Network error: ${err.message}. Check if the server allows CORS.`
				);
			});

			if (!response) return;

			if (response.status === 204 || response.status === 200) {
				if (!response.body) {
					setResult("Request completed successfully.");
					return;
				}
			}

			if (!response.ok) {
				throw new Error(`Server error: ${response.status}`);
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder();

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				setResult((prev) => prev + decoder.decode(value));
			}
		} catch (error) {
			console.error("Error:", error);
			setResult(`Error: ${error.message}`);
		} finally {
			setLoading(false);
			setInputValue("");
			setSelectedFile(null);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
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

	const handleKeyPress = (event) => {
		if (event.key === "Enter" && !loading && inputValue.trim()) {
			onSubmit();
		}
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
		<div className="fixed bottom-8 flex flex-col items-center gap-1 w-full max-w-2xl">
			{selectedFile && (
				<p className="text-sm text-gray-400 self-start pl-2">
					File Selected : {selectedFile.name}
				</p>
			)}
			<div className="flex w-full items-center gap-2">
				<div className="flex items-center w-full rounded-full border border-gray-300 ">
					<label className="flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-white-500  rounded-l-full cursor-pointer text-black text-lg">
						<input
							ref={fileInputRef}
							type="file"
							onChange={handleFileChange}
							className="hidden"
						/>
						<i className="fa-regular fa-file"></i>
					</label>
					<input
						type="text"
						value={inputValue}
						onChange={handleTextChange}
						onKeyDown={handleKeyPress}
						disabled={loading}
						placeholder="Describe your bug or paste your code here..."
						className="w-full px-4 py-2 outline-none bg-transparent"
					/>
				</div>
				<button
					className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer text-black transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={onSubmit}
					type="submit"
					disabled={loading}
				>
					{loading ? (
						<LineSpinner size="15" stroke="1" speed="1" color="black" />
					) : (
						<i className="fa-regular fa-paper-plane"></i>
					)}
				</button>
			</div>
		</div>
	);
};

export default InputFields;
