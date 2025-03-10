import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Stack,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { CloudUpload, DeleteOutline, FileDownload } from "@mui/icons-material";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      marginBottom: "1rem",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          padding: "10px 24px",
          fontWeight: 600,
        },
        contained: {
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const Index = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mt: { xs: 2, md: 10 } }}>
                <Typography variant="h1" color="primary" gutterBottom>
                  Remove Image Backgrounds
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                  Fast, easy, and high-quality background removal with our
                  advanced AI technology.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<CloudUpload />}
                    component="label"
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                  <Button variant="outlined" color="primary" size="large">
                    Learn More
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  height: "400px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
              >
                {!file ? (
                  <Box sx={{ textAlign: "center" }}>
                    <CloudUpload
                      sx={{ fontSize: 80, color: "primary.main", mb: 2 }}
                    />
                    <Typography variant="h6" gutterBottom>
                      Drag & Drop or Upload Your Image
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Supports JPG, PNG and WEBP files
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3 }}
                      component="label"
                    >
                      Select Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ width: "100%", textAlign: "center" }}>
                    <Box
                      component="img"
                      src={URL.createObjectURL(file)}
                      alt="Uploaded image"
                      sx={{
                        maxWidth: "100%",
                        maxHeight: "280px",
                        mb: 3,
                        borderRadius: 2,
                      }}
                    />
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FileDownload />}
                      >
                        Remove Background
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteOutline />}
                        onClick={() => setFile(null)}
                      >
                        Clear
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 10 }}>
            <Typography variant="h2" align="center" gutterBottom>
              How It Works
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {[
                {
                  title: "Upload",
                  description:
                    "Upload any image with a background you want to remove",
                },
                {
                  title: "Process",
                  description:
                    "Our AI automatically detects and removes the background",
                },
                {
                  title: "Download",
                  description:
                    "Download your image with a transparent background",
                },
              ].map((step, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      height: "100%",
                      textAlign: "center",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                      },
                    }}
                  >
                    <Typography
                      variant="h1"
                      component="div"
                      sx={{
                        color: "primary.main",
                        opacity: 0.2,
                        fontSize: "5rem",
                        fontWeight: "bold",
                        mb: 2,
                      }}
                    >
                      {index + 1}
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Index;
