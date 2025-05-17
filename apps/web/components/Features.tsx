"use client"

import { motion } from 'framer-motion'
import { features } from '@/utils/features'
import { GlowEffect } from './GlowEffect'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}

export const Features = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <GlowEffect />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-gray-900">Discover Our</span>{' '}
                        <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                            Powerful Features
                        </span>
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        Everything you need to manage your emails efficiently and intelligently
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-violet-600 transition-all shadow-lg hover:shadow-xl hover:scale-100 duration-300 ease-in-out"
                        >
                            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-violet-600">{feature.title}</h3>
                            <p className="text-gray-700">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
} 