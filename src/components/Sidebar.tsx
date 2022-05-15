import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

interface SidebarProps {
    id: string;
}

export default function Sidebar({ id }: SidebarProps): JSX.Element {
    const [currentPage, setValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [addingConversation, setAddingConversation] = useState(false);
    const [addingContact, setAddingContact] = useState(false);

    const currentPageDetails = {
        0: {
            pageIdentifier: "Conversations",
            currentModalSetter: setAddingConversation,
            addingModal: (
                <NewConversationModal
                    open={addingConversation}
                    onClose={() => setAddingConversation(false)}
                />
            ),
        },
        1: {
            pageIdentifier: "Contacts",
            currentModalSetter: setAddingContact,
            addingModal: (
                <NewContactModal
                    open={addingContact}
                    onClose={() => setAddingContact(false)}
                />
            ),
        },
    }[currentPage];

    return (
        <div className="sidebar">
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                }}
                className="sidebar-tabs-box"
            >
                <Tabs
                    value={currentPage}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Conversations" {...a11yProps(0)} />
                    <Tab label="Contacts" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <div className="sidebar-content">
                <TabPanel value={currentPage} index={0}>
                    <Conversations />
                </TabPanel>
                <TabPanel value={currentPage} index={1}>
                    <Contacts />
                </TabPanel>
                <footer>
                    <div style={{ borderTop: ".1vh solid black" }}>
                        Your id: <span style={{ color: "black" }}>{id}</span>
                    </div>
                    <Button
                        onClick={() =>
                            currentPageDetails?.currentModalSetter(true)
                        }
                        variant="contained"
                    >
                        New {currentPageDetails!.pageIdentifier}
                    </Button>
                </footer>
            </div>

            {/* modals */}
            {currentPageDetails!.addingModal}
        </div>
    );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
