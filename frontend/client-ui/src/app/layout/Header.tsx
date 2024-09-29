import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material';
  import { ShoppingCart } from '@mui/icons-material';
  import { Link, NavLink } from 'react-router-dom';
  import { useAppSelector } from '../store/configureStores';
  import SignedInMenu from './SignedInMenu';
  
  interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
  }
  
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Loja', path: '/store' },
    { title: 'Contato', path: '/contato' },
  ];
  
  const accountLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Cadastrar', path: '/cadastrar' },
  ];
  
  const navStyles = {
    color: 'inherit',
    typography: 'h6',
    textDecoration: 'none',
    '&:hover': {
      color: 'secondary.main',
    },
    '&:active': {
      color: 'text.secondary',
    },
  };
  
  const Header = ({ darkMode, handleThemeChange }: Props) => {
    const { cart } = useAppSelector((state) => state.cart);
    const { user } = useAppSelector((state) => state.account);
  
    const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  
    return (
      <AppBar position="relative" sx={{ mb: 4 }}>
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box display="flex" alignItems="center">
            <Typography variant="h4" sx={{ width: '100%' }}>
              Sport Way
            </Typography>
            <Switch
              checked={darkMode}
              onChange={handleThemeChange}
              sx={{
                '& .MuiSwitch-switchBase': {
                  color: '#ffff00',
                },
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#ffff00',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#ffff00',
                },
              }}
            />
          </Box>
  
          <List sx={{ display: 'flex' }}>
            {navLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title}
              </ListItem>
            ))}
          </List>
  
          <Box display="flex" alignItems="center">
            <IconButton component={Link} to="/cart" size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {user ? (
              <SignedInMenu />
            ) : (
              <List sx={{ display: 'flex' }}>
                {accountLinks.map(({ title, path }) => (
                  <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                    {title}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Header;