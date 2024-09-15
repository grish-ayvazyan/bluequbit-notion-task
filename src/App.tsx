import { BlockMapType, NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";

import {
    CustomEquationBlock,
    CustomHeadingBlock,
    CustomTableBlock,
    CustomTableOfContents,
} from "@/components/CustomBlocks";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import useFetch from "@/hooks/useFetch";
// Import the language you need
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";

import "./App.css";

const BASE_URL = "https://notion-api.splitbee.io/v1/page";

const pageId = import.meta.env.VITE_NOTION_PAGE_ID;

const fullUrl = `${BASE_URL}/${pageId}`;

const customBlockComponents = {
    equation: CustomEquationBlock,
    header: CustomHeadingBlock,
    sub_header: CustomHeadingBlock,
    sub_sub_header: CustomHeadingBlock,
    table: CustomTableBlock,
    table_of_contents: CustomTableOfContents,
};

function App() {
    const { data, isLoading } = useFetch<BlockMapType>(fullUrl);

    if (isLoading) return <Loading />;

    if (!data) return <NoData />;

    // TODO: Resolve the TypeScript issue regarding the customBlockComponents prop
    // @ts-expect-error - The NotionRenderer does not support toggling heading components and  customBlockComponents prop does not include a 'header' key
    return <NotionRenderer customBlockComponents={customBlockComponents} blockMap={data} fullPage />;
}

export default App;
