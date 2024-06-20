import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { theme } from './theme';
import { QueryClient, QueryClientProvider} from "react-query";
const GlovalStyle =  createGlobalStyle`

/* @import url('https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Nanum+Gothic+Coding:wght@400;700&display=swap'); */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body{
  font-family :'Nanum Gothic Coding', sans-serif;
  // color:${props=>props.theme.white.darker};
  color : #000;
  line-height: 1.2;
  background-color : #fff;

}
* {
  box-sizing : border-box;
}
a {
  text-decoration: none;
  color: inherit;
}
::-webkit-scrollbar {
  display: none;
}
button{
  border:none;
  background-color:transparent;
}
input{
  border:none;
  outline:none;
}
input:disabled{
  background-color: transparent;
}

`;

const client = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme ={theme}>
          <BrowserRouter>
            <GlovalStyle />
            <App />  
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
     </RecoilRoot>
  </React.StrictMode>
);