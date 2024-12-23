import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#E5E7EB] py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-700">
          Made with Passion &amp; Love by Esmael
        </p>
        <div className="mt-4">
          <a
            href="https://github.com/Esam-jr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mx-4 text-gray-700 hover:text-lime-500 transition duration-200"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/esmael-sabir/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mx-4 text-gray-700 hover:text-lime-500 transition duration-200"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
