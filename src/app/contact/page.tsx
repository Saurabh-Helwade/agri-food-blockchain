"use client";

import { IconMail, IconUser, IconBrandGithub } from "@tabler/icons-react";

const ContactPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-primary mb-6">Contact</h1>

      <p className="text-lg mb-6">
        Have questions, suggestions, or want to collaborate? We'd love to hear from you!
      </p>

      <div className="space-y-4 text-base-content">
        <div className="flex items-center gap-3">
          <IconUser size={28} className="text-secondary" />
          <span className="text-lg">Saurabh Helwade</span>
        </div>

        <div className="flex items-center gap-3">
          <IconMail size={28} className="text-secondary" />
          <a href="mailto:helwadesaurabh@gmail.com" className="hover:underline">
            helwadesaurabh@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-3">
          <IconBrandGithub size={28} className="text-secondary" />
          <a
            href="https://github.com/Saurabh-Helwade/agri-food-blockchain"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
