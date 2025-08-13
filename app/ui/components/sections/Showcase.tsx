
import React from 'react'
import SearchBox from '../utilityComponents/SearchBox'
import { Button } from '../design-system'

const Showcase = () => {
    return (
        <section className='relative w-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-20 lg:py-32 overflow-hidden'>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className='relative w-full max-w-7xl mx-auto px-6'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-12'>

                    {/* Content Section */}
                    <div className='flex-1 text-center lg:text-left space-y-8 animate-fade-in'>
                        <div className='space-y-6'>
                            <div className="space-y-4">
                                <h1 className='text-4xl lg:text-6xl font-bold text-white leading-tight'>
                                    Your Reading Adventure
                                    <span className='block text-primary-100 animate-slide-up'>Starts Here</span>
                                </h1>

                                <p className='text-lg lg:text-xl text-primary-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
                                    Welcome to a haven for book enthusiasts. Your next reading adventure awaits –
                                    Let the journey begin with thousands of carefully curated titles.
                                </p>
                            </div>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                            <div className="flex-1 max-w-md">
                                <SearchBox variant="hero" className='h-14'/>
                            </div>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
                            >
                                Browse Categories
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className='flex flex-wrap justify-center lg:justify-start gap-8 pt-8'>
                            <div className='text-center group'>
                                <div className='text-3xl lg:text-4xl font-bold text-white group-hover:text-primary-100 transition-colors duration-300'>10K+</div>
                                <div className='text-primary-100 text-sm lg:text-base'>Books Available</div>
                            </div>
                            <div className='text-center group'>
                                <div className='text-3xl lg:text-4xl font-bold text-white group-hover:text-primary-100 transition-colors duration-300'>50K+</div>
                                <div className='text-primary-100 text-sm lg:text-base'>Happy Readers</div>
                            </div>
                            <div className='text-center group'>
                                <div className='text-3xl lg:text-4xl font-bold text-white group-hover:text-primary-100 transition-colors duration-300'>24/7</div>
                                <div className='text-primary-100 text-sm lg:text-base'>Customer Support</div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Section */}
                    <div className='flex-1 flex justify-center lg:justify-end'>
                        <div className='relative animate-scale-in'>
                            {/* Main Hero Element */}
                            <div className='relative w-80 h-80 lg:w-96 lg:h-96 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105'>
                                <div className='text-center text-white/90'>
                                    <div className='text-6xl lg:text-7xl mb-6 animate-bounce-gentle'>📚</div>
                                    <p className='text-lg lg:text-xl font-medium'>Discover Amazing Books</p>
                                    <p className='text-sm text-white/70 mt-2'>Start your journey today</p>
                                </div>

                                {/* Inner glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 rounded-3xl"></div>
                            </div>

                            {/* Floating elements */}
                            <div className='absolute -top-6 -right-6 w-20 h-20 bg-accent-success rounded-full flex items-center justify-center animate-bounce-gentle shadow-lg'>
                                <span className='text-3xl'>⭐</span>
                            </div>
                            <div className='absolute -bottom-6 -left-6 w-16 h-16 bg-accent-warning rounded-full flex items-center justify-center animate-bounce-gentle shadow-lg' style={{ animationDelay: '1s' }}>
                                <span className='text-2xl'>🔥</span>
                            </div>

                            {/* Additional floating elements */}
                            <div className='absolute top-1/2 -left-8 w-12 h-12 bg-accent-info rounded-full flex items-center justify-center animate-bounce-gentle shadow-lg' style={{ animationDelay: '0.5s' }}>
                                <span className='text-xl'>💡</span>
                            </div>
                            <div className='absolute top-1/4 -right-4 w-10 h-10 bg-accent-error rounded-full flex items-center justify-center animate-bounce-gentle shadow-lg' style={{ animationDelay: '1.5s' }}>
                                <span className='text-lg'>❤️</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Showcase