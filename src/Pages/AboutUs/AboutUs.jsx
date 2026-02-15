import React from 'react';

const AboutUs = () => {
    return (
        <section className="min-h-screen bg-gray-50 px-6 py-20">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    About Order-Loom
                </h1>

                <p className="text-gray-700 leading-relaxed mb-6">
                    Order-Loom is a garment order and production tracking platform
                    built to simplify manufacturing workflow. It connects buyers,
                    managers, and production teams through a structured, transparent system.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                    The platform enables real-time order monitoring, production updates,
                    quality control tracking, and delivery visibility — reducing delays,
                    miscommunication, and manual coordination errors.
                </p>

                <p className="text-gray-700 leading-relaxed">
                    Our focus is operational clarity. From order placement to shipment,
                    every stage is tracked with accountability and measurable progress.
                </p>

            </div>
        </section>
    );
};

export default AboutUs;