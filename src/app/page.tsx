import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

/**
 * Home Page
 * Redirects to dashboard or login based on auth status
 */
export default async function HomePage() {
  // Check for auth token in cookies (server-side)
  const cookieStore = await cookies();
  const authToken = cookieStore.get('sozo_auth_token')?.value;
  
  // Redirect based on authentication status
  if (authToken) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
