import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress
} from '@mui/material';
import { API_URL } from '../config';
import axios from 'axios';

function Home() {
  const { t } = useTranslation();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        console.log('Fetching stories from:', `${API_URL}/api/stories/public`);
        const response = await axios.get(`${API_URL}/api/stories/public`);
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setError(t('home.error'));
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
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          {t('home.title')}
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          {t('home.subtitle')}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {stories.map((story) => (
          <Grid item xs={12} md={6} key={story.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {new Date(story.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" paragraph>
                  {story.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home; 