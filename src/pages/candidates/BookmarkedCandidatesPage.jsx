import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { Bookmark } from '@mui/icons-material';

const BookmarkedCandidatesPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Bookmarked Candidates
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Your saved candidate profiles for future reference
      </Typography>

      <Card>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Bookmark sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Saved Candidates
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This page will show all bookmarked candidate profiles for easy access.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookmarkedCandidatesPage;
