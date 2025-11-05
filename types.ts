// FIX: Removed self-import of `UserRole` which was causing a circular dependency and compilation errors.
export enum UserRole {
  Teacher = 'teacher',
  Student = 'student',
  Admin = 'admin',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  username: string;
  password: string; // In a real app, this would be a hash
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  parentPhoneNumber: string;
  // New fields
  regNumber?: string;
  dob?: string;
  fatherName?: string;
  fatherMobile?: string;
  motherName?: string;
  motherMobile?: string;
  studentMobile?: string;
  studentEmail?: string;
  officialEmail?: string;
  address?: string;
  gender?: string;
  tenthPercentage?: string;
  twelfthPercentage?: string;
  sem1Cgpa?: string;
  sem2Cgpa?: string;
  overallCgpa?: string;
  aadhar?: string;
  quota?: string;
  religion?: string;
  community?: string;
  fatherOccupation?: string;
  motherOccupation?: string;
  siblingDetails?: string;
}

export interface Subject {
  id: string;
  name: string;
}

export enum AttendanceStatus {
  Present = 'present',
  Absent = 'absent',
  OD = 'od',
}

export interface AttendanceRecord {
  id:string;
  studentId: string;
  subjectId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  odReason?: string;
}

export enum LeaveStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  reason: string;
  status: LeaveStatus;
  isOd: boolean;
}

export type AppView = 'dashboard' | 'subjects' | 'attendance' | 'reports' | 'leave' | 'timetable' | 'manageStudents' | 'settings';
export type StudentView = 'dashboard' | 'leave' | 'profile' | 'timetable' | 'settings';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface TimetableEntry {
  day: DayOfWeek;
  period: number;
  subjectId: string;
}