import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    className="px-4 md:px-12 py-12 mt-8"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.6 }}
  >
    <div className="max-w-5xl mx-auto">
      <p className="text-muted-foreground text-sm mb-6">Questions? Contact us.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {["FAQ", "Help Center", "Account", "Media Center", "Investor Relations", "Jobs", "Ways to Watch", "Terms of Use", "Privacy", "Cookie Preferences", "Corporate Information", "Contact Us"].map(
          (link) => (
            <a key={link} href="#" className="text-muted-foreground text-xs hover:text-foreground/80 underline transition-colors duration-200">
              {link}
            </a>
          )
        )}
      </div>
      <p className="text-muted-foreground text-xs">© 2025 Netflix Clone. Built for demo purposes.</p>
    </div>
  </motion.footer>
);

export default Footer;
