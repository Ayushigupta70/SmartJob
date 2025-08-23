import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';

const AcceptedApplicantsPage = () => {
  const [acceptedApplicants, setAcceptedApplicants] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('applicants');
    if (stored) {
      const parsed = JSON.parse(stored);
      const accepted = parsed.filter(app => app.status === 'Reviewed');
      setAcceptedApplicants(accepted);
    }
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Accepted Applicants
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
            {acceptedApplicants.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.jobTitle}</TableCell>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>
                  <Chip label="Reviewed" color="primary" />
                </TableCell>
                <TableCell>
                  <a href={app.resume} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </TableCell>
              </TableRow>
            ))}
            {acceptedApplicants.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No accepted applicants.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AcceptedApplicantsPage;
