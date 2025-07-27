import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-accent-50 to-accent-100 py-8 border-t border-accent-200">
      <div className="container mx-auto text-center">
        <p className="text-sm text-accent-600 font-medium">
          Made with Passion &amp; Love by Esmael
        </p>
        <div className="mt-6 flex justify-center space-x-6">
          <a
            href="https://github.com/Esam-jr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-primary-500 transition-all duration-200 hover:scale-110 p-2 rounded-lg hover:bg-white shadow-sm hover:shadow-md"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/esmael-sabir/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-primary-500 transition-all duration-200 hover:scale-110 p-2 rounded-lg hover:bg-white shadow-sm hover:shadow-md"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
