
import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

const navLinks = [
    {title: 'Home', path: '/'},
    {title: 'Produtos', path: '/store'},
    {title: 'Contato', path: '/contact'}
]

const accountLinksLinks = [
    {title: 'Login', path: '/login'},
    {title: 'Registro', path: '/register'}
]

const navStyles = {
    color: "inherit",
    Typography:"h6",
    textDecoration:"none",
    "&:hover": {
        color:"seconday.main"
        },
    "&:active":{
        color:"text.secondary"
    }
};
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