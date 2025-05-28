import { ReviewType } from '../types';

export const reviews: ReviewType[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    packageId: 'business-website',
    packageTitle: 'Business Website',
    rating: 5,
    comment: 'Absolutely thrilled with my new business website! The team was professional, responsive, and delivered exactly what I envisioned. My online sales have increased by 30% since launch.',
    date: '2024-04-15',
    verified: true
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Michael Chen',
    userAvatar: 'https://i.pravatar.cc/150?img=11',
    packageId: 'e-commerce-starter',
    packageTitle: 'E-Commerce Starter',
    rating: 4,
    comment: 'Great experience working with this team on my e-commerce site. They implemented all features I needed and provided excellent guidance. Only reason for 4 stars is that I wished the process was a bit faster.',
    date: '2024-03-22',
    verified: true
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Jessica Williams',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    packageId: 'basic-website',
    packageTitle: 'Basic Website',
    rating: 5,
    comment: 'Perfect solution for my small business! The Basic Website package gave me everything I needed at a price I could afford. The site looks professional and works flawlessly.',
    date: '2024-04-02',
    verified: true
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'David Rodriguez',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    packageId: 'premium-website',
    packageTitle: 'Premium Website',
    rating: 5,
    comment: 'The Premium Website package was worth every penny. The custom design perfectly captures our brand identity, and the functionality exceeds our expectations. Highly recommended for businesses serious about their online presence.',
    date: '2024-02-18',
    verified: true
  },
  {
    id: '5',
    userId: 'user5',
    userName: 'Emily Parker',
    userAvatar: 'https://i.pravatar.cc/150?img=9',
    packageId: 'web-app-development',
    packageTitle: 'Web Application',
    rating: 4,
    comment: 'Our custom web application has transformed our internal processes. The team was knowledgeable and collaborative throughout the development process. The only improvement would be more detailed documentation.',
    date: '2024-01-30',
    verified: true
  }
];