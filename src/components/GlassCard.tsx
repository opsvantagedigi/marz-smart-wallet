
import { ReactNode } from "react";

export default function GlassCard({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg ${className}`}
		>
			{children}
		</div>
	);
}

