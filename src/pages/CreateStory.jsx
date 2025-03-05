import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import { API_URL } from '../config';

function CreateStory() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    content: '',
    email: '',
    reminderDate: null,
    visibility: 'private'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      reminderDate: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 验证必填字段
      if (!formData.content.trim()) {
        throw new Error('请输入内容');
      }
      if (!formData.email.trim()) {
        throw new Error('请输入邮箱');
      }
      if (!formData.reminderDate) {
        throw new Error('请选择提醒日期');
      }

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('请输入有效的邮箱地址');
      }

      // 验证提醒日期
      const now = new Date();
      if (formData.reminderDate <= now) {
        throw new Error('提醒日期必须是未来的时间');
      }

      // 准备请求数据
      const requestData = {
        content: formData.content.trim(),
        email: formData.email.trim(),
        reminderDate: formData.reminderDate.toISOString(),
        visibility: formData.visibility
      };

      console.log('Submitting story data:', requestData);
      console.log('API URL:', `${API_URL}/api/stories`);

      const response = await axios.post(`${API_URL}/api/stories`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10秒超时
      });

      console.log('Server response:', response.data);
      
      if (response.status === 201) {
        navigate('/');
      } else {
        throw new Error('创建故事失败，请重试');
      }
    } catch (error) {
      console.error('Error creating story:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('创建故事时发生错误，请稍后重试');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          创建新故事
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="故事内容"
            name="content"
            value={formData.content}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="邮箱地址"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="提醒日期"
              value={formData.reminderDate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  required
                />
              )}
              minDate={new Date()}
            />
          </LocalizationProvider>

          <FormControl fullWidth margin="normal">
            <InputLabel>可见性</InputLabel>
            <Select
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              label="可见性"
            >
              <MenuItem value="private">私密</MenuItem>
              <MenuItem value="public">公开</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              {loading ? <CircularProgress size={24} /> : '创建故事'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateStory; 