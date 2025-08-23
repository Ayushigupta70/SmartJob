import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  FormControl,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VacancyStatsChart = () => {
  const theme = useTheme();
  const [timeFilter, setTimeFilter] = useState('This Month');

  // Mock data for the chart
  const data = [
    { week: 'Week 01', applicationsSent: 30, interviews: 25, rejected: 5 },
    { week: 'Week 02', applicationsSent: 45, interviews: 35, rejected: 8 },
    { week: 'Week 03', applicationsSent: 35, interviews: 40, rejected: 12 },
    { week: 'Week 04', applicationsSent: 55, interviews: 30, rejected: 15 },
    { week: 'Week 05', applicationsSent: 65, interviews: 45, rejected: 10 },
    { week: 'Week 06', applicationsSent: 40, interviews: 35, rejected: 18 },
    { week: 'Week 07', applicationsSent: 70, interviews: 50, rejected: 12 },
    { week: 'Week 08', applicationsSent: 85, interviews: 60, rejected: 20 },
    { week: 'Week 09', applicationsSent: 75, interviews: 55, rejected: 25 },
    { week: 'Week 10', applicationsSent: 50, interviews: 40, rejected: 15 },
  ];

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Recruitment Stats
          </Typography>
          <FormControl size="small">
            <Select
              value={timeFilter}
              onChange={handleTimeFilterChange}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="This Week">This Week</MenuItem>
              <MenuItem value="This Month">This Month</MenuItem>
              <MenuItem value="Last 3 Months">Last 3 Months</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Chip
            label="Applications Sent"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              fontWeight: 600,
            }}
          />
          <Chip
            label="Interviews"
            sx={{
              backgroundColor: theme.palette.success.main,
              color: 'white',
              fontWeight: 600,
            }}
          />
          <Chip
            label="Rejected"
            sx={{
              backgroundColor: theme.palette.error.main,
              color: 'white',
              fontWeight: 600,
            }}
          />
        </Box>

        <Box sx={{ height: 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="week"
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="applicationsSent"
                stroke={theme.palette.primary.main}
                strokeWidth={3}
                dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 6 }}
                name="Applications Sent"
              />
              <Line
                type="monotone"
                dataKey="interviews"
                stroke={theme.palette.success.main}
                strokeWidth={3}
                dot={{ fill: theme.palette.success.main, strokeWidth: 2, r: 6 }}
                name="Interviews"
              />
              <Line
                type="monotone"
                dataKey="rejected"
                stroke={theme.palette.error.main}
                strokeWidth={3}
                dot={{ fill: theme.palette.error.main, strokeWidth: 2, r: 6 }}
                name="Rejected"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VacancyStatsChart;
