import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'M PLUS Rounded 1c', 'Rubik', sans-serif;
    background-color: #5665d5;
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {},
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
