import React from "react";
import { BlockMapType } from "react-notion";

import { TableOfContentsEntry } from "@/components/CustomBlocks/types";

import "./style.css";

const indentLevels = {
    header: 0,
    sub_header: 1,
    sub_sub_header: 2,
};

const getTableOfContents = (blockMap: BlockMapType): TableOfContentsEntry[] => {
    const toc: TableOfContentsEntry[] = [];
    const processedBlocks = new Set<string>();

    const traverseBlocks = (blockId: string, indentLevel = 0) => {
        if (processedBlocks.has(blockId)) return; // Skip if already processed

        const block = blockMap[blockId]?.value;
        if (block) {
            const { type, properties } = block;

            if (type === "header" || type === "sub_header" || type === "sub_sub_header") {
                toc.push({
                    id: blockId,
                    text: (properties?.title || []).join(" "),
                    indentLevel: indentLevels[type as keyof typeof indentLevels],
                });

                processedBlocks.add(blockId);
            }

            // Recursively traverse child blocks if they exist
            if (block.content) {
                block.content.forEach((childId: string) => traverseBlocks(childId, indentLevel + 1));
            }
        }
    };

    Object.keys(blockMap).forEach((blockId) => traverseBlocks(blockId));

    return toc;
};

const CustomTableOfContents: React.FC<{ blockMap: BlockMapType }> = ({ blockMap }) => {
    const toc = getTableOfContents(blockMap);

    if (toc.length === 0) return null; // No TOC, so return nothing

    return (
        <div className="notion-table-of-contents">
            {toc.map((tocItem) => (
                <a
                    key={tocItem.id}
                    href={`#${tocItem.id}`}
                    className="notion-table-of-contents-item"
                    data-indent-level={tocItem.indentLevel}
                >
                    <span className="notion-table-of-contents-item-body">{tocItem.text}</span>
                </a>
            ))}
        </div>
    );
};

export default CustomTableOfContents;
