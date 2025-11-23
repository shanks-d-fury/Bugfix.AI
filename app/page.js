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
				<div className="flex justify-center relative">
					<h1 className="text-4xl font-bold text-gray-400 rubik-text">
						BUGFIX.AI
					</h1>
				</div>
				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<a
						className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
						href="/fix"
						rel="noopener noreferrer"
					>
						<Image
							className="dark:invert"
							src="/vercel.svg"
							alt="Vercel logomark"
							width={20}
							height={20}
						/>
						New chat
					</a>
					<a
						className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
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
