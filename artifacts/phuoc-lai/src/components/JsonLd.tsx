import { useEffect, useMemo } from "react";

type JsonValue = Record<string, unknown>;

export default function JsonLd({ data }: { data: JsonValue | JsonValue[] }) {
  const serialized = useMemo(() => JSON.stringify(data), [data]);

  useEffect(() => {
    const items: JsonValue[] = JSON.parse(serialized);
    const nodes: HTMLScriptElement[] = [];

    items.forEach((item, index) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-json-ld", String(index));
      el.text = JSON.stringify(item);
      document.head.appendChild(el);
      nodes.push(el);
    });

    return () => {
      nodes.forEach((node) => node.remove());
    };
  }, [serialized]);

  return null;
}
