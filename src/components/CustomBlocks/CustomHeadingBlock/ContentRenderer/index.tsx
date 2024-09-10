import React from "react";
import { NotionRenderer } from "react-notion";

import { BlockMapTypeWithId, ContentProps } from "@/components/CustomBlocks/types";

const createBlockMap = (contentIds: string[], blockMap: BlockMapTypeWithId) => {
    const contentBlocks = contentIds.map((id) => blockMap[id]).filter(Boolean);
    return contentBlocks.reduce((acc, block) => {
        acc[block.id] = block;
        return acc;
    }, {} as BlockMapTypeWithId);
};

const ContentRenderer = ({ contentIds, blockMap }: ContentProps) => {
    const contentBlockMap = createBlockMap(contentIds, blockMap);

    return (
        <div className="notion-content">
            <NotionRenderer blockMap={contentBlockMap} fullPage />
        </div>
    );
};

export default ContentRenderer;
