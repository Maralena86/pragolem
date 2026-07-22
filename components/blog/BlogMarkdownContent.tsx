import type { ComponentProps, ReactElement } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

type BlogMarkdownContentProps = {
  content: string;
};

/**
 * Converts markdown image nodes into `next/image` so blog content keeps Next.js image optimization,
 * avoids raw `<img>` tags, and preserves a stable aspect ratio when author content omits dimensions.
 * The function returns `null` when the source URL is missing to prevent rendering invalid markup.
 */
function MarkdownImage({
  src,
  alt,
  width,
  height,
}: ComponentProps<"img">): ReactElement | null {
  if (typeof src !== "string" || src.length === 0) {
    return null;
  }

  const parsedWidth =
    typeof width === "number"
      ? width
      : typeof width === "string" && Number.parseInt(width, 10) > 0
        ? Number.parseInt(width, 10)
        : 1200;
  const parsedHeight =
    typeof height === "number"
      ? height
      : typeof height === "string" && Number.parseInt(height, 10) > 0
        ? Number.parseInt(height, 10)
        : 675;

  return (
    <span className="relative mt-6 block overflow-hidden rounded-xl border">
      <Image
        src={src}
        alt={alt ?? ""}
        width={parsedWidth}
        height={parsedHeight}
        className="h-auto w-full object-cover"
      />
    </span>
  );
}

/**
 * Downgrades markdown top-level `h1` nodes to `h2` so article pages keep a single document-level
 * `<h1>` in the page header while still preserving clear section structure in the markdown body.
 */
function MarkdownHeadingOne({ children }: ComponentProps<"h1">): ReactElement {
  return <h2>{children}</h2>;
}

/**
 * Renders markdown post content with semantic HTML and consistent article typography.
 * This component is server-rendered, keeps the markdown source as the single content format,
 * and applies utility-based styling so headings, lists, and links remain readable without
 * requiring additional typography plugins or theme changes.
 */
export function BlogMarkdownContent({ content }: BlogMarkdownContentProps): ReactElement {
  return (
    <article className="text-base leading-7 text-foreground [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_li]:mt-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
      <ReactMarkdown components={{ h1: MarkdownHeadingOne, img: MarkdownImage }}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
