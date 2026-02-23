export const createMeIntroStyles = () => `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  
  @keyframes gridShift {
    0%, 100% { 
      transform: translateX(0) translateY(0); 
      opacity: 0.6; 
    }
    25% { 
      transform: translateX(10px) translateY(-5px); 
      opacity: 0.4; 
    }
    50% { 
      transform: translateX(-5px) translateY(10px); 
      opacity: 0.7; 
    }
    75% { 
      transform: translateX(5px) translateY(-10px); 
      opacity: 0.5; 
    }
  }

  @keyframes morphFloat {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg) scale(1); 
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; 
    }
    25% { 
      transform: translateY(-20px) rotate(90deg) scale(1.05); 
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; 
    }
    50% { 
      transform: translateY(10px) rotate(180deg) scale(0.95); 
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; 
    }
    75% { 
      transform: translateY(-10px) rotate(270deg) scale(1.02); 
      border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; 
    }
  }

  @keyframes scrollIndicator {
    0% {
      transform: translateY(-8px);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(30px);
      opacity: 0;
    }
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }

  @keyframes particleFloat {
    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
    25% { transform: translateY(-15px) translateX(10px) rotate(90deg); }
    50% { transform: translateY(-30px) translateX(-5px) rotate(180deg); }
    75% { transform: translateY(-10px) translateX(-15px) rotate(270deg); }
  }

  @keyframes morphShape {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    50% { border-radius: 50% 40% 60% 30% / 40% 70% 60% 30%; }
    75% { border-radius: 40% 70% 30% 60% / 70% 40% 50% 60%; }
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes slideInFromLeft {
    from { transform: translateX(-100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideInFromRight {
    from { transform: translateX(100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes scaleIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  .nav-link:hover {
    color: #6C131F;
    transform: translateY(-2px);
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: #6C131F;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-50%);
    border-radius: 1px;
  }
  
  .nav-link:hover::after {
    width: 80%;
  }
  
  .primary-btn {
    position: relative;
    overflow: hidden;
    background: #6C131F;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .primary-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,236,234,0.3), transparent);
    transition: left 0.6s ease;
  }

  .primary-btn:hover::before {
    left: 100%;
  }
  
  .primary-btn:hover {
    background: #A14B58;
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 25px 50px rgba(108, 19, 31, 0.25);
  }
  
  .secondary-btn {
    position: relative;
    overflow: hidden;
    background: transparent;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .secondary-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: #6C131F;
    transition: width 0.3s ease;
    z-index: -1;
  }

  .secondary-btn:hover::before {
    width: 100%;
  }
  
  .secondary-btn:hover {
    color: #FFECEA;
    border-color: #6C131F;
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 40px rgba(108, 19, 31, 0.15);
  }
  
  .avatar-container {
    position: relative;
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .avatar-container::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: #6C131F;
    border-radius: inherit;
    z-index: -2;
    opacity: 0;
    transition: opacity 0.5s ease;
    filter: blur(15px);
  }

  .avatar-container:hover::before {
    opacity: 0.1;
  }

  .avatar-container:hover .avatar-glow {
    opacity: 1;
  }
  
  .avatar-container:hover {
    transform: translateY(-30px) rotate(-5deg) scale(1.1);
    box-shadow: 
      0 60px 120px rgba(108, 19, 31, 0.3),
      inset 0 1px 0 rgba(255,236,234,0.2);
  }
  
  .avatar-container:hover .avatar-image {
    transform: translateY(-5%) scale(1.2);
    filter: contrast(1.05) brightness(1.02) saturate(1.1);
  }
  
  .social-link {
    position: relative;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .social-link::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: #6C131F;
    border-radius: 50%;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .social-link::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255,236,234,0.2);
    border-radius: 50%;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .social-link:hover::before {
    width: 150%;
    height: 150%;
  }

  .social-link:hover::after {
    width: 200%;
    height: 200%;
  }
  
  .social-link:hover {
    color: #FFECEA;
    border-color: #6C131F;
    transform: translateY(-10px) scale(1.25) rotate(15deg);
    box-shadow: 
      0 25px 50px rgba(108, 19, 31, 0.3),
      inset 0 1px 0 rgba(255,236,234,0.1);
  }
  
  .logo-image:hover {
    transform: scale(1.1) rotate(5deg);
  }
  
  .floating-shape {
    animation: morphFloat 25s ease-in-out infinite;
  }
  
  .particle {
    position: absolute;
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.01));
    animation: particleFloat 25s infinite linear;
    border-radius: 50%;
  }

  .gradient-text {
    background: #6C131F;
    color: #6C131F;
  }

  .slide-in-left {
    animation: slideInFromLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .slide-in-right {
    animation: slideInFromRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .scale-in {
    animation: scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .mobile-nav-links {
    transition: all 0.3s ease-in-out;
  }
  
  .sticky-nav.visible {
    top: 0 !important;
  }
  
  .sticky-nav.hidden {
    top: -100px !important;
  }
  
  .desktop-nav, .mobile-nav {
    position: sticky !important;
    top: 0 !important;
    z-index: 1000 !important;
  }
  
  .desktop-nav {
    margin-bottom: 60px !important;
  }
  
  .scroll-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 45px;
    height: 45px;
    background: #6C131F;
    color: #FFECEA;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(108, 19, 31, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    opacity: 0;
    transform: translateY(20px);
    pointer-events: none;
  }

  .scroll-to-top.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }

  .scroll-to-top:hover {
    background: #A14B58;
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 8px 20px rgba(108, 19, 31, 0.4);
  }

  @media (max-width: 1024px) {
    .layout-grid {
      grid-template-columns: 1fr !important;
      gap: 60px !important;
      text-align: center;
    }
    
    .sidebar {
      order: 2;
      max-width: 500px;
      margin: 0 auto;
    }
    
    .main-content {
      order: 1;
    }

    .floating-shape {
      opacity: 0.5 !important;
    }
  }
  
  @media (max-width: 768px) {
    .desktop-nav {
      display: none !important;
    }
    
    .mobile-nav {
      display: flex !important;
      margin-bottom: 40px !important;
    }
    
    .title {
      font-size: clamp(2.2rem, 8vw, 3.2rem) !important;
      line-height: 1.1 !important;
    }
    
    .greeting {
      font-size: clamp(1.1rem, 4vw, 1.4rem) !important;
    }
    
    .avatar-container {
      width: 300px !important;
      height: 300px !important;
    }

    .particle {
      display: none !important;
    }

    .scroll-to-top {
      bottom: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 25px 20px !important;
    }
    
    .buttons {
      flex-direction: column;
      gap: 20px;
      width: 100%;
    }
    
    .primary-btn, .secondary-btn {
      width: 100% !important;
      padding: 18px 28px !important;
      font-size: 1rem !important;
    }
    
    .avatar-container {
      width: 280px !important;
      height: 280px !important;
    }
    
    .social-links {
      gap: 15px;
      justify-content: center;
    }
    
    .social-link {
      width: 50px !important;
      height: 50px !important;
    }

    .floating-shape {
      display: none !important;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;