import React from "react";

import { BlockMapTypeWithId, BlockValueType, TableBlockProps } from "@/components/CustomBlocks/types";

import "./styles.css";

const getTableData = (block: BlockValueType, recordMap: BlockMapTypeWithId) => {
    const columnOrder = block?.format?.table_block_column_order || [];
    const columnHeaders = block?.format?.table_block_column_header;
    const content = block.content || [];
    // Extract rows
    const rows = content.map((rowId: string) => {
        const rowBlock = recordMap[rowId]?.value;
        return rowBlock?.properties || {};
    });

    return { columnOrder, columnHeaders, rows };
};

const CustomTableBlock = ({ blockValue, blockMap }: TableBlockProps) => {
    const { columnOrder, rows } = getTableData(blockValue, blockMap);
    return (
        <table className="notion-table">
            <tbody>
                {rows.map((row: Record<string, string>, rowIndex: number) => (
                    <tr key={rowIndex}>
                        {columnOrder.map((colId: string) => (
                            <td key={colId}>{row[colId] || ""}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomTableBlock;
