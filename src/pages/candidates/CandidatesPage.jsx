import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import { People, Search, Bookmark } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const CandidatesPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Candidate Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View applicants, search candidates, and manage your talent pipeline
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <People sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                All Applicants
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                View all candidates who have applied to your job postings
              </Typography>
              <Button variant="contained" onClick={() => navigate('/candidates/applicants')} fullWidth>
              View Applicants
              </Button>

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Search sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Search Candidates
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Find candidates by skills, experience, and location
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/candidates/search')}
                fullWidth
              >
                Search Now
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Bookmark sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Bookmarked
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Access your saved and bookmarked candidate profiles
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate('/candidates/bookmarked')}
                fullWidth
              >
                View Bookmarks
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <EmojiEventsIcon sx={{ fontSize: 48, color: 'green', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                All Selected Applicants
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                View all candidates who have selected to for job position
              </Typography>
              <Button variant="contained" onClick={() => navigate('/candidates/accepted')} fullWidth>
              View Selected
              </Button>

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <ThumbDownIcon sx={{ fontSize: 48, color: 'Red', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                All Rejected Applicant
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                View all candidates who have rejected to for job post
              </Typography>
              <Button variant="contained" onClick={() => navigate('/candidates/rejected')} fullWidth>
              View Rejected
              </Button>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidatesPage;
