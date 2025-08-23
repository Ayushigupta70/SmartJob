import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { CalendarToday } from '@mui/icons-material';

const InterviewsPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Interview Scheduling
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage interview schedules and calendar
      </Typography>

      <Card>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <CalendarToday sx={{ fontSize: 64, color: 'secondary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Interview Calendar
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This page will contain interview scheduling system with calendar integration.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InterviewsPage;
