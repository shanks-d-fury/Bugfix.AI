import Image from "next/image";

export default function Home() {
	return (
		<div className="grid grid-cols-2 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<div className="flex justify-center items-center">
				<Image
					src="/loadingImage.png"
					alt="BugFix AI Logo"
					width={300}
					height={300}
					priority
				/>
			</div>

			<main className="flex flex-col gap-[32px] items-center sm:items-start">
				<div className="flex flex-col justify-center relative">
					<h1 className="text-4xl font-bold text-cyan-100 rubik-text">
						BUGFIX.AI
					</h1>
					<h3 className="text-1xl font-bold text-cyan-100 rubik-text">
						BugFix is an intelligent and automated debugging tool that
						automatically detects, fixes, and executes code. It scans for syntax
						errors, logical bugs, and best practice violations, then applies
						AI-driven corrections to enhance code quality. BugFix supports
						multiple programming languages and ensures smooth execution, making
						debugging faster and more efficient.
					</h3>
				</div>
				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<a
						className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] text-cyan-100 rubik-text"
						href="/fix"
						rel="noopener noreferrer"
					>
						<Image
							className="mr-2 dark:invert"
							src="/favicon.ico"
							alt="Vercel logomark"
							width={20}
							height={20}
						/>
						New chat
					</a>
					<a
						className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] text-cyan-100 rubik-text"
						href="/auto"
						rel="noopener noreferrer"
					>
						Get E-mail
					</a>
				</div>
			</main>
		</div>
	);
}
