import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer>
      <p>© 2025 LitLounge</p>
       <div className="social-icons">
        <a href="https://web.telegram.org/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <img src="./../assets/img/icons/telegram.png" alt="Facebook" width="24" height="24" />
        </a>
        <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <img src="./../assets/img/icons/vk.png" alt="Twitter" width="24" height="24" />
        </a>
        <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <img src="./../assets/img/icons/youtube.png" alt="Instagram" width="24" height="24" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
