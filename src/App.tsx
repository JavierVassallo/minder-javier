import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Prueba from './components/Prueba';
import Home from './components/Home';

const theme = createTheme();

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </>
  )
}

export default App
