import { useEffect } from "react";

type JsonLdProps = {
  id: string;
  data: object | object[];
};

export default function JsonLd({ id, data }: JsonLdProps) {
  const payload = JSON.stringify(data);

  useEffect(() => {
    const scriptId = `jsonld-${id}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = payload;

    return () => {
      script?.remove();
    };
  }, [id, payload]);

  return null;
}
