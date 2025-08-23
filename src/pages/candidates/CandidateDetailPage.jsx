import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { Person } from '@mui/icons-material';

const CandidateDetailPage = () => {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Candidate Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Detailed view for candidate ID: {id}
      </Typography>

      <Card>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Person sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Candidate Profile Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This page will show candidate profiles with resume, shortlist, reject, message, and interview scheduling options.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CandidateDetailPage;
