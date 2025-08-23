import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const SearchCandidatesPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q")?.toLowerCase() || "";
    setQuery(q);

    const stored = localStorage.getItem("applicants");
    if (stored) {
      const applicants = JSON.parse(stored);

      if (q) {
        const filtered = applicants.filter((a) =>
          [a.name, a.jobTitle, a.email, a.status]
            .join(" ")
            .toLowerCase()
            .includes(q)
        );
        setResults(filtered);
      } else {
        setResults([]);
      }
    }
  }, [location.search]);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Search Candidates
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Results for: <strong>{query || "No query"}</strong>
      </Typography>

      {results.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Applicant Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Resume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>{applicant.jobTitle}</TableCell>
                  <TableCell>{applicant.name}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.contact}</TableCell>
                  <TableCell>
                    <Chip
                      label={applicant.status}
                      color={
                        applicant.status === "Pending"
                          ? "warning"
                          : applicant.status === "Reviewed"
                          ? "primary"
                          : applicant.status === "Rejected"
                          ? "error"
                          : "default"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <a
                      href={applicant.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body2" color="text.secondary">
          {query ? `No candidates found for "${query}"` : "Enter a search term in the header."}
        </Typography>
      )}
    </Box>
  );
};

export default SearchCandidatesPage;
