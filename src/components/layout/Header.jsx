import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  Paper,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications,
  Mail,
  Person,
  Settings,
  Logout,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slice/RegisterSlice';

const Header = ({ handleDrawerToggle, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.users);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());             // Redux logout
    navigate('/login');             // redirect
    handleMenuClose();
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/candidates/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue('');
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', color: 'text.primary' }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        {isMobile && (
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap sx={{ mr: 3 }}>
          Dashboard
        </Typography>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'center', maxWidth: 500 }}>
          <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: 400,
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              boxShadow: 'none',
              '&:hover': { border: '1px solid #cbd5e1' },
              '&:focus-within': { border: '1px solid #6366f1', backgroundColor: 'white' },
            }}
          >
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search candidates, jobs..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Paper>
        </Box>

        {/* Right Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
          <IconButton color="inherit" sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={() => navigate('/candidates/search')}>
            <SearchIcon />
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={() => navigate('/communication')}>
            <Badge badgeContent={5} color="error">
              <Mail />
            </Badge>
          </IconButton>

          {/* Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
            <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0.5 }}>
              <Avatar
                src={user?.photo || ''}
                sx={{ width: 40, height: 40, backgroundColor: 'primary.main', fontWeight: 'bold' }}
              >
                {!user?.photo && user?.fullName?.charAt(0)?.toUpperCase()}
              </Avatar>
            </IconButton>
            <Box sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" fontWeight="600">{user?.fullName}</Typography>
              <Typography variant="caption" color="text.secondary">{user?.role}</Typography>
            </Box>
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{ elevation: 3, sx: { mt: 1.5, minWidth: 200 } }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e2e8f0' }}>
              <Typography variant="subtitle2" fontWeight="600">{user?.fullName}</Typography>
              <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
            </Box>

            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon><Person fontSize="small" /></ListItemIcon>
              Profile
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
              Settings
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <ListItemIcon sx={{ color: 'error.main' }}><Logout fontSize="small" /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
