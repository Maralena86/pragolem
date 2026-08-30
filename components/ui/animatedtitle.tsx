"use client";

export function AnimatedTitle({ text }: { text: string }) {
	return (
		<h1 className="font-gondola text-2xl sm:text-3xl md:text-3xl mt-6 text-[#4A719A] flex flex-wrap">
			{text.split("").map((letter, index) => (
				<span
					key={index}
					style={{
						animation: "letter-drop 0.5s ease-out forwards",
						animationDelay: `${index * 0.06}s`,
						opacity: 0,
					}}
				>
					{letter === " " ? "\u00A0" : letter}
				</span>
			))}
		</h1>
	);
}
