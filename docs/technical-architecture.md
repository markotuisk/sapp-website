
# Technical Architecture

## Application Structure

```
sapp-security/
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # Reusable components
│   │   ├── home/         # Homepage-specific components
│   │   ├── layout/       # Layout components (Navbar, Footer)
│   │   └── ui/           # UI components (buttons, cards, etc.)
│   ├── contexts/         # React contexts for state management
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── pages/            # Page components
├── docs/                 # Project documentation
├── tailwind.config.ts    # Tailwind CSS configuration
└── vite.config.ts        # Vite configuration
```

## Key Technologies

### Core
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and development server

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Component library built on Radix UI
- **Lucide React**: Icon library

### Routing & State Management
- **React Router**: Client-side routing
- **React Context API**: Application state management
- **Tanstack Query**: Data fetching and caching (currently underutilized)

### Internationalization
- **Custom Language Context**: Simple key-based translation system

## Component Hierarchy

```
App
├── LanguageProvider
│   └── Pages
│       ├── Index (Home)
│       │   ├── Navbar
│       │   │   └── LanguageSelector
│       │   ├── Hero
│       │   ├── About
│       │   ├── Services
│       │   │   └── ServiceCard(s)
│       │   ├── Partners
│       │   └── Contact
│       ├── EventSecurity
│       ├── SecurityAudits
│       ├── Installations
│       ├── CyberSecurity
│       └── ClientArea
└── Footer
```

## State Management

### LanguageContext
- Manages current language selection
- Provides translation function (t) for text lookup
- Stores translations for UI elements

### Future State Requirements
- **Authentication State**: For client portal
- **Form State**: For contact and service request forms
- **User Preferences**: For personalization features

## API Integration Points

Currently, the application does not integrate with any backend services. Future integration points should include:

1. **Authentication Service**: For client portal access
2. **Contact Form API**: For form submissions
3. **Content Management System**: For dynamic content updates
4. **Analytics Integration**: For user behavior tracking

## Performance Considerations

1. **Code Splitting**: Implement by route for faster initial load
2. **Image Optimization**: Currently using basic images without optimization
3. **Translation Loading**: Consider lazy-loading translations by language
4. **Caching Strategy**: Implement for API requests when integrated

## Security Considerations

1. **Form Validation**: Implement to prevent injection attacks
2. **Authentication**: Secure implementation for client area
3. **CSRF Protection**: For form submissions
4. **Content Security Policy**: Not currently implemented

## Accessibility

Current accessibility features are minimal. Required improvements:

1. **ARIA Attributes**: Add throughout component hierarchy
2. **Keyboard Navigation**: Enhance focus management
3. **Color Contrast**: Ensure WCAG compliance
4. **Screen Reader Support**: Add appropriate text alternatives

## Browser Support

The application should support:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Future Technical Debt Considerations

1. **Translation System**: Current implementation will not scale well
2. **Component Organization**: May need restructuring as application grows
3. **State Management**: May require more robust solution than Context API
4. **Testing**: No current test coverage
