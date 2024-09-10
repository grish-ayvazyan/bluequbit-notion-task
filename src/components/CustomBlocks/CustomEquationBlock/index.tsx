import React from "react";
import { BlockMath } from "react-katex";

import { TitleBlockProps } from "@/components/CustomBlocks/types";
import "katex/dist/katex.min.css";

const CustomEquationBlock = ({ blockValue }: TitleBlockProps) => {
    const equationText = blockValue.properties.title[0][0];

    return (
        <div>
            {equationText.split("\n").map((line: string, index: number) => (
                <BlockMath key={index}>{line}</BlockMath>
            ))}
        </div>
    );
};

export default CustomEquationBlock;
