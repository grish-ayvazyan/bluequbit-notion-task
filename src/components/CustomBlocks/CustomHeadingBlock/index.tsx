import React from "react";
import { DecorationType } from "react-notion";

import ContentRenderer from "@/components/CustomBlocks/CustomHeadingBlock/ContentRenderer";
import { BlockProps } from "@/components/CustomBlocks/types";

import "./style.css";

const renderChildText = (textArray: DecorationType[]) => {
    return textArray.flat().join(" ");
};

const CustomHeadingBlock = ({ blockValue: block, blockMap }: BlockProps) => {
    const blockValue = blockMap[block.id]?.value || {};

    // Determine header level and type
    const headerLevel =
        blockValue.type === "header"
            ? 1
            : blockValue.type === "sub_header"
              ? 2
              : blockValue.type === "sub_sub_header"
                ? 3
                : 0; // Default level if not recognized

    const HeadingTag = headerLevel === 1 ? "h1" : headerLevel === 2 ? "h2" : headerLevel === 3 ? "h3" : "div";

    const isToggle = blockValue.type === "header" && blockValue.content && blockValue.content.length > 0;

    const id = block.id;

    if (isToggle) {
        return (
            <details className="notion-toggle">
                <summary className={`notion-header notion-header-${headerLevel}`} id={id}>
                    {blockValue.properties && renderChildText(blockValue.properties.title)}
                </summary>
                <div>
                    {blockValue.content &&
                        blockValue.content.map((contentId: string) => {
                            const contentBlock = blockMap[contentId]?.value;
                            return contentBlock ? (
                                <ContentRenderer key={contentId} contentIds={[contentId]} blockMap={blockMap} />
                            ) : null;
                        })}
                </div>
            </details>
        );
    } else {
        return (
            <HeadingTag className={`notion-header notion-header-${headerLevel}`} id={id}>
                {renderChildText(blockValue.properties.title)}
            </HeadingTag>
        );
    }
};

export default CustomHeadingBlock;
