# Admin Panel - Complete File Structure

## Project Structure Overview

```
habbah/
├── admin/                          # Admin panel root
│   ├── layout.tsx                  # Admin layout wrapper
│   ├── page.tsx                    # Main dashboard
│   ├── head.tsx                    # Metadata
│   ├── login/
│   │   └── page.tsx                # Login page
│   ├── messages/
│   │   └── page.tsx                # Messages management
│   ├── cms/
│   │   ├── page.tsx                # CMS management
│   │   └── [pageId]/
│   │       └── page.tsx            # Edit page (future)
│
├── src/components/admin/           # Admin components
│   ├── Sidebar.tsx                 # Navigation sidebar
│   ├── DashboardTab.tsx            # Dashboard content
│   ├── MessagesTab.tsx             # Messages management
│   ├── JobsTab.tsx                 # Jobs management
│   ├── CandidatesTab.tsx           # Candidates management
│   ├── VolunteersTab.tsx           # Volunteers management
│   └── Toast.tsx                   # Notifications
│
├── ADMIN_PANEL_README.md           # Comprehensive documentation
├── ADMIN_QUICK_START.md            # Quick start guide
├── ADMIN_FILE_STRUCTURE.md         # This file
```

## Component Details

### Admin Pages

#### 1. **admin/page.tsx**
- **Purpose**: Main admin dashboard
- **Features**:
  - Tab navigation (Dashboard, Messages, Jobs, Candidates, Volunteers, CMS)
  - Statistics overview
  - Responsive layout
  - Toast notifications
- **State Management**: Handles all admin data using React hooks
- **Mock Data**: Includes sample data for testing

#### 2. **admin/login/page.tsx**
- **Purpose**: Admin authentication page
- **Features**:
  - Email/password login form
  - Show/hide password toggle
  - Error handling
  - Loading states
  - Demo credentials display
- **Demo Credentials**:
  - Email: `admin@habbah.org`
  - Password: `admin123`

#### 3. **admin/cms/page.tsx**
- **Purpose**: Content Management System
- **Features**:
  - Manage website pages
  - Page statistics (views, status, author)
  - Create/Edit/Delete pages
  - Status badges
  - Performance metrics

#### 4. **admin/messages/page.tsx**
- **Purpose**: Message management
- **Note**: Redirects to dashboard messages tab

### Admin Components

#### 1. **Sidebar.tsx**
```tsx
interface SidebarProps {
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}
```
- **Features**:
  - Responsive navigation
  - Mobile hamburger menu
  - Active state highlighting
  - Jobs submenu
  - Logout functionality
- **Mobile**: Collapses on screens < 768px

#### 2. **DashboardTab.tsx**
```tsx
interface DashboardTabProps {
  stats: {
    totalMessages: number;
    totalJobs: number;
    totalCandidates: number;
    totalVolunteers: number;
    unreadMessages: number;
  };
  recentMessages: Message[];
  recentJobs: Job[];
}
```
- **Features**:
  - Statistics cards with icons
  - Recent messages list
  - Recent jobs list
  - Trending indicators
  - Quick stats overview

#### 3. **MessagesTab.tsx**
```tsx
interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read";
}

interface MessagesTabProps {
  messages: Message[];
  onDelete: (id: number) => void;
  onMarkAsRead: (id: number) => void;
}
```
- **Features**:
  - Message list with unread count
  - Expandable message details
  - Bulk selection
  - Delete functionality
  - Status badges
  - Show more/less toggle

#### 4. **JobsTab.tsx**
```tsx
interface Job {
  id: number;
  title: string;
  department: string;
  description: string;
  location: string;
  postedDate: string;
  status: "active" | "closed" | "draft";
  applications: number;
}

interface JobsTabProps {
  jobs: Job[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
```
- **Features**:
  - Job listing with filters
  - Status badges (active/closed/draft)
  - Application counter
  - Location display
  - Edit/Delete/View actions
  - Filter by status

#### 5. **CandidatesTab.tsx**
```tsx
interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  location: string;
  appliedDate: string;
  status: "pending" | "interview" | "hired" | "rejected";
  resume?: string;
}

interface CandidatesTabProps {
  candidates: Candidate[];
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}
```
- **Features**:
  - Candidate listing
  - Status management dropdown
  - Contact information
  - Resume links
  - Filter by status
  - Bulk actions

#### 6. **VolunteersTab.tsx**
```tsx
interface Volunteer {
  id: number;
  name: string;
  email: string;
  phone: string;
  area: string;
  location: string;
  joinedDate: string;
  status: "active" | "inactive" | "pending";
  hoursContributed: number;
}

interface VolunteersTabProps {
  volunteers: Volunteer[];
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}
```
- **Features**:
  - Volunteer management
  - Hours tracking
  - Status updates
  - Area of interest display
  - Filter by status
  - Contact information

#### 7. **Toast.tsx**
```tsx
interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastProps {
  toast: Toast;
  onClose: (id: number) => void;
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: number) => void;
}
```
- **Features**:
  - Success/Error/Info notifications
  - Auto-dismiss after 4 seconds
  - Smooth animations
  - Stack management
  - Fixed positioning (top-right)

## Data Types

### Common Interfaces

```typescript
// Message Type
type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read";
};

// Job Type
type Job = {
  id: number;
  title: string;
  department: string;
  description: string;
  location: string;
  postedDate: string;
  status: "active" | "closed" | "draft";
  applications: number;
};

// Candidate Type
type Candidate = {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  location: string;
  appliedDate: string;
  status: "pending" | "interview" | "hired" | "rejected";
  resume?: string;
};

// Volunteer Type
type Volunteer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  area: string;
  location: string;
  joinedDate: string;
  status: "active" | "inactive" | "pending";
  hoursContributed: number;
};

// Toast Type
type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};
```

## Styling & Theme

### Color Palette
```css
--idara-navy: #0a1550;
--idara-orange: #ff6b35;
--idara-cyan: #00d4ff;
--white-5: rgba(255, 255, 255, 0.05);
--white-10: rgba(255, 255, 255, 0.1);
--white-20: rgba(255, 255, 255, 0.2);
```

### Responsive Breakpoints
- **Mobile**: < 768px (md)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## State Management

Main state variables in `admin/page.tsx`:
- `sidebarOpen` - Mobile sidebar toggle
- `toasts` - Notification stack
- `messages` - Messages data
- `jobs` - Jobs data
- `candidates` - Candidates data
- `volunteers` - Volunteers data

## Key Functions

### Main Admin Component
- `handleLogout()` - User logout
- `handleDeleteMessage(id)` - Delete message
- `handleMarkAsRead(id)` - Mark message as read
- `handleDeleteJob(id)` - Delete job
- `handleEditJob(id)` - Edit job
- `handleDeleteCandidate(id)` - Delete candidate
- `handleCandidateStatusChange(id, status)` - Update candidate status
- `handleDeleteVolunteer(id)` - Delete volunteer
- `handleVolunteerStatusChange(id, status)` - Update volunteer status
- `showToast(message, type)` - Show notification

## Import Structure

```typescript
// Icons (lucide-react)
import {
  Menu,
  Bell,
  Search,
  Settings,
  LogOut,
  Mail,
  Briefcase,
  Users,
  Heart,
  Plus,
  Edit2,
  Trash2,
  // ... and more
} from "lucide-react";

// Next.js
import { useRouter, useSearchParams } from "next/navigation";

// React
import { useState, useEffect, Suspense } from "react";

// Custom Components
import Sidebar from "@/components/admin/Sidebar";
import DashboardTab from "@/components/admin/DashboardTab";
import MessagesTab from "@/components/admin/MessagesTab";
import JobsTab from "@/components/admin/JobsTab";
import CandidatesTab from "@/components/admin/CandidatesTab";
import VolunteersTab from "@/components/admin/VolunteersTab";
import { ToastContainer } from "@/components/admin/Toast";
```

## Best Practices Used

1. **Component Separation**: Each feature has its own component
2. **Props Validation**: TypeScript interfaces for all props
3. **Error Handling**: Try-catch blocks and error states
4. **Loading States**: Loading indicators for async operations
5. **Responsive Design**: Mobile-first approach
6. **Accessibility**: Semantic HTML and ARIA labels
7. **Performance**: Optimized re-renders with React hooks
8. **Code Organization**: Logical file structure
9. **Documentation**: Inline comments and README files

## Future Enhancements

1. **Backend Integration**
   - Connect to API endpoints
   - Database persistence
   - User authentication

2. **Advanced Features**
   - Analytics dashboard
   - Export/Import functionality
   - Audit logging
   - Role-based access control

3. **Improvements**
   - Pagination for large datasets
   - Advanced search and filtering
   - Data validation
   - Error boundaries
   - Performance optimization

## Testing Checklist

- [ ] Login functionality
- [ ] Dashboard displays all stats
- [ ] Messages can be viewed and deleted
- [ ] Jobs can be filtered and managed
- [ ] Candidates can be updated
- [ ] Volunteers can be managed
- [ ] CMS pages display correctly
- [ ] Toast notifications work
- [ ] Mobile responsiveness
- [ ] Logout functionality

---

**Total Components Created**: 7 main components + 4 pages  
**Lines of Code**: ~2000+ (excluding documentation)  
**Documentation Files**: 3 comprehensive guides
