import { Heart, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/debugyourfinance',
      color: 'hover:text-pink-500'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/debugyourfinance',
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/company/debugyourfinance',
      color: 'hover:text-blue-600'
    },
  ];

  return (
    <footer className="bg-primary text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-xl mb-3">DebugYourFinance</h3>
            <p className="text-sm text-slate-400">
              Privacy-first financial calculators. No login, no tracking, just pure value.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#tools" className="hover:text-accent transition-colors">SIP Calculator</a></li>
              <li><a href="#tools" className="hover:text-accent transition-colors">Tax Regime Simulator</a></li>
              <li><a href="#tools" className="hover:text-accent transition-colors">Loan Tenure Reducer</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-slate-400 ${social.color} transition-colors`}
                    aria-label={social.name}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8 text-center text-sm">
          <p className="flex items-center justify-center space-x-2">
            <span>&copy; {currentYear} DebugYourFinance. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for financial freedom.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
