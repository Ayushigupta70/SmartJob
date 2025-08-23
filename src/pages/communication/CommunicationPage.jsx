import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { Chat } from '@mui/icons-material';

const CommunicationPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Communication
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Email and in-app messaging with candidates
      </Typography>

      <Card>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Chat sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Messaging Center
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This page will contain email and in-app messaging functionality for candidate communication.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CommunicationPage;
