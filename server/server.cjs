require("dotenv").config();
const express = require("express");
const app = express();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });
const cors = require("cors");
app.use(cors());
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json

// Fetch data from a public Notion page by page ID
app.get("/pages/:pageId", async function (request, response) {
    const { pageId } = request.params;

    try {
        const pageData = await notion.blocks.children.list({ block_id: pageId });
        response.json({ message: "success!", data: pageData });
    } catch (error) {
        console.error("Error fetching Notion page data:", error);
        response.status(500).json({ message: "error", error: error.message });
    }
});

const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
