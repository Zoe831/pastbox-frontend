import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { API_URL } from '../config';
import axios from 'axios';

function StoryDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/stories/${id}`);
        setStory(response.data);
      } catch (error) {
        console.error('Error fetching story:', error);
        setError(t('storyDetail.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, t]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!story) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 2 }}>
          {t('storyDetail.notFound')}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('storyDetail.title')}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          {new Date(story.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" paragraph>
          {story.content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('storyDetail.reminderDate')}: {new Date(story.reminderDate).toLocaleString()}
        </Typography>
      </Paper>
    </Container>
  );
}

export default StoryDetail; 