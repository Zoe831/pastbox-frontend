import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert
} from '@mui/material';
import { API_URL } from '../config';
import axios from 'axios';

function MyStories() {
  const { t } = useTranslation();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/stories/public`);
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setError(t('myStories.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [t]);

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

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('myStories.title')}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {stories.map((story) => (
          <Grid item xs={12} key={story.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {new Date(story.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" paragraph>
                  {story.content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('myStories.reminderDate')}: {new Date(story.reminderDate).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MyStories; 