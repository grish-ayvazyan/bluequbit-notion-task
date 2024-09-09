import { BlockMapType, NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";

import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import useFetch from "@/hooks/useFetch";

import "./App.css";

const BASE_URL = "https://notion-api.splitbee.io/v1/page";

const pageId = import.meta.env.VITE_NOTION_PAGE_ID;

const fullUrl = `${BASE_URL}/${pageId}`;

function App() {
    const { data, isLoading } = useFetch<BlockMapType>(fullUrl);

    if (isLoading) return <Loading />;

    if (!data) return <NoData />;

    return <NotionRenderer blockMap={data} fullPage />;
}

export default App;
