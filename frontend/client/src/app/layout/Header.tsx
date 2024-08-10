import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean;
    handlerThemeChange: () => void;
}
export default function Header({ darkMode, handlerThemeChange }: Props) {
    return (
        <AppBar position="relative" sx={{ mb: 4 }}>
            <Toolbar variant="dense">
                <Typography variant="h4" sx={{ width: "100%" }}>
                    Sport Way
                </Typography>
                {/* Change button color */}
                
                    <Switch checked={darkMode} onChange={handlerThemeChange}
                        sx={{
                            "& .MuiSwitch-switchBase": {
                                color: "#ffff00",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#ffff00",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                backgroundColor: "#ffff00",
                            },
                        }}
                    />
                

            </Toolbar>
        </AppBar>
    )
}