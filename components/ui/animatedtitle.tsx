"use client";

export function AnimatedTitle({ text }: { text: string }) {
	return (
		<h1 className="font-quintessential text-5xl tracking-[0.05em] mt-2 text-[#4A719A] flex">
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
