"use client"
import { motion } from 'framer-motion'
import { GlowEffect } from './GlowEffect'

export const CTA = () => {
    return (
        <section className="py-24 relative overflow-hidden">
         <GlowEffect />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 lg:p-16 border border-white/20 shadow-xl"
                >
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="space-y-4"
                            >
                                <h2 className="text-4xl font-bold text-gray-900">Ready to Transform Your</h2>
                                <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                    Email Experience?
                                </div>
                            </motion.div>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-xl text-gray-700"
                            >
                                Join thousands of professionals who have already upgraded to the future of email management. Start your free trial today.
                            </motion.p>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    Start Free Trial
                                </button>
                                <button className="bg-white/80 backdrop-blur-lg text-violet-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-white transition-all shadow-lg hover:shadow-xl">
                                    Schedule Demo
                                </button>
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="flex items-center gap-8 text-gray-700"
                            >
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>14-day free trial</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>No credit card required</span>
                                </div>
                            </motion.div>
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-square w-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl shadow-2xl transform rotate-3">
                                <div className="absolute inset-2 bg-white/90 backdrop-blur-xl rounded-xl" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                                        50K+
                                    </div>
                                    <div className="text-gray-700 font-medium">Happy Users</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
} 