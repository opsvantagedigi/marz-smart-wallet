
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
			className={`backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/15 rounded-2xl ${className}`}
		>
			{children}
		</div>
	);
}

