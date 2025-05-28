import { PackageType } from '../types';

export const packages: PackageType[] = [
  {
    id: 'basic-website',
    title: 'Basic Website',
    description: 'Perfect for small businesses and personal websites. Get a professional, responsive website with up to 5 pages.',
    priceUsd: 499,
    priceInr: 1,
    deliveryTime: '2 weeks',
    tier: 'starter',
    features: [
      'Up to 5 pages',
      'Mobile responsive design',
      'Basic SEO setup',
      'Contact form',
      'Social media integration',
      '1 revision round'
    ]
  },
  {
    id: 'business-website',
    title: 'Business Website',
    description: 'Comprehensive website solution for established businesses looking to enhance their online presence.',
    priceUsd: 1499,
    priceInr: 129999,
    deliveryTime: '4 weeks',
    tier: 'advanced',
    popular: true,
    features: [
      'Up to 10 pages',
      'Mobile responsive design',
      'Advanced SEO optimization',
      'Content management system',
      'Blog setup',
      'Email newsletter integration',
      'Google Analytics setup',
      '3 revision rounds',
      'Basic e-commerce (up to 10 products)'
    ]
  },
  {
    id: 'premium-website',
    title: 'Premium Website',
    description: 'All-inclusive website solution with custom design, advanced features, and comprehensive marketing tools.',
    priceUsd: 4999,
    priceInr: 429999,
    deliveryTime: '8 weeks',
    tier: 'advanced',
    features: [
      'Unlimited pages',
      'Custom design from scratch',
      'Advanced animations and interactions',
      'Full e-commerce functionality',
      'Payment gateway integration',
      'Custom CMS development',
      'Advanced SEO strategy',
      'Speed optimization',
      'Social media strategy',
      'Email marketing setup',
      '5 revision rounds',
      '1 month post-launch support'
    ]
  },
  {
    id: 'e-commerce-starter',
    title: 'E-Commerce Starter',
    description: 'Get your online store up and running with essential e-commerce features and professional design.',
    priceUsd: 1999,
    priceInr: 169999,
    deliveryTime: '5 weeks',
    tier: 'advanced',
    features: [
      'Up to 50 products',
      'Responsive design',
      'Product categorization',
      'Shopping cart and checkout',
      'Payment gateway integration',
      'Order management system',
      'Customer accounts',
      'Basic SEO setup',
      '3 revision rounds'
    ]
  },
  {
    id: 'enterprise-solution',
    title: 'Enterprise Solution',
    description: 'Comprehensive digital solution for large organizations with complex requirements and integrations.',
    priceUsd: 12999,
    priceInr: 1099999,
    deliveryTime: '12-16 weeks',
    tier: 'premium',
    features: [
      'Custom enterprise-level website',
      'Advanced web applications',
      'Custom API development',
      'Third-party system integrations',
      'Advanced security features',
      'Performance optimization',
      'Scalable architecture',
      'Comprehensive analytics',
      'User testing and research',
      'Dedicated project manager',
      'Comprehensive documentation',
      '6 months technical support',
      'Staff training'
    ]
  },
  {
    id: 'web-app-development',
    title: 'Web Application',
    description: 'Custom web application development tailored to your specific business needs and processes.',
    priceUsd: 7999,
    priceInr: 679999,
    deliveryTime: '10-12 weeks',
    tier: 'premium',
    features: [
      'Custom application architecture',
      'User authentication system',
      'Database design and implementation',
      'API development',
      'Front-end development',
      'Back-end development',
      'Admin dashboard',
      'User roles and permissions',
      'Data visualization',
      'Testing and quality assurance',
      '3 months technical support',
      'Detailed documentation'
    ]
  }
];