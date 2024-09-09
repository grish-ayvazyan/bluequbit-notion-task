import React from "react";

import NoDataImage from "@/assets/no-data-image.webp";

import "./style.css";

const NoData = () => {
    return (
        <div className="content-center">
            <img src={NoDataImage} alt="No data" />
            <h1 className="no-data-text">No data available</h1>
        </div>
    );
};

export default NoData;
