import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import {
  Person,
  Work,
  Schedule,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';

const RecentActivities = () => {
  // Mock data for recent activities
  const activities = [
    {
      id: 1,
      type: 'application',
      title: 'New application received',
      description: 'John Smith applied for Senior React Developer position',
      time: '2 minutes ago',
      icon: <Person />,
      color: 'primary',
      status: 'new'
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview scheduled',
      description: 'Interview with Sarah Johnson for UI/UX Designer role',
      time: '1 hour ago',
      icon: <Schedule />,
      color: 'secondary',
      status: 'scheduled'
    },
    {
      id: 3,
      type: 'job',
      title: 'Job posting published',
      description: 'Full Stack Developer position is now live',
      time: '3 hours ago',
      icon: <Work />,
      color: 'success',
      status: 'active'
    },
    {
      id: 4,
      type: 'hire',
      title: 'Candidate hired',
      description: 'Michael Brown accepted the Backend Developer offer',
      time: '1 day ago',
      icon: <CheckCircle />,
      color: 'success',
      status: 'hired'
    },
    {
      id: 5,
      type: 'rejection',
      title: 'Application rejected',
      description: 'Rejected application for Junior Developer position',
      time: '2 days ago',
      icon: <Cancel />,
      color: 'error',
      status: 'rejected'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'primary';
      case 'scheduled':
        return 'info';
      case 'active':
        return 'success';
      case 'hired':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new':
        return 'New';
      case 'scheduled':
        return 'Scheduled';
      case 'active':
        return 'Active';
      case 'hired':
        return 'Hired';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Recent Activities
          </Typography>
          <Button variant="outlined" size="small">
            View All
          </Button>
        </Box>

        <List sx={{ p: 0 }}>
          {activities.map((activity, index) => (
            <ListItem
              key={activity.id}
              sx={{
                px: 0,
                py: 2,
                borderBottom: index < activities.length - 1 ? '1px solid #e2e8f0' : 'none',
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    backgroundColor: `${activity.color}.main`,
                    color: 'white',
                    width: 40,
                    height: 40,
                  }}
                >
                  {activity.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight="600">
                      {activity.title}
                    </Typography>
                    <Chip
                      label={getStatusLabel(activity.status)}
                      size="small"
                      color={getStatusColor(activity.status)}
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {activity.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                      {activity.time}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
