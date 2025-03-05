import { useState } from 'react';
import {
  Fab,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import { useTranslation } from 'react-i18next';

const backgroundOptions = [
  { name: 'default', value: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
  { name: 'warm', value: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)' },
  { name: 'fresh', value: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)' },
  { name: 'purple', value: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)' },
  { name: 'ocean', value: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' },
];

function BackgroundPicker({ onBackgroundChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const { t } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBackgroundSelect = (background) => {
    onBackgroundChange(background);
    handleClose();
  };

  const handleCustomImageSubmit = () => {
    if (customUrl) {
      onBackgroundChange(`url('${customUrl}')`);
      setCustomDialogOpen(false);
      handleClose();
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="change background"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
        }}
      >
        <PaletteIcon />
      </Fab>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {backgroundOptions.map((option) => (
          <MenuItem
            key={option.name}
            onClick={() => handleBackgroundSelect(option.value)}
          >
            {t(`background.${option.name}`)}
          </MenuItem>
        ))}
        <MenuItem onClick={() => setCustomDialogOpen(true)}>
          {t('background.custom')}
        </MenuItem>
      </Menu>

      <Dialog open={customDialogOpen} onClose={() => setCustomDialogOpen(false)}>
        <DialogTitle>{t('background.setCustom')}</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              label={t('background.imageUrl')}
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder={t('background.enterUrl')}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleCustomImageSubmit}
              fullWidth
            >
              {t('background.setBackground')}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BackgroundPicker; 