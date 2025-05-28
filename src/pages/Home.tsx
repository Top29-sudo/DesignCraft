import { Link } from 'react-router-dom';
import { ArrowRight, Check, Code, Layout, Database, Users } from 'lucide-react';
import { reviews } from '../data/reviews';
import ReviewCard from '../components/reviews/ReviewCard';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-500 to-secondary-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M0 0 L8 0 L8 8 L0 8 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transforming Ideas Into <br className="hidden sm:block" />
              <span className="text-white/90">Digital Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-12">
              Expert web design and development services that elevate your brand. 
              From stunning websites to powerful web applications, we craft digital 
              experiences that drive results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/packages" className="btn bg-white text-primary-700 hover:bg-white/90">
                View Packages
              </Link>
              <Link to="/contact" className="btn bg-transparent border-2 border-white hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose DesignCraft</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We combine technical expertise with creative excellence to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-6">
                <Layout className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Beautiful Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Eye-catching visuals and intuitive interfaces that engage users and enhance brand perception.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-6">
                <Code className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Clean Code</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Expertly crafted, maintainable code that ensures your website is fast, reliable, and future-proof.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-6">
                <Database className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Scalable Solutions</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Future-ready applications that grow with your business and adapt to changing requirements.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">User-Centered</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Focusing on your users' needs to create intuitive and accessible digital experiences.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Secure & Reliable</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built with security best practices to protect your data and provide peace of mind.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Performance Optimized</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Lightning-fast load times and smooth interactions that keep users engaged and boost SEO rankings.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              From concept to launch, we offer end-to-end web development and design services tailored to your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">Web Design</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Beautiful, responsive websites that captivate your audience and represent your brand perfectly.
              </p>
              <Link to="/packages" className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center hover:underline">
                View packages <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">E-Commerce</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Powerful online stores with seamless checkout experiences and robust inventory management.
              </p>
              <Link to="/packages" className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center hover:underline">
                View packages <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">Web Applications</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Custom web applications that automate processes and solve your unique business challenges.
              </p>
              <Link to="/packages" className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center hover:underline">
                View packages <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">Branding</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Comprehensive branding services including logo design, color palettes, and brand guidelines.
              </p>
              <Link to="/packages" className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center hover:underline">
                View packages <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">SEO Optimization</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Technical and content SEO strategies to improve your visibility and drive organic traffic.
              </p>
              <Link to="/packages" className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center hover:underline">
                View packages <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">Maintenance</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Ongoing support, updates, and optimization to keep your website secure and performing at its best.
              </p>
              <Link to="/packages" className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center hover:underline">
                View packages <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A streamlined approach that delivers exceptional results on time and within budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-bold text-lg mr-4">
                  1
                </div>
                <h3 className="text-xl font-bold">Discovery</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 pl-14">
                We learn about your business, goals, and requirements through in-depth consultation.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-bold text-lg mr-4">
                  2
                </div>
                <h3 className="text-xl font-bold">Design</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 pl-14">
                We create wireframes and visual designs that align with your brand and user needs.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-bold text-lg mr-4">
                  3
                </div>
                <h3 className="text-xl font-bold">Development</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 pl-14">
                Our engineers build your project using modern technologies and best practices.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-bold text-lg mr-4">
                  4
                </div>
                <h3 className="text-xl font-bold">Launch</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 pl-14">
                After thorough testing, we deploy your project and provide ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Don't just take our word for it. Hear from some of our satisfied clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/packages" className="btn-outline">
              View All Packages
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg text-white/80 mb-8">
              Let's create something amazing together. Browse our packages or get in touch to discuss your custom needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/packages" className="btn bg-white text-primary-700 hover:bg-white/90">
                View Packages
              </Link>
              <Link to="/contact" className="btn bg-transparent border-2 border-white hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;