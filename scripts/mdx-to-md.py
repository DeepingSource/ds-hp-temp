#!/usr/bin/env python3
"""MDX → 순수 Markdown 변환기.

content/articles/**/*.mdx → content/articles-md/**/*.md
- YAML frontmatter 유지
- <Stat />, <StatGroup>, <Tip>, <Checklist>, <Quote>, <Callout> → Markdown
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "content" / "articles"
DST = ROOT / "content" / "articles-md"


def parse_attrs(attr_str: str) -> dict[str, str]:
    """`label="x" value="y"` → {"label": "x", "value": "y"}."""
    return dict(re.findall(r'(\w+)="([^"]*)"', attr_str))


def convert_stat(m: re.Match) -> str:
    a = parse_attrs(m.group(1))
    label = a.get("label", "")
    value = a.get("value", "")
    change = a.get("change")
    line = f"- **{label}**: {value}"
    if change:
        line += f" _({change})_"
    return line


def convert_statgroup(m: re.Match) -> str:
    inner = m.group(1)
    # 내부 <Stat /> 는 이후 패스에서 변환되지만, 여기서 먼저 처리해 빈 줄 보장
    return "\n" + inner.strip() + "\n"


def convert_tip(m: re.Match) -> str:
    attrs = parse_attrs(m.group(1))
    title = attrs.get("title", "팁")
    body = m.group(2).strip()
    body_quoted = "\n".join(f"> {line}" if line else ">" for line in body.splitlines())
    return f"> 💡 **{title}**\n>\n{body_quoted}"


def convert_checklist(m: re.Match) -> str:
    body = m.group(1).strip()
    out_lines = []
    for line in body.splitlines():
        stripped = line.strip()
        if stripped.startswith("- "):
            out_lines.append(f"- [ ] {stripped[2:].strip()}")
        elif stripped:
            out_lines.append(stripped)
    return "\n".join(out_lines)


def convert_quote(m: re.Match) -> str:
    attrs = parse_attrs(m.group(1))
    author = attrs.get("author", "")
    body = m.group(2).strip()
    quoted = "\n".join(f"> {line}" for line in body.splitlines())
    if author:
        quoted += f"\n>\n> — {author}"
    return quoted


CALLOUT_PREFIX = {
    "info": "ℹ️ **참고**",
    "warning": "⚠️ **주의**",
    "success": "✅ **포인트**",
}


def convert_callout(m: re.Match) -> str:
    attrs = parse_attrs(m.group(1) or "")
    variant = attrs.get("variant", "info")
    prefix = CALLOUT_PREFIX.get(variant, "ℹ️ **참고**")
    body = m.group(2).strip()
    quoted = "\n".join(f"> {line}" for line in body.splitlines())
    return f"> {prefix}\n>\n{quoted}"


def convert(text: str) -> str:
    # StatGroup 을 먼저 풀어두고 (태그 제거), 내부 Stat 는 다음 단계에서 변환
    text = re.sub(
        r"<StatGroup>(.*?)</StatGroup>",
        convert_statgroup,
        text,
        flags=re.DOTALL,
    )
    # Self-closing Stat (값에 "/" 포함 허용)
    text = re.sub(r"<Stat\s+([^>]*?)\s*/>", convert_stat, text)
    # Tip
    text = re.sub(
        r"<Tip\s*([^>]*)>(.*?)</Tip>",
        convert_tip,
        text,
        flags=re.DOTALL,
    )
    # Checklist
    text = re.sub(
        r"<Checklist>(.*?)</Checklist>",
        convert_checklist,
        text,
        flags=re.DOTALL,
    )
    # Quote
    text = re.sub(
        r"<Quote\s*([^>]*)>(.*?)</Quote>",
        convert_quote,
        text,
        flags=re.DOTALL,
    )
    # Callout (attrs optional)
    text = re.sub(
        r"<Callout\s*([^>]*?)>(.*?)</Callout>",
        convert_callout,
        text,
        flags=re.DOTALL,
    )
    # 연속 3개 이상 빈 줄 → 2개로
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text


def main() -> int:
    if not SRC.exists():
        print(f"source not found: {SRC}", file=sys.stderr)
        return 1

    mdx_files = sorted(SRC.rglob("*.mdx"))
    if not mdx_files:
        print("no mdx files", file=sys.stderr)
        return 1

    per_category: dict[str, int] = {}
    unconverted: list[tuple[str, str]] = []

    for mdx in mdx_files:
        rel = mdx.relative_to(SRC)
        category = rel.parts[0]
        out = DST / rel.with_suffix(".md")
        out.parent.mkdir(parents=True, exist_ok=True)

        raw = mdx.read_text(encoding="utf-8")
        converted = convert(raw)
        out.write_text(converted, encoding="utf-8")

        per_category[category] = per_category.get(category, 0) + 1

        # 남아있는 JSX 태그가 있으면 리포트용으로 기록
        leftover = re.findall(r"<[A-Z][A-Za-z]*[^>]*>", converted)
        if leftover:
            unconverted.append((str(rel), ", ".join(sorted(set(leftover))[:5])))

    total = sum(per_category.values())
    print(f"✔ 변환 완료: {total}개")
    for cat, n in sorted(per_category.items()):
        print(f"  - {cat}: {n}")
    if unconverted:
        print(f"\n⚠ 잔여 JSX 태그 발견: {len(unconverted)}개 파일")
        for path, tags in unconverted[:10]:
            print(f"  - {path}: {tags}")
    else:
        print("✓ 모든 JSX 태그가 Markdown으로 변환되었습니다.")
    print(f"\n출력 경로: {DST}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
