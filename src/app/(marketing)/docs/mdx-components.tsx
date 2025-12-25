import React from "react";

type HProps<T extends keyof JSX.IntrinsicElements> = React.ComponentPropsWithoutRef<T>;

export const mdxComponents = {
  h1: (props: HProps<'h1'>) => (
    <h1
      {...props}
      className="font-orbitron text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent"
    />
  ),
  h2: (props: HProps<'h2'>) => (
    <h2
      {...props}
      className="font-orbitron text-2xl md:text-3xl font-semibold mt-8 mb-4 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent"
    />
  ),
  h3: (props: HProps<'h3'>) => (
    <h3
      {...props}
      className="font-orbitron text-xl md:text-2xl font-semibold mt-6 mb-3 text-green-300"
    />
  ),
  ul: (props: HProps<'ul'>) => <ul {...props} className="list-disc ml-6 mb-4 text-white/90" />,
  ol: (props: HProps<'ol'>) => <ol {...props} className="list-decimal ml-6 mb-4 text-white/90" />,
  li: (props: HProps<'li'>) => <li {...props} className="mb-1" />,
  code: (props: HProps<'code'>) => (
    <code
      {...props}
      className="bg-black/70 text-green-300 px-2 py-1 rounded-md font-mono text-sm"
    />
  ),
  pre: (props: HProps<'pre'>) => (
    <pre
      {...props}
      className="bg-gradient-to-br from-[#0a1837] to-[#0e2e2e] border border-green-400/20 rounded-xl p-4 my-4 overflow-x-auto text-green-200 font-mono text-sm shadow-lg"
    />
  ),
  table: (props: HProps<'table'>) => (
    <div className="overflow-x-auto my-4">
      <table {...props} className="w-full border-collapse text-white/90" />
    </div>
  ),
  th: (props: HProps<'th'>) => (
    <th
      {...props}
      className="bg-green-400/10 text-green-200 px-3 py-2 border-b border-green-400/20 text-left"
    />
  ),
  td: (props: HProps<'td'>) => (
    <td
      {...props}
      className="px-3 py-2 border-b border-white/10"
    />
  ),
  blockquote: (props: HProps<'blockquote'>) => (
    <blockquote
      {...props}
      className="border-l-4 border-green-400 pl-4 italic text-green-200 my-4"
    />
  ),
  // Callout
  Callout: ({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "success" | "error" }) => {
    let color = "from-green-400 to-yellow-400 text-black";
    if (type === "warning") color = "from-yellow-400 to-orange-400 text-black";
    if (type === "success") color = "from-green-400 to-lime-400 text-black";
    if (type === "error") color = "from-red-400 to-pink-400 text-black";
    return (
      <div className={`my-4 p-4 rounded-xl bg-gradient-to-r ${color} font-semibold shadow-lg`}>
        {children}
      </div>
    );
  },
};
