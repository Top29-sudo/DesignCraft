import { Github, Linkedin, Twitter } from 'lucide-react';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">About Me</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Passionate web designer and developer creating exceptional digital experiences.
            </p>
          </div>
        </div>
      </section>
      
      {/* Profile Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Professional portrait" 
                  className="rounded-xl w-full object-cover aspect-square mb-6"
                />
                
                <div className="flex space-x-4 mb-6">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                  <ul className="space-y-3">
                    <li>
                      <span className="block text-sm text-gray-500 dark:text-gray-400">Email</span>
                      <a href="mailto:kenkaneki9330@gmail.com" className="text-primary-600 dark:text-primary-400 hover:underline">
kenkaneki9330@gmail.com
                      </a>
                    </li>
                    <li>
                      <span className="block text-sm text-gray-500 dark:text-gray-400">Location</span>
                      <span>19/A, M.L. Garden Lane, Konnagr, Hooghly Pin: 712235</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2>Hi, I'm Sarannya Chaudhuri</h2>
                <p>
                  With over 8 years of experience in web design and development, I specialize in creating beautiful, functional, and user-friendly websites and applications that help businesses achieve their goals.
                </p>
                <p>
                  I believe that great design is about more than just aesthetics—it's about creating meaningful experiences that connect with users and drive results. Whether you're a small business looking to establish your online presence or a larger organization seeking to revamp your digital strategy, I'm here to help.
                </p>
                
                <h3>My Approach</h3>
                <p>
                  I take a collaborative, client-focused approach to every project. I start by understanding your business, your audience, and your goals. Then, I craft a tailored solution that addresses your specific needs and challenges.
                </p>
                <p>
                  My process is transparent and iterative, ensuring that you're involved and informed every step of the way. From initial concept to final launch, I work closely with you to ensure that the end result exceeds your expectations.
                </p>
                
                <h3>Expertise & Skills</h3>
                <div className="flex flex-wrap gap-2 my-4">
                  {['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js', 'Vue.js', 'Tailwind CSS', 'UI/UX Design', 'Figma', 'Responsive Design', 'SEO', 'WordPress', 'E-Commerce', 'API Development'].map(skill => (
                    <span key={skill} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium dark:bg-primary-900 dark:text-primary-100">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <h3>Experience</h3>
                <div className="space-y-6 mt-4">
                  <div>
                    <h4 className="text-xl font-bold">Lead Developer, TechInnovate</h4>
                    <p className="text-gray-500 dark:text-gray-400">2020 - Present</p>
                    <p>
                      Leading a team of developers to create enterprise-level web applications and websites for clients across various industries.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold">Senior Frontend Developer, WebSolutions Inc.</h4>
                    <p className="text-gray-500 dark:text-gray-400">2017 - 2020</p>
                    <p>
                      Developed and maintained large-scale web applications using React and Node.js, focusing on performance optimization and user experience.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold">Web Designer, CreativeMinds Agency</h4>
                    <p className="text-gray-500 dark:text-gray-400">2015 - 2017</p>
                    <p>
                      Created visually stunning websites and digital assets for clients ranging from small businesses to Fortune 500 companies.
                    </p>
                  </div>
                </div>
                
                <h3>Education</h3>
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="text-xl font-bold">Bachelor of Computer Science</h4>
                    <p className="text-gray-500 dark:text-gray-400">Stanford University, 2015</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold">User Experience Design Certificate</h4>
                    <p className="text-gray-500 dark:text-gray-400">Nielsen Norman Group, 2018</p>
                  </div>
                </div>
                
                <h3>My Mission</h3>
                <p>
                  My mission is to help businesses of all sizes harness the power of the web to grow and succeed. I believe in creating websites and applications that not only look great but also perform exceptionally well, are easy to use, and deliver tangible results.
                </p>
                <p>
                  I'm passionate about using technology to solve problems and create opportunities, and I'm committed to staying at the forefront of web development trends and best practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;