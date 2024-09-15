import { BlockType, DecorationType } from "react-notion";

// Block map type with an ID
export type BlockMapTypeWithId = {
    [key: string]: BlockType & {
        id: string;
    };
};

// Block value type with additional properties
export type BlockValueType = BlockType & {
    id: string;
    format?: {
        table_block_column_order?: string[];
        table_block_column_header?: {
            [key: string]: string;
        };
    };
    content?: string[];
};

export type BlockProps = {
    blockValue: BlockValueType;
    blockMap: BlockMapTypeWithId;
};

// Props for a component that deals with content IDs and their map
export type ContentProps = {
    contentIds: string[];
    blockMap: BlockMapTypeWithId;
};

// for table block specific props
export type TableBlockProps = BlockProps & {
    blockValue: BlockValueType & {
        format: {
            table_block_column_order: string[];
            table_block_column_header: {
                [key: string]: string;
            };
        };
    };
};

export type TitleBlockProps = {
    blockValue: {
        properties: {
            title: DecorationType[];
        };
    };
};

export type TableOfContentsEntry = {
    id: string;
    text: string;
    indentLevel: number;
};
