import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Avatar,
  Collapse,
} from '@mui/material';
import {
  Dashboard,
  Work,
  People,
  Chat,
  CalendarToday,
  Person,
  Add,
  Search,
  Bookmark,
  ExpandLess,
  ExpandMore,
  List as ListIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { ROUTES } from '../../routes';
import {loginUser} from '../../slice/RegisterSlice.js';
import { useSelector,useDispatch } from 'react-redux';

const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
//  const { user } = useAuth();
  const [jobsOpen, setJobsOpen] = React.useState(false);
  const [candidatesOpen, setCandidatesOpen] = React.useState(false);
  const {user}=useSelector((state)=>state.users);
  const dispatch = useDispatch();
 
  const menuItems = [
    {
      title: 'Dashboard',
      path: ROUTES.DASHBOARD,
      icon: <Dashboard />,
    },
    {
      title: 'Job Management',
      icon: <Work />,
      children: [
        { title: 'All Jobs', path: ROUTES.JOBS, icon: <ListIcon /> },
        { title: 'Post New Job', path: ROUTES.POST_JOB, icon: <Add /> },
      ],
    },
    {
      title: 'Candidates',
      icon: <People />,
      children: [
        { title: 'All Applicants', path: ROUTES.CANDIDATES, icon: <People /> },
        { title: 'Search Candidates', path: ROUTES.SEARCH_CANDIDATES, icon: <Search /> },
        { title: 'Bookmarked', path: ROUTES.BOOKMARKED_CANDIDATES, icon: <Bookmark /> },
      ],
    },
    {
      title: 'Communication',
      path: ROUTES.COMMUNICATION,
      icon: <Chat />,
    },
    {
      title: 'Interviews',
      path: ROUTES.INTERVIEWS,
      icon: <CalendarToday />,
    },
    {
      title: 'Profile',
      path: ROUTES.PROFILE,
      icon: <Person />,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const handleJobsClick = () => {
    setJobsOpen(!jobsOpen);
  };

  const handleCandidatesClick = () => {
    setCandidatesOpen(!candidatesOpen);
  };

  const isPathActive = (path) => {
    return location.pathname === path;
  };

  const isParentActive = (children) => {
    return children?.some(child => location.pathname === child.path);
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Box sx={{ p: 3, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Work sx={{ fontSize: 32, color: 'white', mr: 1 }} />
          <Typography variant="h5" fontWeight="bold" color="white">
            SmartJob
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          Recruiter Dashboard
        </Typography>
      </Box>

      {/* User Profile Section */}
      <Box sx={{ p: 3, backgroundColor: '#f8fafc' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
           src={user?.photo || ""}
           sx={{
           width: 48,
           height: 48,
           mr: 2,
           backgroundColor: 'primary.main',
           fontSize: '1.2rem',
           fontWeight: 'bold'
           }}
           >
           {!user?.photo && user?.fullName?.charAt(0)?.toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="subtitle1" fontWeight="600">
              {user?.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.role}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <List sx={{ py: 1 }}>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.children ? (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={item.title === 'Job Management' ? handleJobsClick : handleCandidatesClick}
                      sx={{
                        py: 1.5,
                        px: 3,
                        backgroundColor: isParentActive(item.children) ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                        borderRight: isParentActive(item.children) ? '3px solid #6366f1' : 'none',
                        '&:hover': {
                          backgroundColor: 'rgba(99, 102, 241, 0.04)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: isParentActive(item.children) ? 'primary.main' : 'text.secondary' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          fontWeight: isParentActive(item.children) ? 600 : 400,
                          color: isParentActive(item.children) ? 'primary.main' : 'text.primary',
                        }}
                      />
                      {item.title === 'Job Management' ?
                        (jobsOpen ? <ExpandLess /> : <ExpandMore />) :
                        (candidatesOpen ? <ExpandLess /> : <ExpandMore />)
                      }
                    </ListItemButton>
                  </ListItem>
                  <Collapse
                    in={item.title === 'Job Management' ? jobsOpen : candidatesOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children.map((child, childIndex) => (
                        <ListItem key={childIndex} disablePadding>
                          <ListItemButton
                            onClick={() => handleNavigation(child.path)}
                            sx={{
                              py: 1,
                              pl: 5,
                              pr: 3,
                              backgroundColor: isPathActive(child.path) ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                              borderRight: isPathActive(child.path) ? '3px solid #6366f1' : 'none',
                              '&:hover': {
                                backgroundColor: 'rgba(99, 102, 241, 0.04)',
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                color: isPathActive(child.path) ? 'primary.main' : 'text.secondary',
                                minWidth: 36
                              }}
                            >
                              {child.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={child.title}
                              primaryTypographyProps={{
                                fontWeight: isPathActive(child.path) ? 600 : 400,
                                color: isPathActive(child.path) ? 'primary.main' : 'text.primary',
                                fontSize: '0.875rem'
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      py: 1.5,
                      px: 3,
                      backgroundColor: isPathActive(item.path) ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                      borderRight: isPathActive(item.path) ? '3px solid #6366f1' : 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(99, 102, 241, 0.04)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: isPathActive(item.path) ? 'primary.main' : 'text.secondary' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontWeight: isPathActive(item.path) ? 600 : 400,
                        color: isPathActive(item.path) ? 'primary.main' : 'text.primary',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            border: 'none',
            boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            border: 'none',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
