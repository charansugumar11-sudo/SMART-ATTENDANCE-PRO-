import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  User, UserRole, AppView, StudentView, Student, Subject,
  AttendanceRecord, LeaveRequest, AttendanceStatus, LeaveStatus, TimetableEntry, DayOfWeek
} from './types';
import {
  USERS, STUDENTS, SUBJECTS as INITIAL_SUBJECTS, INITIAL_ATTENDANCE,
  INITIAL_LEAVE_REQUESTS, PREDEFINED_OD_REASONS, TIMETABLE
} from './constants';
import { generateAttendanceSummary } from './services/geminiService';
import { sendSms } from './services/smsService';
import {
  DashboardIcon, SubjectIcon, AttendanceIcon, ReportsIcon, LeaveIcon,
  LogoutIcon, CheckCircleIcon, XCircleIcon, ExclamationCircleIcon,
  UserIcon, LockClosedIcon, EyeIcon, EyeOffIcon, AdminIcon, TeacherIcon,
  StudentIcon, CalendarIcon, PencilIcon, TrashIcon, PlusIcon, ExportIcon, BadgeCheckIcon, ClockIcon, ProfileIcon, MailIcon, PhoneIcon, LocationMarkerIcon, AcademicCapIcon, CakeIcon, IdentificationIcon, BookOpenIcon, UsersIcon, BriefcaseIcon, TenIcon, TwelveIcon, CgpaIcon, CogIcon
} from './components/Icons';
import { PieChartComponent, BarChartComponent } from './components/Recharts';
import { Bar, Pie } from 'recharts';

// Helper to deep copy initial data to prevent state mutation issues between logins
const deepCopy = <T,>(data: T): T => JSON.parse(JSON.stringify(data));

// Helper function to get date string
const getDateString = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};

const PERIOD_TIMES: { [key: number]: string } = {
    1: '8:15 - 9:05 AM',
    2: '9:05 - 9:55 AM',
    3: '10:10 - 11:00 AM',
    4: '11:00 - 11:50 AM',
    5: '11:50 - 12:40 PM',
    6: '1:30 - 2:15 PM',
    7: '2:15 - 3:00 PM',
    8: '3:00 - 3:45 PM',
};

// --- New Theme Engine ---
type Theme = {
  name: string;
  id: string;
  preview: string; // A tailwind class for the swatch
  styles: Record<string, string>;
};

const themes: Theme[] = [
    {
        name: 'Default Light',
        id: 'light',
        preview: 'bg-teal-50',
        styles: {
            '--bg-primary': '#f0fdfa',
            '--bg-secondary': '#ffffff',
            '--bg-card': '#ffffff',
            '--bg-card-secondary': '#f9fafb',
            '--bg-accent': '#2563eb',
            '--bg-accent-hover': '#1d4ed8',
            '--text-primary': '#111827',
            '--text-secondary': '#4b5563',
            '--text-on-accent': '#ffffff',
            '--border-primary': '#e5e7eb',
            '--border-secondary': '#d1d5db',
            '--ring-accent': '#3b82f6',
        },
    },
    {
        name: 'Midnight',
        id: 'dark',
        preview: 'bg-gray-900',
        styles: {
            '--bg-primary': '#111827',
            '--bg-secondary': '#1f2937',
            '--bg-card': '#1f2937',
            '--bg-card-secondary': '#374151',
            '--bg-accent': '#3b82f6',
            '--bg-accent-hover': '#2563eb',
            '--text-primary': '#f9fafb',
            '--text-secondary': '#9ca3af',
            '--text-on-accent': '#ffffff',
            '--border-primary': '#374151',
            '--border-secondary': '#4b5563',
            '--ring-accent': '#60a5fa',
        },
    },
    {
        name: 'Oceanic',
        id: 'ocean',
        preview: 'bg-sky-600',
        styles: {
            '--bg-primary': '#f0f9ff',
            '--bg-secondary': '#e0f2fe',
            '--bg-card': '#ffffff',
            '--bg-card-secondary': '#f0f9ff',
            '--bg-accent': '#0891b2',
            '--bg-accent-hover': '#0e7490',
            '--text-primary': '#0c4a6e',
            '--text-secondary': '#0369a1',
            '--text-on-accent': '#ffffff',
            '--border-primary': '#e0f2fe',
            '--border-secondary': '#bae6fd',
            '--ring-accent': '#38bdf8',
        },
    },
    {
        name: 'Forest',
        id: 'forest',
        preview: 'bg-emerald-600',
        styles: {
            '--bg-primary': '#f0fdf4',
            '--bg-secondary': '#dcfce7',
            '--bg-card': '#ffffff',
            '--bg-card-secondary': '#f0fdf4',
            '--bg-accent': '#16a34a',
            '--bg-accent-hover': '#15803d',
            '--text-primary': '#14532d',
            '--text-secondary': '#166534',
            '--text-on-accent': '#ffffff',
            '--border-primary': '#dcfce7',
            '--border-secondary': '#bbf7d0',
            '--ring-accent': '#4ade80',
        },
    },
    {
        name: 'Sunset',
        id: 'sunset',
        preview: 'bg-amber-500',
        styles: {
            '--bg-primary': '#fff7ed',
            '--bg-secondary': '#ffedd5',
            '--bg-card': '#ffffff',
            '--bg-card-secondary': '#fff7ed',
            '--bg-accent': '#f97316',
            '--bg-accent-hover': '#ea580c',
            '--text-primary': '#78350f',
            '--text-secondary': '#9a3412',
            '--text-on-accent': '#ffffff',
            '--border-primary': '#ffedd5',
            '--border-secondary': '#fed7aa',
            '--ring-accent': '#fb923c',
        },
    },
];


const Card = ({ children, className = '' }: React.PropsWithChildren<{ className?: string; }>) => (
  <div className={`bg-[var(--bg-card)] rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = '', type = 'button', disabled = false }: React.PropsWithChildren<{
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}>) => (
  <button type={type} onClick={onClick} disabled={disabled} className={`px-4 py-2 rounded-md font-semibold text-[var(--text-on-accent)] bg-[var(--bg-accent)] hover:bg-[var(--bg-accent-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--ring-accent)] focus:ring-opacity-50 disabled:bg-gray-400 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}>
    {children}
  </button>
);

const Modal = ({ isOpen, onClose, title, children }: React.PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
}>) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-[var(--bg-card)] rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-4 border-b border-[var(--border-primary)] flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
                    <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-2xl font-bold">&times;</button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
    <input
        ref={ref}
        {...props}
        className={`w-full px-3 py-2 border border-[var(--border-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring-accent)] bg-[var(--bg-secondary)] text-[var(--text-primary)] ${props.className}`}
    />
));

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({ children, ...props }, ref) => (
    <select
        ref={ref}
        {...props}
        className={`w-full px-3 py-2 border border-[var(--border-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring-accent)] bg-[var(--bg-secondary)] text-[var(--text-primary)] ${props.className}`}
    >
        {children}
    </select>
));

const Toast = ({ message, type, isVisible, onClose }: {
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
    onClose: () => void;
}) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, 8000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const baseClasses = 'fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white transition-all duration-300 flex items-center gap-3 z-[100]';
    const typeClasses = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type]}`}>
            {type === 'info' && <ExclamationCircleIcon className="w-5 h-5" />}
            <span>{message}</span>
            <button onClick={onClose} className="text-xl font-light">&times;</button>
        </div>
    );
};


const SimpleMarkdown = ({ text }: { text: string }) => {
    const html = useMemo(() => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\* (.*?)(?:\n|$)/g, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    }, [text]);

    return <div className="prose prose-p:text-[var(--text-primary)] prose-strong:text-[var(--text-primary)] prose-li:text-[var(--text-primary)] max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
};

const ForgotPasswordModal = ({ isOpen, onClose, users }: {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}) => {
  const [role, setRole] = useState<UserRole | ''>('');
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState<'initial' | 'result'>('initial');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRecover = () => {
    setError('');
    setMessage('');
    if (!role || !identifier) {
      setError('Please select your role and enter your identifier.');
      return;
    }

    const user = users.find(u => u.role === role && u.username.trim().toLowerCase() === identifier.trim().toLowerCase());

    if (user) {
      setMessage(`Recovery successful!\nUsername: ${user.username}\nPassword: ${user.password}`);
      setStep('result');
    } else {
      setError('No user found with the provided details. Please check your role and identifier.');
    }
  };

  const handleClose = () => {
    setRole('');
    setIdentifier('');
    setStep('initial');
    setMessage('');
    setError('');
    onClose();
  };

  const roleOptions = [
      { value: UserRole.Admin, label: 'Admin', icon: <AdminIcon /> },
      { value: UserRole.Teacher, label: 'Teacher', icon: <TeacherIcon /> },
      { value: UserRole.Student, label: 'Student', icon: <StudentIcon /> },
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Recover Account">
      {step === 'initial' ? (
        <div className="space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">Please provide your details to recover your credentials. For students, the identifier is your roll number.</p>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">I am a:</label>
            <div className="grid grid-cols-3 gap-3">
               {roleOptions.map(option => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => setRole(option.value)}
                        className={`w-full flex flex-col items-center justify-center p-3 border rounded-lg text-sm font-medium transition-colors ${role === option.value ? 'bg-[var(--bg-accent)] text-[var(--text-on-accent)] ring-2 ring-[var(--ring-accent)]' : 'bg-[var(--bg-card-secondary)] text-[var(--text-primary)] hover:brightness-95'}`}
                    >
                        {React.cloneElement(option.icon, { className: 'w-6 h-6 mb-1' })}
                        {option.label}
                    </button>
                ))}
            </div>
          </div>
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-[var(--text-primary)]">Username / Roll Number</label>
            <Input
              id="identifier"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              placeholder="Enter your unique identifier"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={handleClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800">Cancel</Button>
            <Button onClick={handleRecover}>Recover</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
           <div className="p-4 bg-green-500/10 border-l-4 border-green-400">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-300">Credentials Found</h3>
                        <div className="mt-2 text-sm text-green-200 whitespace-pre-wrap">
                           <p>{message}</p>
                           <p className="mt-2 font-semibold">Please store them securely and consider changing your password after logging in.</p>
                        </div>
                    </div>
                </div>
            </div>
          <div className="flex justify-end">
            <Button onClick={handleClose}>Close</Button>
          </div>
        </div>
      )}
    </Modal>
  );
};


// --- Login Screen ---
const LoginScreen = ({ users, onLogin }: { users: User[], onLogin: (user: User) => void }) => {
    const [role, setRole] = useState<UserRole | ''>(UserRole.Teacher);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);


    useEffect(() => {
        const savedUser = localStorage.getItem('savedUser');
        if (savedUser) {
            const { role, username, password } = JSON.parse(savedUser);
            setRole(role);
            setUsername(username);
            setPassword(password);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!role) {
            setError("Please select a role.");
            return;
        }
        const user = users.find(u => u.role === role && u.username.trim().toLowerCase() === username.trim().toLowerCase() && u.password === password);

        if (user) {
            if (rememberMe) {
                localStorage.setItem('savedUser', JSON.stringify({ role, username, password }));
            } else {
                localStorage.removeItem('savedUser');
            }
            onLogin(user);
        } else {
            setError('Invalid credentials, please try again.');
        }
    };
    
    const roleOptions = [
        { value: UserRole.Admin, label: 'Admin', icon: <AdminIcon /> },
        { value: UserRole.Teacher, label: 'Teacher', icon: <TeacherIcon /> },
        { value: UserRole.Student, label: 'Student', icon: <StudentIcon /> },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--text-primary)]">EASWARI ENGINEERING COLLEGE</h2>
                <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">Sign in to your account</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[var(--bg-card)] py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">I am a:</label>
                            <div className="grid grid-cols-3 gap-3">
                                {roleOptions.map(option => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setRole(option.value)}
                                        className={`w-full flex flex-col items-center justify-center p-3 border rounded-lg text-sm font-medium transition-colors ${role === option.value ? 'bg-[var(--bg-accent)] text-[var(--text-on-accent)] ring-2 ring-[var(--ring-accent)] border-transparent' : 'bg-[var(--bg-card-secondary)] text-[var(--text-primary)] border-[var(--border-secondary)] hover:brightness-95'}`}
                                    >
                                        {React.cloneElement(option.icon, { className: 'w-6 h-6 mb-1' })}
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-[var(--text-primary)]">Username</label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-[var(--text-secondary)]" />
                                </div>
                                <Input type="text" id="username" required value={username} onChange={e => setUsername(e.target.value)} className="pl-10" placeholder="Your username" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-[var(--text-primary)]">Password</label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-[var(--text-secondary)]" />
                                </div>
                                <Input type={showPassword ? 'text' : 'password'} id="password" required value={password} onChange={e => setPassword(e.target.value)} className="pl-10" placeholder="Your password" />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="h-4 w-4 text-[var(--bg-accent)] focus:ring-[var(--ring-accent)] border-[var(--border-secondary)] rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--text-primary)]">Remember me</label>
                            </div>
                            <div className="text-sm">
                                <a href="#" onClick={(e) => { e.preventDefault(); setIsForgotModalOpen(true); }} className="font-medium text-[var(--bg-accent)] hover:brightness-110">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        
                        {error && (
                            <div className="bg-red-500/10 border-l-4 border-red-400 p-4">
                               <div className="flex">
                                  <div className="flex-shrink-0">
                                      <XCircleIcon className="h-5 w-5 text-red-400"/>
                                  </div>
                                  <div className="ml-3">
                                      <p className="text-sm text-red-300">{error}</p>
                                  </div>
                               </div>
                            </div>
                        )}

                        <div>
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                        </div>
                    </form>
                </div>
                 <ForgotPasswordModal
                    isOpen={isForgotModalOpen}
                    onClose={() => setIsForgotModalOpen(false)}
                    users={users}
                />
            </div>
        </div>
    );
};

// --- App ---
const App = () => {
    const [users, setUsers] = useState(() => deepCopy(USERS));
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'info' as 'success' | 'error' | 'info' });

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        const selectedTheme = themes.find(t => t.id === theme) || themes[0];
        const root = document.documentElement;
        Object.entries(selectedTheme.styles).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        localStorage.setItem('theme', theme);
    }, [theme]);

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setToast({ show: true, message, type });
    };

    const handleLogin = (user: User) => {
        // Find the user from the potentially updated 'users' state
        const freshUser = users.find(u => u.id === user.id);
        setCurrentUser(freshUser || user);
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const handlePasswordChange = (userId: string, newPass: string) => {
        setUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, password: newPass } : u));
        setCurrentUser(prevUser => prevUser ? { ...prevUser, password: newPass } : null);
        showToast("Password changed successfully!", "success");
    };

    // Lifted leaveRequests state to top-level so student requests are visible to teachers/admins
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => deepCopy(INITIAL_LEAVE_REQUESTS));

    // NOTE: sentNotifications tracking moved into TeacherAdminApp where absentee markings are performed.

    const handleLeaveAction = (id: string, status: LeaveStatus) => {
        setLeaveRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
    };

    const handleApplyForLeave = (studentId: string, request: Omit<LeaveRequest, 'id'|'studentId'|'status'>) => {
        const newRequest: LeaveRequest = {
            id: `leave-${Date.now()}`,
            studentId,
            status: LeaveStatus.Pending,
            ...request
        };
        setLeaveRequests(prev => [...prev, newRequest]);
    };

    if (!currentUser) {
        return <LoginScreen users={users} onLogin={handleLogin} />;
    }
    
    const commonProps = {
        onLogout: handleLogout,
        theme: theme,
        setTheme: setTheme,
        onPasswordChange: handlePasswordChange,
        showToast: showToast,
    };
    
    let AppContent;
    if (currentUser.role === UserRole.Student) {
        const student = STUDENTS.find(s => s.rollNumber === currentUser.username);
        AppContent = student ? <StudentApp key={student.id} student={student} user={currentUser} leaveRequests={leaveRequests.filter(lr => lr.studentId === student.id)} onApplyLeave={handleApplyForLeave} {...commonProps} /> : <div>Student data not found</div>;
    } else {
        AppContent = <TeacherAdminApp key={currentUser.id} user={currentUser} leaveRequests={leaveRequests} onAction={handleLeaveAction} {...commonProps} />;
    }

    return (
        <>
            {AppContent}
            <Toast
                isVisible={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(prev => ({...prev, show: false}))}
            />
        </>
    );
};

const Sidebar = ({ user, view, setView, onLogout, navItems }: {
    user: User;
    view: string;
    // FIX: Changed type to `any` to be compatible with `useState` setters for different view types.
    setView: (view: any) => void;
    onLogout: () => void;
    navItems: { id: string; label: string; icon: React.ReactNode }[];
}) => (
    <aside className="w-64 bg-[var(--bg-secondary)] text-[var(--text-primary)] flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-[var(--border-primary)] flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--bg-accent)] rounded-full flex items-center justify-center font-bold text-[var(--text-on-accent)]">
                {user.name.charAt(0)}
            </div>
            <div>
                <h2 className="font-semibold">{user.name}</h2>
                <span className="text-xs bg-green-500 px-2 py-0.5 rounded-full text-white">{user.role}</span>
            </div>
        </div>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {navItems.map(item => (
                <a
                    key={item.id}
                    href="#"
                    onClick={(e) => { e.preventDefault(); setView(item.id); }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === item.id ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'}`}
                >
                    {item.icon}
                    {item.label}
                </a>
            ))}
        </nav>
        <div className="p-2 border-t border-[var(--border-primary)]">
            <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
            >
                <LogoutIcon />
                Logout
            </button>
        </div>
    </aside>
);

// --- Teacher/Admin App ---
// FIX: Use React.FC to correctly type the component and allow the `key` prop.
const TeacherAdminApp: React.FC<{ user: User, onLogout: () => void, theme: string, setTheme: (t: string) => void, onPasswordChange: (id: string, pass: string) => void, showToast: (message: string, type?: 'success' | 'error' | 'info') => void, leaveRequests: LeaveRequest[], onAction: (id: string, status: LeaveStatus) => void }> = ({ user, onLogout, theme, setTheme, onPasswordChange, showToast, leaveRequests, onAction }) => {
    const [view, setView] = useState<AppView>('dashboard');
    
    // FIX: Initialize state with a deep copy of constants to prevent mutation issues across logins.
    const [students, setStudents] = useState<Student[]>(() => deepCopy(STUDENTS));
    const [allSubjects, setAllSubjects] = useState<Subject[]>(() => deepCopy(INITIAL_SUBJECTS));
    const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => deepCopy(INITIAL_ATTENDANCE));
    // leaveRequests and onAction are now provided by parent App and should be used directly.

    // sentNotifications scoped to TeacherAdminApp: track notifications sent per student per date
    const [sentNotifications, setSentNotifications] = useState<Record<string, Record<string, { dayNotified: boolean; periodsNotified: number[] }>>>(() => ({}));

    const updateStudent = (updatedStudent: Student) => {
        setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
        showToast('Student details updated successfully!', 'success');
    };

    const subjectsForCurrentUser = useMemo(() => {
        if (user.role === UserRole.Admin) {
            return allSubjects;
        }
        if (user.role === UserRole.Teacher) {
            const subjectName = user.name.replace(' Faculty', '');
            const teacherSubject = allSubjects.find(s => s.name.trim().toLowerCase() === subjectName.trim().toLowerCase());
            return teacherSubject ? [teacherSubject] : [];
        }
        return [];
    }, [user, allSubjects]);

    const baseNavItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { id: 'attendance', label: 'Attendance', icon: <AttendanceIcon /> },
        { id: 'reports', label: 'Reports', icon: <ReportsIcon /> },
        { id: 'leave', label: 'Leave Requests', icon: <LeaveIcon /> },
    ];
    
    const navItems = [
        ...(user.role === UserRole.Admin ? [
            ...baseNavItems.slice(0, 1),
            { id: 'subjects', label: 'Subjects', icon: <SubjectIcon /> },
            ...baseNavItems.slice(1),
            { id: 'timetable', label: 'Timetable', icon: <CalendarIcon /> },
            { id: 'manageStudents', label: 'Manage Students', icon: <UsersIcon /> },
        ] : baseNavItems),
        { id: 'settings', label: 'Settings', icon: <CogIcon /> },
    ];

    const handleStudentMarkedAbsent = useCallback(async (studentId: string, subjectId: string, period: number | null, date: string) => {
        const student = students.find(s => s.id === studentId);
        const subject = allSubjects.find(s => s.id === subjectId);

        if (student && subject) {
            // Build message components
            const periodText = period ? `Period ${period} (${PERIOD_TIMES[period]})` : null;

            // sentNotifications tracks whether we already sent a day-level or period-level SMS for a student on a date
            // shape: { [studentId]: { [dateString]: { dayNotified: boolean, periodsNotified: Set<number> } } }
            // We'll store this in component state (see below initialization).

            const studentNotifs = sentNotifications[studentId] || {};
            const dayEntry = studentNotifs[date] || { dayNotified: false, periodsNotified: [] as number[] };

            // Rule: If the absent marking is for period 1 (first hour), send a single 'absent today' SMS
            // and mark dayNotified = true (suppress further period messages).
            // Otherwise (absent in later periods), send a period-specific SMS only if dayNotified !== true.

            let messageBody: string | null = null;
            let sentType: 'day' | 'period' | null = null;

            if (period === 1) {
                if (!dayEntry.dayNotified) {
                    messageBody = `Dear Parent, your ward ${student.name} was marked absent today (${date}). Please contact the school for details.`;
                    sentType = 'day';
                    dayEntry.dayNotified = true;
                }
            } else {
                // period is null or >1
                if (!dayEntry.dayNotified) {
                    const p = period || 0;
                    // Use a temporary Set for checks and mutation, but keep state as an array
                    const periodsSet = new Set<number>(dayEntry.periodsNotified || []);
                    if (!periodsSet.has(p)) {
                        if (periodText) {
                            messageBody = `Dear Parent, your ward ${student.name} was marked absent for ${periodText} on ${date}. Please contact the school for details.`;
                        } else {
                            messageBody = `Dear Parent, your ward ${student.name} was marked absent on ${date}. Please contact the school for details.`;
                        }
                        sentType = 'period';
                        periodsSet.add(p);
                        // write back the array form
                        dayEntry.periodsNotified = Array.from(periodsSet);
                    }
                }
            }

            // Save back into sentNotifications state if we will send
            if (sentType) {
                setSentNotifications(prev => {
                    const copy = { ...prev };
                    copy[studentId] = { ...(copy[studentId] || {}) };
                    // we need to serialize Set to an array for state storage
                    const existing = (copy[studentId][date] && { ...copy[studentId][date] }) || { dayNotified: false, periodsNotified: [] as number[] };
                    existing.dayNotified = dayEntry.dayNotified;
                    existing.periodsNotified = Array.isArray(dayEntry.periodsNotified) ? dayEntry.periodsNotified : [];
                    copy[studentId][date] = existing as any;
                    return copy;
                });

                try {
                    const result = await sendSms({
                        to: student.parentPhoneNumber,
                        body: messageBody as string,
                    });

                    if (result.success) {
                        showToast(`SMS sent to parent of ${student.name} (${student.parentPhoneNumber}).`, 'success');
                    } else {
                        showToast(`Failed to send SMS to parent of ${student.name}: ${result.message}`, 'error');
                    }
                } catch (error) {
                    showToast(`An error occurred while trying to send SMS.`, 'error');
                }
            }
        }
    }, [students, allSubjects, showToast, sentNotifications, setSentNotifications]);

    // Admin functions now operate on `allSubjects` state
    const addSubject = (name: string) => {
        const newSubject: Subject = { id: `sub-${Date.now()}`, name };
        setAllSubjects(prev => [...prev, newSubject]);
    };
    const updateSubject = (id: string, name: string) => {
        setAllSubjects(prev => prev.map(s => s.id === id ? { ...s, name } : s));
    };
    const deleteSubject = (id: string) => {
        setAllSubjects(prev => prev.filter(s => s.id !== id));
    };
    
    const saveAttendance = (records: Omit<AttendanceRecord, 'id'>[]) => {
        const newRecords = records.map(r => ({...r, id: `att-${Date.now()}-${r.studentId}`}));
        
        setAttendance(prev => {
            const otherDayRecords = prev.filter(r => !records.some(nr => nr.date === r.date && nr.subjectId === r.subjectId));
            return [...otherDayRecords, ...newRecords];
        });
    };
    
    const handleLeaveRequest = onAction;
    
    const viewTitleMap: Record<AppView, string> = {
        dashboard: 'Dashboard',
        subjects: 'Subjects',
        attendance: 'Attendance',
        reports: 'Reports',
        leave: 'Leave Requests',
        timetable: 'Timetable',
        manageStudents: 'Manage Students',
        settings: 'Settings',
    };

    const renderView = () => {
        switch (view) {
            case 'dashboard': return <DashboardView user={user} allSubjects={allSubjects} students={students} attendance={attendance} leaveRequests={leaveRequests} timetable={TIMETABLE} />;
            case 'subjects': return <SubjectsView user={user} subjects={subjectsForCurrentUser} addSubject={addSubject} updateSubject={updateSubject} deleteSubject={deleteSubject} />;
            case 'attendance': return <AttendanceView user={user} students={students} subjects={subjectsForCurrentUser} attendance={attendance} saveAttendance={saveAttendance} onStudentMarkedAbsent={handleStudentMarkedAbsent}/>;
            case 'reports': return <ReportsView students={students} subjects={allSubjects} attendance={attendance} />;
            case 'leave': return <LeaveView students={students} leaveRequests={leaveRequests} onAction={handleLeaveRequest} />;
            case 'timetable': return <TimetableView subjects={allSubjects} timetable={TIMETABLE} />;
            case 'manageStudents': return <ManageStudentsView students={students} updateStudent={updateStudent} />;
            case 'settings': return <SettingsView user={user} onPasswordChange={onPasswordChange} theme={theme} setTheme={setTheme} showToast={showToast} />;
            default: return <div>Select a view</div>;
        }
    };
    
    return (
        <div className="flex h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-primary)]">
            <Sidebar user={user} view={view} setView={setView} onLogout={onLogout} navItems={navItems} />
            <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">{viewTitleMap[view]}</h1>
                {renderView()}
            </main>
        </div>
    );
};

// --- Student App ---
const StudentApp: React.FC<{ student: Student, user: User, onLogout: () => void, theme: string, setTheme: (t: string) => void, onPasswordChange: (id: string, pass: string) => void, showToast: (message: string, type?: 'success' | 'error' | 'info') => void, leaveRequests: LeaveRequest[], onApplyLeave: (studentId: string, req: Omit<LeaveRequest, 'id'|'studentId'|'status'>) => void }> = ({ student, user, onLogout, theme, setTheme, onPasswordChange, showToast, leaveRequests, onApplyLeave }) => {
    const [view, setView] = useState<StudentView>('dashboard');

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { id: 'profile', label: 'My Profile', icon: <ProfileIcon /> },
        { id: 'timetable', label: 'My Timetable', icon: <CalendarIcon /> },
        { id: 'leave', label: 'My Leave', icon: <LeaveIcon /> },
        { id: 'settings', label: 'Settings', icon: <CogIcon /> },
    ];
    
    const applyForLeave = (request: Omit<LeaveRequest, 'id' | 'studentId' | 'status'>) => {
        onApplyLeave(student.id, request);
    };

    const renderView = () => {
        switch (view) {
            case 'dashboard': return <StudentDashboardView student={student} attendance={INITIAL_ATTENDANCE} subjects={INITIAL_SUBJECTS} setView={setView} />;
            case 'leave': return <StudentLeaveView requests={leaveRequests} onApply={applyForLeave} />;
            case 'profile': return <StudentProfileView student={student} />;
            case 'timetable': return <StudentTimetablePage subjects={INITIAL_SUBJECTS} timetable={TIMETABLE} />;
            case 'settings': return <SettingsView user={user} onPasswordChange={onPasswordChange} theme={theme} setTheme={setTheme} showToast={showToast} />;
            default: return <div>Select a view</div>;
        }
    };
    
    const viewTitles: { [key in StudentView]: string } = {
        dashboard: 'Dashboard',
        profile: 'My Profile',
        timetable: 'My Timetable',
        leave: 'My Leave',
        settings: 'Settings',
    };

    return (
        <div className="flex h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-primary)]">
            <Sidebar user={user} view={view} setView={setView} onLogout={onLogout} navItems={navItems} />
            <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">{viewTitles[view]}</h1>
                {renderView()}
            </main>
        </div>
    );
};

// --- Settings View ---
const SettingsView = ({ user, onPasswordChange, theme, setTheme, showToast }: {
    user: User;
    onPasswordChange: (userId: string, newPass: string) => void;
    theme: string;
    setTheme: (theme: string) => void;
    showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentPassword !== user.password) {
            showToast("Current password is incorrect.", "error");
            return;
        }
        if (newPassword.length < 6) {
            showToast("New password must be at least 6 characters long.", "error");
            return;
        }
        if (newPassword !== confirmPassword) {
            showToast("New passwords do not match.", "error");
            return;
        }
        onPasswordChange(user.id, newPassword);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Card>
                <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Change Password</h3>
                <form onSubmit={handlePasswordSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">Current Password</label>
                        <Input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">New Password</label>
                        <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">Confirm New Password</label>
                        <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Save Password</Button>
                    </div>
                </form>
            </Card>

            <Card>
                <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Appearance</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">Choose how the application looks. Your preference will be saved for your next visit.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                     {themes.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={`p-2 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-card)] focus:ring-[var(--ring-accent)] ${
                                theme === t.id
                                ? 'border-[var(--bg-accent)]'
                                : 'border-[var(--border-secondary)] hover:border-[var(--ring-accent)]'
                            }`}
                        >
                            <div className={`w-full h-12 rounded ${t.preview} mb-2 border border-black/10`}></div>
                            <span className="text-sm font-medium text-[var(--text-primary)]">{t.name}</span>
                        </button>
                    ))}
                </div>
            </Card>
        </div>
    );
};


// --- Teacher/Admin Views ---
const ManageStudentsView = ({ students, updateStudent }: {
    students: Student[];
    updateStudent: (student: Student) => void;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState<Student | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredStudents = useMemo(() => {
        if (!searchQuery) return students;
        return students.filter(s =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.rollNumber.includes(searchQuery)
        );
    }, [students, searchQuery]);

    const openEditModal = (student: Student) => {
        setEditingStudent(student);
        setFormData(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingStudent(null);
        setFormData(null);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (formData) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            updateStudent(formData);
            closeModal();
        }
    };
    
    const FormSection = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
        <div className="mt-6">
            <h4 className="text-lg font-semibold text-[var(--text-secondary)] border-b border-[var(--border-primary)] pb-2 mb-4">{title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    );

    const FormInput = ({ label, name, value }: { label: string, name: string, value?: string }) => (
        <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)]">{label}</label>
            <Input name={name} value={value || ''} onChange={handleFormChange} />
        </div>
    );

    return (
        <Card>
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Search by name or roll number..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[var(--bg-card-secondary)]">
                        <tr>
                            <th className="p-3 font-semibold text-[var(--text-primary)]">Roll Number</th>
                            <th className="p-3 font-semibold text-[var(--text-primary)]">Name</th>
                            <th className="p-3 font-semibold text-[var(--text-primary)]">Email</th>
                            <th className="p-3 font-semibold text-[var(--text-primary)]">Mobile</th>
                            <th className="p-3 font-semibold text-[var(--text-primary)] text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id} className="border-b border-[var(--border-primary)] hover:bg-[var(--bg-card-secondary)]">
                                <td className="p-3 text-[var(--text-primary)]">{student.rollNumber}</td>
                                <td className="p-3 font-medium text-[var(--text-primary)]">{student.name}</td>
                                <td className="p-3 text-[var(--text-primary)]">{student.officialEmail || student.studentEmail}</td>
                                <td className="p-3 text-[var(--text-primary)]">{student.studentMobile}</td>
                                <td className="p-3 text-center">
                                    <button onClick={() => openEditModal(student)} className="text-[var(--bg-accent)] hover:brightness-125" title="Edit">
                                        <PencilIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && editingStudent && formData && (
                <Modal isOpen={isModalOpen} onClose={closeModal} title={`Edit Details for ${editingStudent.name}`}>
                    <form onSubmit={handleSave} className="max-h-[70vh] overflow-y-auto pr-2">
                        <FormSection title="Personal Information">
                            <FormInput label="Name" name="name" value={formData.name} />
                            <FormInput label="Roll Number" name="rollNumber" value={formData.rollNumber} />
                            <FormInput label="Registration Number" name="regNumber" value={formData.regNumber} />
                            <FormInput label="Date of Birth" name="dob" value={formData.dob} />
                            <FormInput label="Gender" name="gender" value={formData.gender} />
                            <FormInput label="Student Mobile" name="studentMobile" value={formData.studentMobile} />
                            <FormInput label="Student Email" name="studentEmail" value={formData.studentEmail} />
                            <FormInput label="Official Email" name="officialEmail" value={formData.officialEmail} />
                            <FormInput label="Aadhar Number" name="aadhar" value={formData.aadhar} />
                            <FormInput label="Religion" name="religion" value={formData.religion} />
                            <FormInput label="Community" name="community" value={formData.community} />
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-[var(--text-secondary)]">Address</label>
                                <textarea name="address" value={formData.address || ''} onChange={handleFormChange} className="w-full mt-1 px-3 py-2 border border-[var(--border-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring-accent)] bg-[var(--bg-secondary)]" rows={2}></textarea>
                            </div>
                        </FormSection>

                        <FormSection title="Academic Information">
                            <FormInput label="Admission Quota" name="quota" value={formData.quota} />
                            <FormInput label="10th Percentage" name="tenthPercentage" value={formData.tenthPercentage} />
                            <FormInput label="12th Percentage" name="twelfthPercentage" value={formData.twelfthPercentage} />
                            <FormInput label="Semester 1 CGPA" name="sem1Cgpa" value={formData.sem1Cgpa} />
                            <FormInput label="Semester 2 CGPA" name="sem2Cgpa" value={formData.sem2Cgpa} />
                            <FormInput label="Overall CGPA" name="overallCgpa" value={formData.overallCgpa} />
                        </FormSection>

                        <FormSection title="Family Information">
                            <FormInput label="Father's Name" name="fatherName" value={formData.fatherName} />
                            <FormInput label="Father's Mobile" name="fatherMobile" value={formData.fatherMobile} />
                            <FormInput label="Father's Occupation" name="fatherOccupation" value={formData.fatherOccupation} />
                            <FormInput label="Mother's Name" name="motherName" value={formData.motherName} />
                            <FormInput label="Mother's Mobile" name="motherMobile" value={formData.motherMobile} />
                            <FormInput label="Mother's Occupation" name="motherOccupation" value={formData.motherOccupation} />
                             <FormInput label="Parent's Phone (Primary)" name="parentPhoneNumber" value={formData.parentPhoneNumber} />
                            <div className="md:col-span-2">
                                <FormInput label="Sibling Details" name="siblingDetails" value={formData.siblingDetails} />
                            </div>
                        </FormSection>

                        <div className="mt-6 pt-4 border-t border-[var(--border-primary)] flex justify-end gap-2">
                            <Button type="button" onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800">Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </Modal>
            )}
        </Card>
    );
};

const DashboardView = ({ user, students, allSubjects, attendance, leaveRequests, timetable }: {
    user: User;
    students: Student[];
    allSubjects: Subject[];
    attendance: AttendanceRecord[];
    leaveRequests: LeaveRequest[];
    timetable: TimetableEntry[];
}) => {
    const teacherSubject = useMemo(() => {
        if (user.role === UserRole.Teacher) {
            const subjectName = user.name.replace(' Faculty', '');
            return allSubjects.find(s => s.name.trim().toLowerCase() === subjectName.trim().toLowerCase());
        }
        return null;
    }, [user, allSubjects]);
    
    const getStudentName = useCallback((id: string) => students.find(s => s.id === id)?.name || 'Unknown', [students]);

    if (user.role === UserRole.Admin) {
        const totalTeachers = USERS.filter(u => u.role === UserRole.Teacher).length;
        
        const todayStr = getDateString();
        const todaysRecords = attendance.filter(r => r.date === todayStr);
        const overallPieData = [
            { name: 'Present', value: todaysRecords.filter(r => r.status === 'present' || r.status === 'od').length },
            { name: 'Absent', value: todaysRecords.filter(r => r.status === 'absent').length },
        ];
        const pieColors = ['#10B981', '#EF4444'];
        
        const subjectPerformanceData = useMemo(() => {
            return allSubjects.map(subject => {
                const subjectRecords = attendance.filter(r => r.subjectId === subject.id);
                const present = subjectRecords.filter(r => r.status === 'present' || r.status === 'od').length;
                const total = subjectRecords.length || 1;
                const percentage = (present / total) * 100;
                return { 
                    name: subject.name.split(' ').slice(0, 2).join(' '),
                    Attendance: parseFloat(percentage.toFixed(1)) 
                };
            });
        }, [attendance, allSubjects]);

        const studentsAtRisk = useMemo(() => {
            const studentStats = students.map(student => {
                const records = attendance.filter(r => r.studentId === student.id);
                if (records.length < 5) return null; // Only consider students with some data
                const present = records.filter(r => r.status === 'present' || r.status === 'od').length;
                const percentage = (present / records.length) * 100;
                return { name: student.name, percentage };
            });
            return studentStats.filter(s => s && s.percentage < 75).sort((a,b) => a.percentage - b.percentage).slice(0, 5);
        }, [attendance, students]);

        const pendingLeaves = leaveRequests.filter(l => l.status === LeaveStatus.Pending).slice(0,5);

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-full"><StudentIcon className="w-8 h-8 text-blue-500" /></div>
                        <div><p className="text-[var(--text-secondary)]">Total Students</p><p className="text-2xl font-bold text-[var(--text-primary)]">{students.length}</p></div>
                    </Card>
                    <Card className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-full"><TeacherIcon className="w-8 h-8 text-purple-500" /></div>
                        <div><p className="text-[var(--text-secondary)]">Total Teachers</p><p className="text-2xl font-bold text-[var(--text-primary)]">{totalTeachers}</p></div>
                    </Card>
                    <Card className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/10 rounded-full"><SubjectIcon className="w-8 h-8 text-indigo-500" /></div>
                        <div><p className="text-[var(--text-secondary)]">Total Subjects</p><p className="text-2xl font-bold text-[var(--text-primary)]">{allSubjects.length}</p></div>
                    </Card>
                    <Card className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/10 rounded-full"><LeaveIcon className="w-8 h-8 text-yellow-500" /></div>
                        <div><p className="text-[var(--text-secondary)]">Pending Leaves</p><p className="text-2xl font-bold text-[var(--text-primary)]">{leaveRequests.filter(l => l.status === LeaveStatus.Pending).length}</p></div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                         <Card>
                            <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Subject Performance (Overall Attendance %)</h3>
                            <BarChartComponent data={subjectPerformanceData} bars={[{ key: 'Attendance', color: 'var(--bg-accent)' }]} />
                        </Card>
                    </div>
                    <div className="space-y-6">
                         <Card>
                             <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Today's Snapshot</h3>
                             {todaysRecords.length > 0 ? (
                                <PieChartComponent data={overallPieData} colors={pieColors} />
                             ) : (
                                <p className="text-center text-[var(--text-secondary)] py-10">No attendance marked today.</p>
                             )}
                         </Card>
                         <Card>
                            <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Students at Risk (&lt;75%)</h3>
                            {studentsAtRisk.length > 0 ? (
                                <ul className="space-y-2">
                                    {studentsAtRisk.map(s => s && (
                                        <li key={s.name} className="flex justify-between items-center text-sm p-2 bg-red-500/10 rounded">
                                            <span className="text-[var(--text-primary)]">{s.name}</span>
                                            <span className="font-bold text-red-500">{s.percentage.toFixed(1)}%</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (<p className="text-sm text-center text-[var(--text-secondary)] py-4">No students are currently at risk.</p>)}
                         </Card>
                          <Card>
                            <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Pending Leave Requests</h3>
                            {pendingLeaves.length > 0 ? (
                                <ul className="space-y-2">
                                    {pendingLeaves.map(req => (
                                        <li key={req.id} className="text-sm p-2 bg-yellow-500/10 rounded">
                                            <p className="font-semibold text-[var(--text-primary)]">{getStudentName(req.studentId)}</p>
                                            <p className="text-xs text-[var(--text-secondary)]">{req.startDate} to {req.endDate}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (<p className="text-sm text-center text-[var(--text-secondary)] py-4">No pending requests.</p>)}
                         </Card>
                    </div>
                </div>
            </div>
        );
    }
    
    // Teacher's Dashboard
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayOfWeek;
    const teachersSubjectId = teacherSubject?.id;
    const todaySchedule = timetable
        .filter(t => t.day === today && t.subjectId === teachersSubjectId)
        .sort((a,b) => a.period - b.period);

    const { presentToday, absentToday, odToday } = useMemo(() => {
        const todayStr = getDateString();
        const records = attendance.filter(a => a.date === todayStr && a.subjectId === teachersSubjectId);
        return {
            presentToday: records.filter(a => a.status === AttendanceStatus.Present).length,
            absentToday: records.filter(a => a.status === AttendanceStatus.Absent).length,
            odToday: records.filter(a => a.status === AttendanceStatus.OD).length,
        }
    }, [attendance, teachersSubjectId]);

    const pieData = [
        { name: 'Present', value: presentToday },
        { name: 'Absent', value: absentToday },
        { name: 'OD', value: odToday },
    ];
    const pieColors = ['#10B981', '#EF4444', '#F59E0B'];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <p className="text-[var(--text-secondary)]">My Subject</p>
                    <p className="text-xl font-bold truncate text-[var(--text-primary)]">{teacherSubject?.name}</p>
                </Card>
                <Card>
                    <p className="text-[var(--text-secondary)]">Present Today</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)]">{presentToday}</p>
                </Card>
                <Card>
                    <p className="text-[var(--text-secondary)]">Absent Today</p>
                    <p className="text-2xl font-bold text-red-500">{absentToday}</p>
                </Card>
            </div>

            <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
                    <ClockIcon className="w-5 h-5 text-[var(--text-secondary)]"/> Today's Schedule ({today})
                </h3>
                {todaySchedule.length > 0 ? (
                    <ul className="divide-y divide-[var(--border-primary)]">
                        {todaySchedule.map(item => (
                            <li key={item.period} className="py-3 flex justify-between items-center">
                                <div className='flex flex-col'>
                                    <span className="font-semibold text-[var(--text-primary)]">Period {item.period}</span>
                                    <span className="text-xs text-[var(--text-secondary)]">{PERIOD_TIMES[item.period]}</span>
                                </div>
                                <span className="text-[var(--text-primary)]">{teacherSubject?.name}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-[var(--text-secondary)] p-8">No classes scheduled for today.</div>
                )}
            </Card>

             <Card>
                <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Today's Attendance Status</h3>
                {presentToday + absentToday + odToday > 0 ? (
                    <PieChartComponent data={pieData} colors={pieColors} />
                ) : (
                    <div className="text-center text-[var(--text-secondary)] p-8">No attendance marked for your subject yet today.</div>
                )}
            </Card>
        </div>
    );
};

const SubjectsView = ({ user, subjects, addSubject, updateSubject, deleteSubject }: {
    user: User;
    subjects: Subject[];
    addSubject: (name: string) => void;
    updateSubject: (id: string, name: string) => void;
    deleteSubject: (id: string) => void;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
    const [subjectName, setSubjectName] = useState('');

    const openAddModal = () => {
        setEditingSubject(null);
        setSubjectName('');
        setIsModalOpen(true);
    };

    const openEditModal = (subject: Subject) => {
        setEditingSubject(subject);
        setSubjectName(subject.name);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (subjectName.trim()) {
            if (editingSubject) {
                updateSubject(editingSubject.id, subjectName.trim());
            } else {
                addSubject(subjectName.trim());
            }
            setIsModalOpen(false);
        }
    };
    
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {user.role === UserRole.Admin ? 'Manage Subjects' : 'My Subject'}
                </h3>
                 {user.role === UserRole.Admin && (
                    <Button onClick={openAddModal}><PlusIcon/> Add Subject</Button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[var(--bg-card-secondary)]">
                        <tr>
                            <th className="p-3 text-[var(--text-primary)] font-semibold">Subject Name</th>
                            {user.role === UserRole.Admin && <th className="p-3 text-[var(--text-primary)] font-semibold">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(subject => (
                            <tr key={subject.id} className="border-b border-[var(--border-primary)]">
                                <td className="p-3 text-[var(--text-primary)]">{subject.name}</td>
                                 {user.role === UserRole.Admin && (
                                     <td className="p-3 flex gap-2">
                                        <button onClick={() => openEditModal(subject)} className="text-blue-500 hover:text-blue-700" title="Edit"><PencilIcon/></button>
                                        <button onClick={() => deleteSubject(subject.id)} className="text-red-500 hover:text-red-700" title="Delete"><TrashIcon/></button>
                                    </td>
                                )}
                            </tr>
                        ))}
                         {subjects.length === 0 && (
                            <tr>
                                <td colSpan={2} className="text-center p-4 text-[var(--text-secondary)]">No subjects found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSubject ? 'Edit Subject' : 'Add Subject'}>
                <div className="space-y-4">
                    <label className="text-[var(--text-secondary)]">
                        Subject Name
                        <Input value={subjectName} onChange={e => setSubjectName(e.target.value)} placeholder="e.g., Data Structures" />
                    </label>
                    <div className="flex justify-end gap-2">
                         <Button onClick={() => setIsModalOpen(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800">Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </div>
                </div>
            </Modal>
        </Card>
    );
};

const AttendanceView = ({ user, students, subjects, attendance, saveAttendance, onStudentMarkedAbsent }: {
    user: User;
    students: Student[];
    subjects: Subject[];
    attendance: AttendanceRecord[];
    saveAttendance: (records: Omit<AttendanceRecord, 'id'>[]) => void;
    onStudentMarkedAbsent: (studentId: string, subjectId: string, period: number | null, date: string) => void;
}) => {
    const [selectedDate, setSelectedDate] = useState(getDateString());
    const [localAttendance, setLocalAttendance] = useState<Map<string, { status: AttendanceStatus, odReason?: string }>>(new Map());
    const [isOdModalOpen, setIsOdModalOpen] = useState(false);
    const [currentStudentForOd, setCurrentStudentForOd] = useState<Student | null>(null);
    const [odReason, setOdReason] = useState('');

    // Admin View State
    const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.id || '');
    
    // Teacher View State
    const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
    const teacherSubject = useMemo(() => user.role === UserRole.Teacher ? subjects[0] : null, [user, subjects]);
    
    const dayOfWeek = useMemo(() => {
        const date = new Date(selectedDate + 'T12:00:00Z'); // Use noon UTC to avoid timezone shifts
        return date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }) as DayOfWeek;
    }, [selectedDate]);


    const scheduleForDay = useMemo(() => {
        if (!teacherSubject) return [];
        return TIMETABLE
            .filter(t => t.day === dayOfWeek && t.subjectId === teacherSubject.id)
            .sort((a,b) => a.period - b.period);
    }, [dayOfWeek, teacherSubject]);

    useEffect(() => {
        // Ensure selectedSubject is valid for the current list of subjects
        if (user.role === UserRole.Admin && !subjects.find(s => s.id === selectedSubject)) {
            setSelectedSubject(subjects[0]?.id || '');
        }
    }, [subjects, selectedSubject, user.role]);


    useEffect(() => {
        const subjectId = user.role === UserRole.Admin ? selectedSubject : teacherSubject?.id;
        const canLoad = user.role === UserRole.Admin ? subjectId : subjectId && selectedPeriod;
        
        if (canLoad) {
            const existingRecords = attendance.filter(r => r.date === selectedDate && r.subjectId === subjectId);
            const newMap = new Map();
            students.forEach(student => {
                const record = existingRecords.find(r => r.studentId === student.id);
                newMap.set(student.id, { 
                    status: record?.status || AttendanceStatus.Present,
                    odReason: record?.odReason
                });
            });
            setLocalAttendance(newMap);
        } else {
            setLocalAttendance(new Map());
        }
    }, [selectedSubject, selectedDate, attendance, students, user.role, teacherSubject, selectedPeriod]);
    
     useEffect(() => {
        setSelectedPeriod(null);
    }, [selectedDate]);

    const handleStatusChange = (student: Student, status: AttendanceStatus) => {
        const oldStatus = localAttendance.get(student.id)?.status;
        const subjectId = user.role === UserRole.Admin ? selectedSubject : teacherSubject?.id;

        if (status === AttendanceStatus.Absent && oldStatus !== AttendanceStatus.Absent) {
            if (subjectId) {
                const period = user.role === UserRole.Admin ? null : selectedPeriod;
                onStudentMarkedAbsent(student.id, subjectId, period, selectedDate);
            }
        }

        if (status === AttendanceStatus.OD) {
            setCurrentStudentForOd(student);
            const existingReason = localAttendance.get(student.id)?.odReason || '';
            setOdReason(existingReason);
            setIsOdModalOpen(true);
        } else {
            setLocalAttendance(prev => new Map(prev).set(student.id, { ...prev.get(student.id)!, status, odReason: undefined }));
        }
    };
    
    const handleSaveOdReason = () => {
        if (currentStudentForOd) {
            setLocalAttendance(prev => new Map(prev).set(currentStudentForOd.id, { status: AttendanceStatus.OD, odReason: odReason.trim() }));
            setIsOdModalOpen(false);
            setCurrentStudentForOd(null);
            setOdReason('');
        }
    };

    const handleSave = () => {
        const subjectId = user.role === UserRole.Admin ? selectedSubject : teacherSubject?.id;
        if (!subjectId) {
            alert('Please select a subject.');
            return;
        }
        const recordsToSave: Omit<AttendanceRecord, 'id'>[] = [];
        localAttendance.forEach(({ status, odReason }, studentId) => {
            recordsToSave.push({ studentId, subjectId, date: selectedDate, status, odReason });
        });
        saveAttendance(recordsToSave);
        alert('Attendance saved successfully!');
    };
    
    const AttendanceTable = () => (
         <>
            <div className="overflow-x-auto mt-4">
                <table className="w-full text-left">
                     <thead className="bg-[var(--bg-card-secondary)]">
                        <tr>
                            <th className="p-3 text-[var(--text-primary)]">Roll No</th>
                            <th className="p-3 text-[var(--text-primary)]">Student Name</th>
                            <th className="p-3 text-center text-[var(--text-primary)]">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students && students.length > 0 ? (
                            students.map(student => (
                                <tr key={student.id} className="border-b border-[var(--border-primary)] hover:bg-[var(--bg-card-secondary)]">
                                    <td className="p-3 text-sm text-[var(--text-secondary)]">{student.rollNumber}</td>
                                    <td className="p-3 font-medium text-[var(--text-primary)]">{student.name}</td>
                                    <td className="p-3">
                                        <div className="flex justify-center gap-2">
                                            {(Object.values(AttendanceStatus)).map(status => (
                                                <button key={status} onClick={() => handleStatusChange(student, status)}
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full capitalize transition-transform transform hover:scale-110 ${
                                                        localAttendance.get(student.id)?.status === status
                                                        ? (status === 'present' ? 'bg-green-500 text-white shadow' : status === 'absent' ? 'bg-red-500 text-white shadow' : 'bg-yellow-500 text-white shadow')
                                                        : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                                                    }`}
                                                >
                                                    {status}
                                                     {status === 'od' && localAttendance.get(student.id)?.odReason && '✓'}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))
                         ) : (
                            <tr>
                                <td colSpan={3} className="text-center p-4 text-[var(--text-secondary)]">No students found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 flex justify-end">
                <Button onClick={handleSave}>Save Attendance</Button>
            </div>
         </>
    );

    return (
        <Card>
            {user.role === UserRole.Admin ? (
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">Subject</label>
                        <Select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                            {subjects.length === 0 && <option>No subjects available</option>}
                            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </Select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">Date</label>
                        <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">Date</label>
                        <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">Select a Period for {dayOfWeek}</label>
                         {scheduleForDay.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                               {scheduleForDay.map(item => (
                                   <button key={item.period} onClick={() => setSelectedPeriod(item.period)}
                                       className={`px-4 py-2 rounded-md font-semibold text-sm flex flex-col items-center ${selectedPeriod === item.period ? 'bg-[var(--bg-accent)] text-[var(--text-on-accent)]' : 'bg-[var(--bg-card-secondary)] text-[var(--text-primary)] hover:brightness-95'}`}>
                                       <span>Period {item.period}</span>
                                       <span className="font-normal text-xs">({PERIOD_TIMES[item.period]})</span>
                                   </button>
                               ))}
                            </div>
                        ) : (
                           <p className="text-[var(--text-secondary)] text-sm mt-1">No classes scheduled for {teacherSubject?.name} on this day.</p>
                        )}
                    </div>
                </div>
            )}
            
            {(user.role === UserRole.Admin && selectedSubject) || (user.role === UserRole.Teacher && selectedPeriod !== null) ? (
                <AttendanceTable />
            ) : (
                <div className="text-center p-8 text-[var(--text-secondary)]">
                    {user.role === UserRole.Admin ? "Please select a subject to view attendance." : "Please select a period to mark attendance."}
                </div>
            )}
            
            <Modal isOpen={isOdModalOpen} onClose={() => setIsOdModalOpen(false)} title={`OD Reason for ${currentStudentForOd?.name}`}>
                 <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">Select a predefined reason or enter a custom one.</label>
                        <Select className="mb-2" value={odReason} onChange={e => setOdReason(e.target.value)}>
                            <option value="">-- Select Reason --</option>
                            {PREDEFINED_OD_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                        </Select>
                        <textarea value={odReason} onChange={e => setOdReason(e.target.value)} className="w-full px-3 py-2 border border-[var(--border-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring-accent)] bg-[var(--bg-secondary)]" rows={2} placeholder="Or type a custom reason..."></textarea>
                     </div>
                    <div className="flex justify-end gap-2">
                        <Button onClick={() => setIsOdModalOpen(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800">Cancel</Button>
                        <Button onClick={handleSaveOdReason}>Save Reason</Button>
                    </div>
                 </div>
            </Modal>
        </Card>
    );
};

const ReportsView = ({ students, subjects, attendance }: {
    students: Student[];
    subjects: Subject[];
    attendance: AttendanceRecord[];
}) => {
    const [startDate, setStartDate] = useState(getDateString(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)));
    const [endDate, setEndDate] = useState(getDateString());
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const filteredRecords = useMemo(() => {
        return attendance.filter(r => r.date >= startDate && r.date <= endDate);
    }, [attendance, startDate, endDate]);

    const handleGenerateSummary = async () => {
        setIsLoading(true);
        setSummary('');
        const result = await generateAttendanceSummary(filteredRecords, students, subjects, { start: startDate, end: endDate });
        setSummary(result);
        setIsLoading(false);
    };

    const barChartData = useMemo(() => {
        return subjects.map(subject => {
            const subjectRecords = filteredRecords.filter(r => r.subjectId === subject.id);
            const present = subjectRecords.filter(r => r.status === 'present' || r.status === 'od').length;
            const total = subjectRecords.length || 1;
            const percentage = (present / total) * 100;
            return {
                name: subject.name.split(' ').slice(0, 2).join(' '),
                attendance: parseFloat(percentage.toFixed(2)),
            };
        });
    }, [filteredRecords, subjects]);

    const studentPerformance = useMemo(() => {
        const studentStats = students.map(student => {
            const records = filteredRecords.filter(r => r.studentId === student.id);
            const present = records.filter(r => r.status === 'present' || r.status === 'od').length;
            const percentage = records.length > 0 ? (present / records.length) * 100 : 100;
            return { name: student.name, percentage };
        });
        studentStats.sort((a, b) => b.percentage - a.percentage);
        const topPerformers = studentStats.slice(0, 3);
        const atRisk = studentStats.filter(s => s.percentage < 85).sort((a,b) => a.percentage - b.percentage).slice(0, 3);
        return { topPerformers, atRisk };
    }, [filteredRecords, students]);

    return (
        <div className="space-y-6">
            <Card>
                <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Generate AI Summary</h3>
                <div className="flex flex-col md:flex-row items-end gap-4 mb-4">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">Start Date</label>
                        <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">End Date</label>
                        <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </div>
                    <Button onClick={handleGenerateSummary} disabled={isLoading} className="w-full md:w-auto">
                        {isLoading ? 'Generating...' : 'Generate Summary'}
                    </Button>
                </div>
                {isLoading && <div className="text-center p-4 text-[var(--text-primary)]">Loading summary...</div>}
                {summary && (
                    <div className="mt-4 p-4 bg-[var(--bg-card-secondary)] rounded-md border border-[var(--border-primary)] text-[var(--text-primary)]">
                        <h4 className="font-bold text-[var(--text-primary)] mb-2">AI-Powered Insights</h4>
                        <SimpleMarkdown text={summary} />
                    </div>
                )}
            </Card>
            
            <Card>
                <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Student Spotlight ({startDate} to {endDate})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-green-500 mb-2">High Flyers (Top Attendance)</h4>
                        <ul className="space-y-2">
                            {studentPerformance.topPerformers.map(s => (
                                <li key={s.name} className="flex justify-between p-2 bg-green-500/10 rounded-md text-[var(--text-primary)]">
                                    <span>{s.name}</span>
                                    <span className="font-bold">{s.percentage.toFixed(1)}%</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-red-500 mb-2">Students at Risk (Low Attendance)</h4>
                        {studentPerformance.atRisk.length > 0 ? (
                            <ul className="space-y-2">
                                {studentPerformance.atRisk.map(s => (
                                    <li key={s.name} className="flex justify-between p-2 bg-red-500/10 rounded-md text-[var(--text-primary)]">
                                        <span>{s.name}</span>
                                        <span className="font-bold">{s.percentage.toFixed(1)}%</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-[var(--text-secondary)] p-2">No students currently at risk. Great job!</p>
                        )}
                    </div>
                </div>
            </Card>

            <Card>
                <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Subject Attendance (%)</h3>
                <BarChartComponent data={barChartData} bars={[{ key: 'attendance', color: 'var(--bg-accent)' }]} />
            </Card>
        </div>
    );
};


const LeaveView = ({ students, leaveRequests, onAction }: {
    students: Student[];
    leaveRequests: LeaveRequest[];
    onAction: (id: string, status: LeaveStatus) => void;
}) => {
    const [filterName, setFilterName] = useState('');
    const getStudentName = useCallback((id: string) => students.find(s => s.id === id)?.name || 'Unknown', [students]);
    
    const filteredRequests = useMemo(() => {
        if (!filterName) return leaveRequests;
        return leaveRequests.filter(req => 
            getStudentName(req.studentId).toLowerCase().includes(filterName.toLowerCase())
        );
    }, [leaveRequests, filterName, getStudentName]);

    const groupedRequests = useMemo(() => {
        // FIX: Replaced the grouping logic with a properly typed `reduce` function. This ensures that `groupedRequests`
        // has a well-defined type of `Record<string, LeaveRequest[]>`, resolving the runtime error when calling `.map`
        // on its entries.
        return filteredRequests.reduce<Record<string, LeaveRequest[]>>((acc, req) => {
            const studentId = req.studentId;
            (acc[studentId] = acc[studentId] || []).push(req);
            return acc;
        }, {});
    }, [filteredRequests]);
    
    const statusColor = {
        [LeaveStatus.Pending]: 'bg-yellow-500/10 text-yellow-500',
        [LeaveStatus.Approved]: 'bg-green-500/10 text-green-500',
        [LeaveStatus.Rejected]: 'bg-red-500/10 text-red-500',
    };
    
    return (
        <div className="space-y-6">
             <Card>
                <Input 
                    type="text" 
                    placeholder="Filter by student name..."
                    value={filterName}
                    onChange={e => setFilterName(e.target.value)}
                />
             </Card>
            
            {Object.keys(groupedRequests).length > 0 ? (
                // FIX: Replaced `Object.entries` with `Object.keys` to avoid type inference issues where the `requests` array was being typed as `unknown`.
                Object.keys(groupedRequests).map(studentId => {
                    const requests = groupedRequests[studentId];
                    return (
                        <Card key={studentId}>
                            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)] flex items-center gap-2">
                               <StudentIcon className="w-6 h-6 text-[var(--text-secondary)]" />
                               {getStudentName(studentId)}
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-[var(--bg-card-secondary)] text-xs uppercase text-[var(--text-secondary)]">
                                        <tr>
                                            <th className="p-3">Dates</th>
                                            <th className="p-3">Reason</th>
                                            <th className="p-3">Type</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.map(req => (
                                            <tr key={req.id} className="border-b border-[var(--border-primary)]">
                                                <td className="p-3 text-sm text-[var(--text-primary)] whitespace-nowrap">{req.startDate} to {req.endDate}</td>
                                                <td className="p-3 text-sm text-[var(--text-primary)] max-w-xs">{req.reason}</td>
                                                <td className="p-3">{req.isOd ? <BadgeCheckIcon className="text-blue-500" title="On-Duty" /> : <CalendarIcon className="text-[var(--text-secondary)]" title="Leave" />}</td>
                                                <td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor[req.status]}`}>{req.status}</span></td>
                                                <td className="p-3">
                                                    {req.status === LeaveStatus.Pending && (
                                                        <div className="flex justify-center gap-2">
                                                            <button onClick={() => onAction(req.id, LeaveStatus.Approved)} className="text-green-500 hover:text-green-700" title="Approve"><CheckCircleIcon /></button>
                                                            <button onClick={() => onAction(req.id, LeaveStatus.Rejected)} className="text-red-500 hover:text-red-700" title="Reject"><XCircleIcon /></button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    );
                })
            ) : (
                <Card>
                    <p className="text-center text-[var(--text-secondary)] p-4">No leave requests found.</p>
                </Card>
            )}
        </div>
    );
};

const TimetableView = ({ subjects, timetable }: { subjects: Subject[], timetable: TimetableEntry[] }) => {
    const subjectMap = useMemo(() => new Map(subjects.map(s => [s.id, s.name])), [subjects]);
    const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const periods = Array.from({ length: 8 }, (_, i) => i + 1);

    const scheduleGrid = useMemo(() => {
        const grid: { [key: number]: { [key in DayOfWeek]?: string } } = {};
        periods.forEach(p => grid[p] = {});
        timetable.forEach(entry => {
            if (grid[entry.period] && days.includes(entry.day)) {
                grid[entry.period][entry.day] = subjectMap.get(entry.subjectId) || 'Unknown';
            }
        });
        
        days.forEach(day => {
            // Iterate through periods to find empty slots after a class
            for (let period = 2; period <= periods.length; period++) {
                // If the current slot is empty but the previous one was not
                if (!grid[period][day] && grid[period - 1][day]) {
                    // To avoid creating triple-periods, check if the previous two periods were already the same subject.
                    // This handles cases like 'CN' on Friday which is already a double period.
                    if (period > 2 && grid[period - 2][day] === grid[period - 1][day]) {
                        continue; // Don't extend an existing double period.
                    }
                    // Fill the empty slot with the subject from the previous period.
                    grid[period][day] = grid[period - 1][day];
                }
            }
        });

        return grid;
    }, [timetable, subjectMap, periods]);
    
    return (
        <Card>
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Weekly Class Timetable</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse border border-[var(--border-secondary)]">
                    <thead className="bg-[var(--bg-card-secondary)]">
                        <tr>
                            <th className="p-2 border border-[var(--border-secondary)] font-semibold text-[var(--text-primary)]">Period / Day</th>
                            {days.map(day => <th key={day} className="p-2 border border-[var(--border-secondary)] font-semibold text-[var(--text-primary)]">{day}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {periods.map(period => (
                            <tr key={period}>
                                <td className="p-2 border border-[var(--border-secondary)] font-semibold bg-[var(--bg-card-secondary)]">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="font-bold text-[var(--text-primary)]">Period {period}</span>
                                        <span className="text-xs font-normal text-[var(--text-secondary)]">{PERIOD_TIMES[period]}</span>
                                    </div>
                                </td>
                                {days.map(day => (
                                    <td key={`${day}-${period}`} className="p-2 border border-[var(--border-secondary)] h-24 text-sm text-[var(--text-primary)]">
                                        {scheduleGrid[period]?.[day] || ''}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

// --- Student Views ---
const StudentDashboardView = ({ student, attendance, subjects, setView }: {
    student: Student;
    attendance: AttendanceRecord[];
    subjects: Subject[];
    setView: (view: StudentView) => void;
}) => {
    const studentAttendance = attendance.filter(a => a.studentId === student.id);
    const totalDays = studentAttendance.length;
    const presentDays = studentAttendance.filter(a => a.status === AttendanceStatus.Present || a.status === AttendanceStatus.OD).length;
    const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 'N/A';

    const subjectWiseAttendance = useMemo(() => {
        return subjects.map(subject => {
            const subjectRecords = studentAttendance.filter(a => a.subjectId === subject.id);
            const total = subjectRecords.length;
            const present = subjectRecords.filter(a => a.status === 'present' || a.status === 'od').length;
            const percentage = total > 0 ? (present / total) * 100 : 100; // Default to 100 if no records
            return { name: subject.name, percentage: parseFloat(percentage.toFixed(2)) };
        });
    }, [studentAttendance, subjects]);

    return (
        <div className="space-y-6">
            <Card>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">Welcome, {student.name}!</h3>
                        <p className="text-[var(--text-secondary)]">Here's your attendance summary.</p>
                    </div>
                    <Button onClick={() => setView('profile')} className="bg-[var(--bg-card-secondary)] text-[var(--text-primary)] hover:brightness-95">
                        <ProfileIcon className="w-5 h-5" /> View Profile
                    </Button>
                </div>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-full"><BadgeCheckIcon className="w-8 h-8 text-green-500" /></div>
                    <div>
                        <p className="text-[var(--text-secondary)]">Overall Attendance</p>
                        <p className="text-2xl font-bold text-[var(--text-primary)]">{attendancePercentage}%</p>
                    </div>
                </Card>
                <Card className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Subject-wise Attendance</h3>
                     <ul className="space-y-4">
                        {subjectWiseAttendance.map(sub => (
                            <li key={sub.name}>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2">
                                        {sub.name}
                                        {sub.percentage < 75 && <ExclamationCircleIcon className="w-5 h-5 text-red-500" title="Low Attendance Warning" />}
                                    </p>
                                    <p className={`text-sm font-semibold ${sub.percentage < 75 ? 'text-red-500' : 'text-green-500'}`}>{sub.percentage}%</p>
                                </div>
                                <div className="w-full bg-[var(--bg-card-secondary)] rounded-full h-2.5">
                                    <div 
                                        className={`h-2.5 rounded-full ${sub.percentage < 75 ? 'bg-red-500' : 'bg-green-500'}`} 
                                        style={{ width: `${sub.percentage}%` }}>
                                    </div>
                                </div>
                                {sub.percentage < 75 && (
                                    <p className="text-xs text-red-500 mt-1">Your attendance for this subject is below 75%. Please attend classes regularly.</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => (
    <div className="flex items-start py-3">
        <div className="flex-shrink-0 w-8 text-[var(--text-secondary)]">{icon}</div>
        <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>
            <p className="text-md font-bold text-[var(--text-primary)]">{value || 'N/A'}</p>
        </div>
    </div>
);

const AcademicInfoCard = ({ label, value, icon }: { label: string, value?: string, icon: React.ReactNode }) => (
    <div className="flex items-center gap-4 p-4 bg-[var(--bg-card-secondary)] rounded-lg">
        <div className="p-2 bg-blue-500/10 text-blue-500 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">{value || 'N/A'}</p>
        </div>
    </div>
);

const StudentTimetableView = ({ subjects, timetable }: { subjects: Subject[], timetable: TimetableEntry[] }) => {
    const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
    const subjectMap = useMemo(() => new Map(subjects.map(s => [s.id, s.name])), [subjects]);
    const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const periods = Array.from({ length: 8 }, (_, i) => i + 1);

    const scheduleForDay = useMemo(() => {
        const dayTimetable = timetable.filter(entry => entry.day === selectedDay);
        const schedule: { [key: number]: string | null } = {};

        periods.forEach(p => {
            const entry = dayTimetable.find(e => e.period === p);
            schedule[p] = entry ? subjectMap.get(entry.subjectId) || 'Unknown' : null;
        });
        
        // Handle double periods
        for (let period = 2; period <= periods.length; period++) {
            if (!schedule[period] && schedule[period - 1]) {
                 if (period > 2 && schedule[period - 2] === schedule[period - 1]) {
                    continue; 
                }
                schedule[period] = schedule[period - 1];
            }
        }

        return periods.map(p => ({
            period: p,
            time: PERIOD_TIMES[p],
            subject: schedule[p]
        }));
    }, [selectedDay, timetable, subjectMap, periods]);

    return (
        <div>
            <div className="mb-4 border-b border-[var(--border-primary)]">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {days.map(day => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`${
                                selectedDay === day
                                    ? 'border-[var(--bg-accent)] text-[var(--bg-accent)]'
                                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-secondary)]'
                            } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
                        >
                            {day}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {scheduleForDay.map(({ period, time, subject }) => (
                    <div key={period} className={`p-4 rounded-lg shadow-sm ${subject ? 'bg-indigo-500/5 border-l-4 border-indigo-400' : 'bg-[var(--bg-card-secondary)] border-l-4 border-[var(--border-secondary)]'}`}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-[var(--text-primary)]">Period {period}</span>
                            <span className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1"><ClockIcon className="w-4 h-4" /> {time}</span>
                        </div>
                        <p className={`text-lg font-semibold ${subject ? 'text-indigo-800' : 'text-[var(--text-secondary)]'}`}>
                            {subject || 'Free Period'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StudentTimetablePage = ({ subjects, timetable }: { subjects: Subject[], timetable: TimetableEntry[] }) => (
    <Card>
        <StudentTimetableView subjects={subjects} timetable={timetable} />
    </Card>
);

const StudentProfileView = ({ student }: { student: Student }) => {
    return (
        <div className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-500/5 to-indigo-500/5">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-32 h-32 bg-[var(--bg-card-secondary)] rounded-full flex items-center justify-center ring-4 ring-[var(--bg-card)] shadow-lg">
                        <UserIcon className="w-20 h-20 text-[var(--text-secondary)]" />
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-[var(--text-primary)]">{student.name}</h2>
                        <p className="text-[var(--text-secondary)]">Roll No: <span className="font-bold text-[var(--text-primary)]">{student.rollNumber}</span></p>
                        <p className="text-[var(--text-secondary)] text-sm">Reg No: <span className="font-bold text-[var(--text-primary)]">{student.regNumber || 'N/A'}</span></p>
                        <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-4">
                            <span className="flex items-center gap-1.5 text-[var(--text-primary)] font-bold text-sm"><MailIcon className="w-4 h-4 text-[var(--text-secondary)] font-normal"/> {student.officialEmail || 'N/A'}</span>
                            <span className="flex items-center gap-1.5 text-[var(--text-primary)] font-bold text-sm"><PhoneIcon className="w-4 h-4 text-[var(--text-secondary)] font-normal"/> {student.studentMobile || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                     <Card>
                        <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)] flex items-center gap-2"><BookOpenIcon/> Academic Information</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <AcademicInfoCard label="10th %" value={student.tenthPercentage} icon={<TenIcon/>} />
                            <AcademicInfoCard label="12th %" value={student.twelfthPercentage} icon={<TwelveIcon/>} />
                            <AcademicInfoCard label="Sem 1 CGPA" value={student.sem1Cgpa} icon={<CgpaIcon/>} />
                            <AcademicInfoCard label="Sem 2 CGPA" value={student.sem2Cgpa} icon={<CgpaIcon/>} />
                        </div>
                    </Card>
                    <Card>
                        <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)] flex items-center gap-2"><UsersIcon/> Family Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                             <div className="border-b md:border-b-0 md:border-r border-[var(--border-primary)] md:pr-6 pb-4 md:pb-0 mb-4 md:mb-0">
                                <h4 className="font-semibold text-lg text-[var(--text-secondary)] mb-2">Father's Details</h4>
                                <InfoRow icon={<UserIcon />} label="Name" value={student.fatherName} />
                                <InfoRow icon={<BriefcaseIcon />} label="Occupation" value={student.fatherOccupation} />
                                <InfoRow icon={<PhoneIcon />} label="Mobile" value={student.fatherMobile} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-[var(--text-secondary)] mb-2">Mother's Details</h4>
                                <InfoRow icon={<UserIcon />} label="Name" value={student.motherName} />
                                <InfoRow icon={<BriefcaseIcon />} label="Occupation" value={student.motherOccupation} />
                                <InfoRow icon={<PhoneIcon />} label="Mobile" value={student.motherMobile} />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[var(--border-primary)]">
                             <InfoRow icon={<UsersIcon />} label="Sibling Details" value={student.siblingDetails} />
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                     <Card>
                        <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)] flex items-center gap-2"><ProfileIcon/> Personal Details</h3>
                        <div className="divide-y divide-[var(--border-primary)]">
                            <InfoRow icon={<CakeIcon />} label="Date of Birth" value={student.dob} />
                            <InfoRow icon={<IdentificationIcon />} label="Aadhar Number" value={student.aadhar} />
                            <InfoRow icon={<AcademicCapIcon />} label="Admission Quota" value={student.quota} />
                            <InfoRow icon={<UserIcon />} label="Religion" value={student.religion} />
                            <InfoRow icon={<UsersIcon />} label="Community" value={student.community} />
                             <InfoRow icon={<LocationMarkerIcon />} label="Address" value={student.address} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const StudentLeaveView = ({ requests, onApply }: {
    requests: LeaveRequest[];
    onApply: (req: Omit<LeaveRequest, 'id'|'studentId'|'status'>) => void;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState(getDateString());
    const [endDate, setEndDate] = useState(getDateString());
    const [reason, setReason] = useState('');
    const [isOd, setIsOd] = useState(false);

    const handleApply = () => {
        if(reason.trim()) {
            onApply({ startDate, endDate, reason, isOd });
            setIsModalOpen(false);
            setReason('');
        }
    };
    
    const statusColor = {
        [LeaveStatus.Pending]: 'bg-yellow-500/10 text-yellow-500',
        [LeaveStatus.Approved]: 'bg-green-500/10 text-green-500',
        [LeaveStatus.Rejected]: 'bg-red-500/10 text-red-500',
    };
    
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">My Leave History</h3>
                <Button onClick={() => setIsModalOpen(true)}><PlusIcon /> Apply for Leave</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                     <thead className="bg-[var(--bg-card-secondary)]">
                        <tr>
                            <th className="p-3 text-[var(--text-primary)]">Dates</th>
                            <th className="p-3 text-[var(--text-primary)]">Reason</th>
                            <th className="p-3 text-[var(--text-primary)]">Type</th>
                            <th className="p-3 text-[var(--text-primary)]">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req.id} className="border-b border-[var(--border-primary)]">
                                <td className="p-3 text-[var(--text-secondary)]">{req.startDate} to {req.endDate}</td>
                                <td className="p-3 max-w-xs truncate text-[var(--text-secondary)]">{req.reason}</td>
                                <td className="p-3 flex justify-center">{req.isOd ? <BadgeCheckIcon className="w-6 h-6 text-blue-500" title="On-Duty" /> : <CalendarIcon className="w-6 h-6 text-[var(--text-secondary)]" title="Leave"/>}</td>
                                <td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor[req.status]}`}>{req.status}</span></td>
                            </tr>
                        ))}
                         {requests.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center p-4 text-[var(--text-secondary)]">No leave requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Apply for Leave/OD">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">Start Date</label>
                        <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">End Date</label>
                        <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate}/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)]">Reason</label>
                        <textarea value={reason} onChange={e => setReason(e.target.value)} className="w-full px-3 py-2 border border-[var(--border-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring-accent)] bg-[var(--bg-secondary)]" rows={3}></textarea>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="isOd" checked={isOd} onChange={e => setIsOd(e.target.checked)} className="h-4 w-4 text-[var(--bg-accent)] focus:ring-[var(--ring-accent)] border-[var(--border-secondary)] rounded" />
                        <label htmlFor="isOd" className="ml-2 block text-sm text-[var(--text-primary)]">This is an On-Duty (OD) request</label>
                    </div>
                    <div className="flex justify-end gap-2">
                         <Button onClick={() => setIsModalOpen(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800">Cancel</Button>
                        <Button onClick={handleApply}>Submit</Button>
                    </div>
                </div>
            </Modal>
        </Card>
    );
};

export default App;