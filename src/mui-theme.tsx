import { CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

import { COLORS } from './constants';

const rootElement = document.getElementById('root');

// All `Portal`-related components need to have the the main app wrapper element as a container
// so that the are in the subtree under the element used in the `important` option of the Tailwind's config.
const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.grass,
    },
    secondary: {
      main: COLORS.darkest,
    },
  },
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: 'GT Eesti Pro Text',
          padding: 10,
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'GT Eesti Pro Text',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        selectLabel: {
          fontFamily: 'GT Eesti Pro Text',
        },
        select: {
          fontFamily: 'GT Eesti Pro Text',
        },
        menuItem: {
          fontFamily: 'GT Eesti Pro Text',
        },
        input: {
          fontFamily: 'GT Eesti Pro Text',
        },
        displayedRows: {
          fontFamily: 'GT Eesti Pro Text',
        },
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
