
export default function SectionHeader({
	title,
	subtitle,
	align = "center",
}: {
	title: string;
	subtitle?: string;
	align?: "center" | "left";
}) {
	return (
		<div
			className={`mb-10 sm:mb-14 ${
				align === "center" ? "text-center" : "text-left"
			}`}
		>
			<h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron text-white font-bold mb-3">{title}</h2>
			{subtitle && (
				<p className={`text-sm sm:text-base text-white/70 max-w-2xl ${align === 'center' ? 'mx-auto' : ''} font-inter`}>
					{subtitle}
				</p>
			)}
		</div>
	);
}

