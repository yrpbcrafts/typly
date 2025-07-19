export type Gender = 'Male' | 'Female' | 'Other';

export interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: Gender;
  dob: string;
  email: string;
  username: string;
  password: string;
  profileImage: File | string | null;
}
