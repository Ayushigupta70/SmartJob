import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip,
  IconButton, Menu, MenuItem, Button
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const dummyApplicants = [
  {
    id: 1,
    jobTitle: 'Frontend Developer',
    name: 'Ayushi Gupta',
    email: 'ayushi@example.com',
    contact: '7078596818',
    status: 'Pending',
    resume: 'https://example.com/resume-ayushi.pdf',
  },
  {
    id: 2,
    jobTitle: 'Backend Developer',
    name: 'Sneha Sharma',
    email: 'sneha@example.com',
    contact: '9876501234',
    status: 'Reviewed',
    resume: 'https://example.com/resume-sneha.pdf',
  },
  {
    id: 3,
    jobTitle: 'UI/UX Designer',
    name: 'Rahul Gupta',
    email: 'rahul@example.com',
    contact: '9988776655',
    status: 'Rejected',
    resume: 'https://example.com/resume-rahul.pdf',
  },
  {
    id: 4,
    jobTitle: 'Frontend Developer',
    name: 'Amit Verma',
    email: 'amit@example.com',
    contact: '9876543210',
    status: 'Pending',
    resume: 'https://example.com/resume-amit.pdf',
  },
  {
  id: 5,
  jobTitle: 'HR',
  name:'Manisha Sah',
  email: 'manisha@example.com',
  contact:'7894561230',
  status:'Pending',
  resume:'https://example.com/resume-manisha.pdf'
  },
  {id: 6,
  jobTitle: 'SDE',
  name:'Anuj Gupta',
  email:'anuj@example.com',
  contact:'6547891230',
  status:'Pending',
  resume:'https://example.com/resume-anuj.pdf'
  },{
    id:7,
    jobTitle:'SEO',
    name:'Anjali Gupta',
    email:'anjali@example.com',
    contact:'7894561230',
    status:'Pending',
    resume:'https://example.com/resume-anjali.pdf'
  }
];

const ApplicantListPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('applicants');
    if (stored) {
      setApplicants(JSON.parse(stored));
    } else {
      localStorage.setItem('applicants', JSON.stringify(dummyApplicants));
      setApplicants(dummyApplicants);
    }
  }, []);

  // Menu handlers
  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  // Status update
  const handleAction = (status) => {
    const updated = applicants.map(app =>
      app.id === selectedId ? { ...app, status } : app
    );
    setApplicants(updated);
    localStorage.setItem('applicants', JSON.stringify(updated));
    handleMenuClose();
  };

  // Reset to dummy data
  const handleReset = () => {
    localStorage.setItem('applicants', JSON.stringify(dummyApplicants));
    setApplicants(dummyApplicants);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Applicant List
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        View and manage candidate applications
      </Typography>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleReset}
        sx={{ mb: 2 }}
      >
        Reset to Dummy Data
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Applicant Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Resume</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell>{applicant.jobTitle}</TableCell>
                <TableCell>{applicant.name}</TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>{applicant.contact}</TableCell>
                <TableCell>
                  <Chip
                    label={applicant.status}
                    color={
                      applicant.status === 'Pending' ? 'warning' :
                      applicant.status === 'Reviewed' ? 'primary' :
                      applicant.status === 'Rejected' ? 'error' :
                      'default'
                    }
                  />
                </TableCell>
                <TableCell>
                  <a href={applicant.resume} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleMenuOpen(e, applicant.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {applicants.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No applicants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction('Reviewed')}>Accept</MenuItem>
        <MenuItem onClick={() => handleAction('Rejected')}>Reject</MenuItem>
        <MenuItem onClick={() => handleAction('Pending')}>Mark Pending</MenuItem>
      </Menu>
    </Box>
  );
};

export default ApplicantListPage;
