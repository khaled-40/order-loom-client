import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Order-Loom
                    </h2>
                    <p className="text-sm leading-relaxed">
                        A smart garment order and production tracking platform
                        designed to streamline workflow, ensure transparency,
                        and deliver on time.
                    </p>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Company</h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/about-us" className="hover:text-white transition">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-white transition">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="hover:text-white transition">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Resources</h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/how-it-works" className="hover:text-white transition">
                                How It Works
                            </Link>
                        </li>
                        <li>
                            <Link to="/faq" className="hover:text-white transition">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link to="/support" className="hover:text-white transition">
                                Support
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li>Email: support@orderloom.com</li>
                        <li>Phone: +880 1234 567890</li>
                        <li>Location: Dhaka, Bangladesh</li>
                    </ul>

                    <div className="flex gap-4 mt-6">
                        <a href="#" className="hover:text-white transition">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-white transition">
                            <FaLinkedinIn />
                        </a>
                        <a href="#" className="hover:text-white transition">
                            <FaGithub />
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>
                        © {new Date().getFullYear()} Order-Loom. All rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-white transition">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="hover:text-white transition">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
