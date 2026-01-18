import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router";
import heroImg from "../../assets/undraw_order-delivered_puaw.svg"; // replace with yours

const Hero = () => {
    return (
        <section className="min-h-[80vh] flex items-center bg-gradient-to-r from-teal-800 to-slate-700 text-white">
            <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* Left Content */}
                <Fade direction="left" triggerOnce>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Streamline Garment Orders <br />
                            <span className="text-teal-300">From Loom to Delivery</span>
                        </h1>

                        <p className="mt-5 text-lg text-gray-200 max-w-xl">
                            OrderLoom helps garment factories manage orders, production stages,
                            and delivery tracking with precision, transparency, and speed.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <Link to="/all-products" className="btn btn-primary px-8">
                                View Products
                            </Link>

                            <Link
                                to="/dashboard"
                                className="btn btn-outline border-white text-white hover:bg-white hover:text-slate-800"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </Fade>

                {/* Right Image */}
                <Slide direction="right" triggerOnce>
                    <div className="flex justify-center">
                        <img
                            src={heroImg}
                            alt="Garment production tracking"
                            className="max-w-full md:max-w-[480px] drop-shadow-2xl"
                        />
                    </div>
                </Slide>

            </div>
        </section>
    );
};

export default Hero;
