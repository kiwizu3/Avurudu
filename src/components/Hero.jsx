import React from "react";
import { motion } from "framer-motion";

const Hero = ({ language }) => {
    const content = {
        si: {
            title: "සුභ අලුත් අවුරුද්දක් වේවා!",
            subtitle: "අලුත් ආරම්භයක සතුට ඔබට...",
        },
        en: {
            title: "Happy Sinhala & Tamil New Year!",
            subtitle: "Joy in every new beginning...",
        },
    };

    return (
        <div className="hero-bg">
            <motion.div
                className="text-center py-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="display-5 font-arundathee">{content[language].title}</h1>
                <p className="lead">{content[language].subtitle}</p>
            </motion.div>
        </div>
    );
};

export default Hero;
