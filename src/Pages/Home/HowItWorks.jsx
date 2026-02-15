import React from "react";
import { FaClipboardList, FaIndustry, FaCheckCircle, FaBoxOpen, FaTruck } from "react-icons/fa";

const steps = [
    {
        id: 1,
        icon: <FaClipboardList size={28} />,
        title: "Place Order",
        description:
            "Buyers select products, choose quantity, and submit orders securely through the system."
    },
    {
        id: 2,
        icon: <FaIndustry size={28} />,
        title: "Production Begins",
        description:
            "Managers initiate cutting, sewing, and finishing processes with real-time updates."
    },
    {
        id: 3,
        icon: <FaCheckCircle size={28} />,
        title: "Quality Check",
        description:
            "Each batch passes strict QC verification before moving to packaging."
    },
    {
        id: 4,
        icon: <FaBoxOpen size={28} />,
        title: "Packed",
        description:
            "Products are securely packed and prepared for dispatch."
    },
    {
        id: 5,
        icon: <FaTruck size={28} />,
        title: "Track & Delivery",
        description:
            "Buyers track order progress in real time until final delivery."
    }
];

const HowItWorks = () => {
    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                    How It Works
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    A streamlined production workflow designed to simplify order tracking
                    and ensure timely garment delivery.
                </p>
            </div>

            <div className="relative max-w-6xl mx-auto">

                {/* Connector Line (Desktop Only) */}
                <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gray-200 z-0"></div>

                <div className="grid md:grid-cols-5 gap-8 relative z-10">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition text-center"
                        >
                            <div className="flex justify-center mb-4 text-indigo-600">
                                {step.icon}
                            </div>

                            <h3 className="font-semibold mb-2">
                                {step.title}
                            </h3>

                            <p className="text-sm text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
