
"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export default function Reveal({
	children,
	className = "",
	delay = 0,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
}) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (!ref.current) return;
		const el = ref.current;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisible(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={`${className} ${
				visible ? "animate-fadeIn opacity-100" : "opacity-0 translate-y-4"
			}`}
			style={{ animationDelay: `${delay}ms` }}
		>
			{children}
		</div>
	);
}

