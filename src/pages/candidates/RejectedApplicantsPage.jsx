import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';

const RejectedApplicantsPage = () => {
  const [rejectedApplicants, setRejectedApplicants] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('applicants');
    if (stored) {
      const parsed = JSON.parse(stored);
      const rejected = parsed.filter(app => app.status === 'Rejected');
      setRejectedApplicants(rejected);
    }
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Rejected Applicants
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Resume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rejectedApplicants.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.jobTitle}</TableCell>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>
                  <Chip label="Rejected" color="error" />
                </TableCell>
                <TableCell>
                  <a href={app.resume} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </TableCell>
              </TableRow>
            ))}
            {rejectedApplicants.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No rejected applicants.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RejectedApplicantsPage;
