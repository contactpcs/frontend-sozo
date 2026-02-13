import { redirect } from 'next/navigation';

/**
 * Home Page
 * Redirects to dashboard or login based on auth status
 */
export default function HomePage() {
  redirect('/login');
}
