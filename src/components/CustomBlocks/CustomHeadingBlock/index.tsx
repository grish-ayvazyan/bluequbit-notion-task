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

    const isToggle = blockValue.type === "header" && blockValue.content && blockValue.content.length > 0;
    const headerLevel = blockValue.type === "header" ? 1 : 2;

    const HeadingTag = blockValue.type === "header" ? "h1" : "h2";

    if (isToggle) {
        return (
            <details className="notion-toggle">
                <summary className={`notion-header notion-header-${headerLevel}`}>
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
            <HeadingTag className={`notion-header notion-header-${headerLevel}`}>
                {renderChildText(blockValue.properties.title)}
            </HeadingTag>
        );
    }
};

export default CustomHeadingBlock;
