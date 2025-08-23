import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const StatsCard = ({ title, value, icon, color, trend, description }) => {
  const isPositiveTrend = trend?.startsWith('+');

  const getGradientClass = (color) => {
    switch (color) {
      case 'primary':
        return 'gradient-card';
      case 'secondary':
        return 'gradient-card-blue';
      case 'success':
        return 'gradient-card-green';
      case 'warning':
        return 'gradient-card-yellow';
      default:
        return 'gradient-card';
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'visible',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
      className={getGradientClass(color)}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h3" fontWeight="bold" sx={{ color: 'white', mb: 2 }}>
              {value}
            </Typography>
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isPositiveTrend ? (
                  <TrendingUp sx={{ fontSize: 16, mr: 0.5, color: 'rgba(255,255,255,0.9)' }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 16, mr: 0.5, color: 'rgba(255,255,255,0.9)' }} />
                )}
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                  {trend}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', ml: 1 }}>
                  {description}
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
