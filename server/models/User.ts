export default interface User {
  id: number;
  email: string;
  lozinka: string;
  jwt_token?: string;
}
