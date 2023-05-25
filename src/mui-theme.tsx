import { CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

const rootElement = document.getElementById('root');

// All `Portal`-related components need to have the the main app wrapper element as a container
// so that the are in the subtree under the element used in the `important` option of the Tailwind's config.
const theme = createTheme({
  typography: {
    fontFamily: `"GT Eesti Pro", "Helvetica", "Arial", sans-serif`,
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: '0.25rem',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderWidth: '0.25rem',
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

interface Props {
  children: ReactNode;
}

export function MuiTheme({ children }: Props) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MuiTheme;
