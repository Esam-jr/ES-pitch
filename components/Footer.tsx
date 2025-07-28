import { Github, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="flex items-center justify-center gap-2 footer-text">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-error-500 fill-current" />
          <span>by</span>
          <span className="font-semibold text-neutral-900">Esmael</span>
        </div>
        
        <div className="footer-links">
          <a
            href="https://github.com/Esam-jr"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link focus-ring"
            aria-label="Visit Esmael's GitHub profile"
          >
            <Github className="w-5 h-5" />
          </a>
          
          <a
            href="https://www.linkedin.com/in/esmael-sabir/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link focus-ring"
            aria-label="Visit Esmael's LinkedIn profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500">
            © 2024 ES Pitch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;