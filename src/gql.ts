export function register(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }
}
