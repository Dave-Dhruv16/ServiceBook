export const APP_NAME = "ServiceBook";
export const CURRENCY = "USD";
export const MAX_BOOKING_DAYS_ADVANCE = 30;

export const HERO_TITLE = "Discover & Book Local Services";
export const HERO_SUBTITLE = "From beauty to home repairs. Find trusted professionals and book your service in seconds.";

export const SECRET_KEY = process.env.NEXT_PUBLIC_PAYLOAD_SECRET || 'default-secret-key';

export const NAV_LINKS = [
  { href: "/services", label: "Find Services" },
  { href: "/providers", label: "Find Providers" },
  { href: "/how-it-works", label: "How it Works" },
];

export const ROLES = {
  ADMIN: "ADMIN",
  PROVIDER: "PROVIDER",
  CUSTOMER: "CUSTOMER",
} as const;

export const DASHBOARD_ROUTES = {
  [ROLES.ADMIN]: "/admin/dashboard",
  [ROLES.PROVIDER]: "/provider/dashboard",
  [ROLES.CUSTOMER]: "/customer/dashboard",
} as const;

export interface Provider {
  id: string;
  name: string;
  profession: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  price: number;
  availability: string;
  joinedDate: string;
}

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    profession: "Dermatologist",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 4.8,
    reviewCount: 124,
    location: "New York, NY",
    price: 150,
    availability: "Mon - Fri, 9am - 5pm",
    joinedDate: "2020",
  },
  {
    id: "2",
    name: "John's Barbershop",
    profession: "Barber",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    rating: 4.5,
    reviewCount: 89,
    location: "Brooklyn, NY",
    price: 40,
    availability: "Tue - Sat, 10am - 8pm",
    joinedDate: "2019",
  },
  {
    id: "3",
    name: "Emily Davis",
    profession: "Nutritionist",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    rating: 4.9,
    reviewCount: 200,
    location: "Online",
    price: 100,
    availability: "Mon - Thu, 8am - 4pm",
    joinedDate: "2021",
  },
  {
    id: "4",
    name: "Tech Fix",
    profession: "IT Consultant",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
    rating: 4.7,
    reviewCount: 56,
    location: "San Francisco, CA",
    price: 120,
    availability: "Mon - Fri, 9am - 6pm",
    joinedDate: "2022",
  },
];

export const PROVIDER_LINKS = [
  { href: DASHBOARD_ROUTES.PROVIDER, label: "Dashboard", icon: "LayoutDashboard" },
  { href: `${DASHBOARD_ROUTES.PROVIDER}/appointments`, label: "Appointments", icon: "Calendar" },
  { href: `${DASHBOARD_ROUTES.PROVIDER}/services`, label: "Services", icon: "Briefcase" },
  { href: `${DASHBOARD_ROUTES.PROVIDER}/availability`, label: "Availability", icon: "Clock" },
  { href: `${DASHBOARD_ROUTES.PROVIDER}/blocked-dates`, label: "Blocked Dates", icon: "ShieldAlert" },
  { href: `${DASHBOARD_ROUTES.PROVIDER}/reviews`, label: "Reviews", icon: "Users" },
  { href: `${DASHBOARD_ROUTES.PROVIDER}/analytics`, label: "Analytics", icon: "BarChart" },
  { href: `${DASHBOARD_ROUTES.PROVIDER}/profile`, label: "Profile", icon: "Settings" },
];

export const ADMIN_LINKS = [
  { href: DASHBOARD_ROUTES.ADMIN, label: "Overview", icon: "LayoutDashboard" },
  { href: `${DASHBOARD_ROUTES.ADMIN}/providers`, label: "Providers", icon: "Briefcase" },
  { href: `${DASHBOARD_ROUTES.ADMIN}/users`, label: "Users", icon: "Users" },
  { href: `${DASHBOARD_ROUTES.ADMIN}/appointments`, label: "All Appointments", icon: "Calendar" },
  { href: `${DASHBOARD_ROUTES.ADMIN}/reviews`, label: "Reviews", icon: "ShieldAlert" },
  { href: `${DASHBOARD_ROUTES.ADMIN}/settings`, label: "Settings", icon: "Settings" },
];

export const CUSTOMER_LINKS = [
  { href: DASHBOARD_ROUTES.CUSTOMER, label: "Dashboard", icon: "LayoutDashboard" },
  { href: `${DASHBOARD_ROUTES.CUSTOMER}/appointments`, label: "My Bookings", icon: "Calendar" },
  { href: `${DASHBOARD_ROUTES.CUSTOMER}/profile`, label: "Profile", icon: "User" },
  { href: "/services", label: "Find Services", icon: "Search" },
  { href: "/providers", label: "Find Providers", icon: "Users" },
];

export interface Appointment {
  id: string;
  providerId: string;
  providerName: string;
  service: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  price: number;
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    providerId: "1",
    providerName: "Dr. Sarah Johnson",
    service: "Dermatology Consultation",
    date: "2024-03-15",
    time: "10:00 AM",
    status: "upcoming",
    price: 150,
  },
  {
    id: "apt-2",
    providerId: "2",
    providerName: "John's Barbershop",
    service: "Haircut & Beard Trim",
    date: "2024-03-10",
    time: "02:00 PM",
    status: "completed",
    price: 40,
  },
  {
    id: "apt-3",
    providerId: "3",
    providerName: "Emily Davis",
    service: "Follow-up Session",
    date: "2024-03-20",
    time: "11:00 AM",
    status: "upcoming",
    price: 100,
  },
];

// MOCK DATA

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  providerId: string;
  providerName: string;
  category: string;
}

export const MOCK_SERVICES: Service[] = [
  {
    id: "s1",
    name: "General Dermatology Consultation",
    description: "Comprehensive skin examination and consultation.",
    price: 150,
    duration: 30,
    providerId: "1",
    providerName: "Dr. Sarah Johnson",
    category: "Medical"
  },
  {
    id: "s2",
    name: "Acne Treatment",
    description: "Specialized treatment for active acne and scarring.",
    price: 200,
    duration: 45,
    providerId: "1",
    providerName: "Dr. Sarah Johnson",
    category: "Medical"
  },
  {
    id: "s3",
    name: "Men's Haircut",
    description: "Classic cut with styling and hot towel finish.",
    price: 40,
    duration: 30,
    providerId: "2",
    providerName: "John's Barbershop",
    category: "Salon"
  },
  {
    id: "s4",
    name: "Beard Trim & Shape",
    description: "Professional beard grooming.",
    price: 25,
    duration: 15,
    providerId: "2",
    providerName: "John's Barbershop",
    category: "Salon"
  },
  {
    id: "s5",
    name: "Nutrition Planning Session",
    description: "Personalized diet plan and nutritional assessment.",
    price: 100,
    duration: 60,
    providerId: "3",
    providerName: "Emily Davis",
    category: "Health"
  },
  {
    id: "s6",
    name: "Computer Repair / Diagnostic",
    description: "Full system diagnostic and repair estimate.",
    price: 80,
    duration: 60,
    providerId: "4",
    providerName: "Tech Fix",
    category: "Consulting"
  }
];
