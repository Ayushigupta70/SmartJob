import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import { Add, Work } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const JobsPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Job Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your job listings, edit posts, and track applications
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/jobs/post')}
          sx={{ borderRadius: 2 }}
        >
          Post New Job
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Work sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Post New Job
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Create and publish new job listings with detailed requirements
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/jobs/post')}
                fullWidth
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Work sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Manage Listings
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Edit, pause, or delete existing job postings
              </Typography>
              <Button variant="outlined" onClick={() => navigate('/jobs/manage')} fullWidth>
                 View All Jobs
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Work sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Track Applications
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Monitor applications and candidate progress
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate('/candidates')}
                fullWidth
              >
                View Applications
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobsPage;
