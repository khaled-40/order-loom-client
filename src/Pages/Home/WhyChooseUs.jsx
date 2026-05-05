import { motion } from "framer-motion";

const features = [
    {
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        num: "01",
        title: "Real-time tracking",
        desc: "Monitor every production stage as it happens — no more chasing updates.",
    },
    {
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
            </svg>
        ),
        num: "02",
        title: "Inventory control",
        desc: "Accurate stock records with low-level alerts before you run out.",
    },
    {
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
        num: "03",
        title: "Data insights",
        desc: "Spot order and production trends so decisions are driven by facts.",
    },
    {
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        num: "04",
        title: "Secure system",
        desc: "Role-based access keeps sensitive data in the right hands only.",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// matches btn-primary: from-teal-800 to-slate-700
const cardBg = "linear-gradient(to right, #115e59, #334155)";
const cardBgHover = "linear-gradient(to right, #0f4f4a, #293548)"; // slightly darker on hover

export default function WhyChooseUs() {
    return (
        <section className="py-12 px-6">

            <p className="text-xs font-semibold tracking-widest uppercase text-center mb-2 text-primary">
                Built for manufacturers
            </p>
            <h2 className="text-4xl font-bold mb-10 leading-tight text-center text-primary">
                Why teams choose our system
            </h2>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden"
                style={{ border: "1px solid #115e59" }}
            >
                {features.map((item, index) => (
                    <motion.div
                        key={item.num}
                        variants={cardVariants}
                        className="p-6 flex flex-col items-center text-center gap-3"
                        style={{
                            background: cardBg,
                            borderRight: index < features.length - 1 ? "2px dashed #4a7a75" : "none",
                        }}
                        whileHover={{ background: cardBgHover }}
                    >
                        {/* Icon badge — white/translucent on dark bg */}
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.15)", color: "#ccfbf1" }}
                        >
                            {item.icon}
                        </div>

                        {/* Number — muted white */}
                        <span
                            className="text-xs font-semibold tracking-wider"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                            {item.num}
                        </span>

                        {/* Title — full white */}
                        <p className="text-sm font-semibold leading-snug m-0" style={{ color: "#ffffff" }}>
                            {item.title}
                        </p>

                        {/* Description — soft white */}
                        <p className="text-xs leading-relaxed m-0" style={{ color: "rgba(255,255,255,0.7)" }}>
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            <div className="flex items-center justify-center gap-3 mt-6 text-xs text-gray-400">
                <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "linear-gradient(to right, #115e59, #334155)" }}
                />
                Trusted across production floors — from small workshops to large-scale facilities
            </div>
        </section>
    );
}