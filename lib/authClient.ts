export async function checkAuth() {
  try {
    const response = await fetch('/api/auth/user');
    if (response.ok) {
      const user = await response.json();
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
}