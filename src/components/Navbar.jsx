import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'fr', name: 'Français' }
];

function Navbar({ onLanguageChange }) {
  const { t, i18n } = useTranslation();
  const [languageAnchor, setLanguageAnchor] = useState(null);

  const handleLanguageClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  const handleLanguageSelect = (langCode) => {
    i18n.changeLanguage(langCode);
    handleLanguageClose();
  };

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ 
              color: 'white', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TimerIcon sx={{ mr: 1 }} />
            Pastbox
          </Typography>
          <div>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{ mr: 2 }}
            >
              {t('nav.home')}
            </Button>
            <Button
              component={Link}
              to="/create"
              color="inherit"
              variant="outlined"
              sx={{ mr: 2 }}
            >
              {t('nav.create')}
            </Button>
            <Button
              color="inherit"
              onClick={handleLanguageClick}
              variant="outlined"
              startIcon={<LanguageIcon />}
            >
              {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
            </Button>
            <Menu
              anchorEl={languageAnchor}
              open={Boolean(languageAnchor)}
              onClose={handleLanguageClose}
            >
              {languages.map((lang) => (
                <MenuItem
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  selected={i18n.language === lang.code}
                >
                  {lang.name}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 