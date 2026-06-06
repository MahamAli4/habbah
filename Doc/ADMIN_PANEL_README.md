# Habbah Admin Panel Documentation

## Overview

This is a professional, enterprise-grade admin panel for the Habbah Educational Trust. The admin panel is built with Next.js 16, React 19, and Tailwind CSS, featuring a modern UI with glassmorphic design elements.

## Features

### 1. **Dashboard**
- Real-time statistics dashboard showing:
  - Total messages
  - Active job postings
  - Total candidates
  - Total volunteers
- Recent activity cards showing latest messages and jobs
- Responsive grid layout

### 2. **Messages Management**
- View all contact messages
- Mark messages as read/unread
- Delete messages
- Bulk selection and deletion
- Expandable message details
- Unread message counter

### 3. **Jobs Management**
- View all job postings
- Filter by status (all, active, closed, draft)
- View job details including:
  - Job title and department
  - Location and posting date
  - Number of applications
  - Current status badge
- Edit job postings
- Delete job postings
- View applications for each job

### 4. **Candidates Management**
- View all job candidates
- Filter by status (pending, interview, hired, rejected)
- Change candidate status
- View candidate details:
  - Name, email, phone
  - Applied position and location
  - Application date
- Download/view resumes
- Delete candidate records

### 5. **Volunteers Management**
- Manage volunteer database
- Filter by status (active, inactive, pending)
- View volunteer information:
  - Contact details
  - Area of interest
  - Location
  - Hours contributed
  - Join date
- Update volunteer status
- Track volunteer hours

### 6. **CMS (Content Management System)**
- Manage website pages
- View page statistics:
  - Page title and URL slug
  - Publication status
  - View count
  - Last modified date
  - Author information
- Create new pages
- Edit existing pages
- Delete pages
- Monitor page performance

### 7. **Authentication**
- Secure login system
- Demo credentials: `admin@habbah.org` / `admin123`
- Session management
- Logout functionality
- Admin-only access control

## File Structure

```
admin/
├── layout.tsx              # Admin layout wrapper
├── page.tsx                # Main dashboard page
├── head.tsx                # Metadata configuration
├── login/
│   └── page.tsx            # Login page
├── messages/
│   └── page.tsx            # Messages page
├── cms/
│   └── page.tsx            # CMS management page
│   └── [pageId]/
│       └── page.tsx        # Edit page (future)

src/components/admin/
├── Sidebar.tsx             # Navigation sidebar
├── DashboardTab.tsx        # Dashboard content
├── MessagesTab.tsx         # Messages management
├── JobsTab.tsx             # Jobs management
├── CandidatesTab.tsx       # Candidates management
├── VolunteersTab.tsx       # Volunteers management
└── Toast.tsx               # Notification system
```

## Component Architecture

### **Sidebar Component**
- Responsive sidebar with mobile toggle
- Navigation menu with active states
- Submenu for Jobs section
- Logout button
- User info display

### **Tab Components**
- Modular tab design for easy extensibility
- Consistent UI patterns
- Reusable filtering and sorting
- Status badges and color coding

### **Toast Notification System**
- Success, error, and info notifications
- Auto-dismissing toasts
- Stack management
- Fixed positioning

## Color Scheme

The admin panel uses a professional dark theme with accent colors:

- **Primary Navy**: `idara-navy` - `#0a1550`
- **Orange Accent**: `idara-orange` - Primary CTA color
- **Cyan Accent**: `idara-cyan` - Secondary accent
- **White/Grays**: For text and borders
- **Status Colors**:
  - Green: Active/Published
  - Yellow: Pending/Draft
  - Blue: Interview
  - Red: Rejected/Inactive

## Usage Examples

### Login
1. Navigate to `/admin/login`
2. Enter demo credentials:
   - Email: `admin@habbah.org`
   - Password: `admin123`
3. Click "Login to Dashboard"

### View Dashboard
- Default landing page after login
- Shows overview of all admin functions
- Provides quick access to recent items

### Manage Messages
1. Click "Messages" in sidebar
2. View all messages with unread count
3. Expand messages to see full content
4. Mark as read by clicking on the message
5. Delete individual or multiple messages

### Manage Jobs
1. Click "Jobs" > "All Jobs" in sidebar
2. Filter by status using tabs
3. View job details
4. Click "Edit" to modify or "Delete" to remove
5. Click "View Applications" to see candidates

### Manage Candidates
1. Click "Candidates" in sidebar
2. Filter by status (pending, interview, hired, rejected)
3. Change status using dropdown
4. View and download resumes
5. Delete candidate records

### Manage Volunteers
1. Click "Volunteers" in sidebar
2. Filter by status
3. Update volunteer information
4. Track volunteer hours
5. Manage volunteer status

### CMS Management
1. Click "CMS" in sidebar
2. View all pages with stats
3. Create new page using "+ Create New Page" button
4. Edit pages by clicking the edit icon
5. Monitor page views and performance

## Data Management

Currently, the admin panel uses mock data stored in React state. To integrate with a real backend:

1. Replace mock data with API calls
2. Implement API routes in `/api` directory
3. Add error handling and loading states
4. Implement proper authentication with JWT
5. Add data persistence with a database

## Responsive Design

The admin panel is fully responsive with:
- Mobile sidebar toggle
- Collapsible navigation on small screens
- Responsive grids that adapt to screen size
- Touch-friendly buttons and interactive elements
- Optimized for tablets and laptops

## Styling

Built with Tailwind CSS v4 featuring:
- Glassmorphic design elements
- Smooth transitions and animations
- Gradient backgrounds
- Custom color palette
- Backdrop blur effects
- Professional typography

## Future Enhancements

1. **Real Backend Integration**
   - Connect to actual API endpoints
   - Database persistence
   - Real user authentication

2. **Advanced Features**
   - User role management (Admin, Editor, Viewer)
   - Audit logging
   - Activity history
   - Advanced search and filtering
   - Export/Import functionality
   - Scheduled emails
   - Analytics dashboard

3. **Security**
   - Two-factor authentication
   - API key management
   - Permission-based access control
   - Data encryption
   - Session timeout

4. **Performance**
   - Pagination for large datasets
   - Lazy loading
   - Infinite scroll
   - Search optimization
   - Caching strategies

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Run Production Server
```bash
npm start
```

## Notes

- The admin panel is private and not indexed by search engines
- All pages require admin authentication
- Demo mode is enabled for testing purposes
- Mock data resets on page refresh
- No data persistence in current version

## Support

For issues or feature requests related to the admin panel, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Built with**: Next.js 16, React 19, Tailwind CSS 4
