import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Ui from './Ui.jsx'
import favicon from './img/rayo.png';

const setFavicon = (url) => {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = url;
  document.head.appendChild(link);
};

setFavicon(favicon);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ui />
  </StrictMode>,
)
