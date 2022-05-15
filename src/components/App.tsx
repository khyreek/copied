import React, { useEffect, useState } from "react";
import "../App.css";
import { Box, ListItem, ListItemText } from "@mui/material";
import Something from "./Something";
import { FixedSizeList, ListChildComponentProps } from "react-window";

export default function App(): JSX.Element {
    return (
        <div className="main">
            {/* <h1>uhhhhhhhhhhh</h1>
            <hr /> */}

            {/* <Testing /> */}
            <Something />
            {/* <VirtualizedList /> */}
        </div>
    );
}
function VirtualizedList() {
    return (
        <Box
            sx={{
                width: "100%",
                height: 400,
                maxWidth: 360,
                bgcolor: "background.paper",
            }}
        >
            <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={200}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}
function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
        <ListItem
            style={{ ...style, color: "black" }}
            key={index}
            component="div"
            disablePadding
        >
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

function Testing(): JSX.Element {
    return <div className={`stuff ${false && "test"} ye`}>asdad</div>;
}
