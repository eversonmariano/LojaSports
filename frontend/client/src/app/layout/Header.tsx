import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="relative" sx={{ mb: 4 }}>
            <Toolbar variant="dense">
                <Typography variant="h4" sx={{ width: "100%"}}>
                    Sport Way
                </Typography>
            </Toolbar>
        </AppBar>
    )
}