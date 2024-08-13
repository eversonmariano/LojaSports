
import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Produtos', path: '/produtos' },
    { title: 'Contato', path: '/contato' }
]

const accountLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Cadastrar', path: '/cadastrar' }
]

const navStyles = {
    color: "inherit",
    Typography: "h6",
    textDecoration: "none",
    "&:hover": {
        color: "seconday.main"
    },
    "&:active": {
        color: "text.secondary"
    }
};
interface Props {
    darkMode: boolean;
    handlerThemeChange: () => void;
}
export default function Header({ darkMode, handlerThemeChange }: Props) {
    return (
        <AppBar position="relative" sx={{ mb: 4 }}>
            <Toolbar variant="dense" sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Box display='flex' alignItems='center'>
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

                    /></Box>

                <List sx={{ display: 'flex' }}>
                    {navLinks.map(({ title, path }) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                            {title}
                        </ListItem>
                    ))}
                </List>
                <Box display='flex' alignItems='center'>
                    <IconButton size='large' edge='start' color='inherit' sx={{ mr: 2}}>
                        <Badge badgeContent="0" color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {accountLinks.map(({ title, path }) => (
                            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                                {title}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}