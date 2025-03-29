
# SAPP Security Design System

## Brand Identity

### Colors

#### Primary Colors
- **SAPP Blue** `#20798C`: Main brand color, used for primary buttons, key accents
- **SAPP Dark** `#2A2A2A`: Used for text, backgrounds, and secondary elements
- **SAPP Gray** `#6B7280`: Used for supporting text and less prominent UI elements

#### Accent Colors
- **Accent Teal** `#20798C`: Highlight color for interactive elements
- **Accent Dark Blue** `#032B3B`: Used for depth and contrast

#### System Colors
- **Success** `hsl(var(--destructive))`: For success messages and confirmations
- **Error/Destructive** `hsl(var(--destructive))`: For error states and warnings
- **Muted** `hsl(var(--muted))`: For background areas and disabled states

### Typography

#### Fonts
- **Primary Font**: Inter (sans-serif)
  - Used for body text, UI elements, and general content
  - Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

- **Display Font**: SF Pro Display
  - Used for headings, large text, and emphasized elements
  - Weights: 400 (Regular), 700 (Bold), 800 (Extrabold)

#### Type Scale
- **Heading 1**: 3rem (48px) / 1.1 line height / SF Pro Display Bold
- **Heading 2**: 2.25rem (36px) / 1.2 line height / SF Pro Display Bold
- **Heading 3**: 1.5rem (24px) / 1.3 line height / SF Pro Display Bold
- **Heading 4**: 1.25rem (20px) / 1.4 line height / SF Pro Display Semibold
- **Paragraph**: 1rem (16px) / 1.5 line height / Inter Regular
- **Small**: 0.875rem (14px) / 1.5 line height / Inter Regular

### Spacing System

Based on a 4px unit system:
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

## Components

### Buttons

#### Primary Button
- Background: SAPP Blue (`#20798C`)
- Text: White
- Hover: Darkened SAPP Blue
- Height: 2.5rem (40px)
- Padding: 0.5rem 1rem (8px 16px)
- Border Radius: 0.375rem (6px)

#### Secondary Button
- Background: Transparent
- Border: 1px solid SAPP Dark
- Text: SAPP Dark
- Hover: Light background, darker border
- Dimensions: Same as Primary Button

#### Button Sizes
- **Small**: Height 2rem (32px), padding 0.375rem 0.75rem (6px 12px)
- **Default**: Height 2.5rem (40px), padding 0.5rem 1rem (8px 16px)
- **Large**: Height 3rem (48px), padding 0.75rem 1.25rem (12px 20px)

### Cards

#### Standard Card
- Background: White
- Border: 1px solid border color
- Border Radius: 0.5rem (8px)
- Shadow: sm (small shadow)
- Padding: 1.5rem (24px)

#### Glass Card
- Background: `bg-white/70`
- Backdrop Filter: `backdrop-blur-md`
- Border: `border-white/30`
- Shadow: xl (extra large shadow)

#### Feature Card
- Used for highlighting services or features
- Has icon, title, and description
- Hover effect: slight elevation and scaling

### Navigation

#### Navbar
- Fixed position at top
- Light background
- Contains logo, navigation links, language selector
- Mobile: Collapses to hamburger menu

#### Mobile Menu
- Drawer style from the right
- Full height
- Animated entry/exit

### Form Elements

#### Input Fields
- Height: 2.5rem (40px)
- Border: 1px solid border color
- Border Radius: 0.375rem (6px)
- Padding: 0.5rem 0.75rem (8px 12px)
- Focus: Ring effect with primary color

#### Select Dropdown
- Same styling as input fields
- Custom dropdown indicator
- Styled options list

## Visual Effects

### Shadows
- **sm**: Small shadow for subtle elevation
- **md**: Medium shadow for cards and containers
- **lg**: Large shadow for floating elements
- **xl**: Extra large shadow for modal dialogs

### Animations

#### Transition Defaults
- Duration: 300ms
- Timing Function: ease-in-out

#### Common Animations
- **Fade In**: Opacity 0 to 1, slight Y translation
- **Scale**: 95% to 100% scale, with opacity change
- **Slide**: Translation from offscreen

### Special Effects

#### Glass Morphism
- Used for premium content sections
- Combination of transparency, blur, and subtle border

#### Grid Background
- Subtle grid pattern for section distinction
- Light lines on light background

## Responsive Design

### Breakpoints
- **sm**: 640px (Mobile landscape)
- **md**: 768px (Tablets)
- **lg**: 1024px (Small desktops)
- **xl**: 1280px (Large desktops)
- **2xl**: 1536px (Extra large screens)

### Responsive Patterns
- Mobile-first approach
- Flexbox for simple layouts
- CSS Grid for complex layouts
- Stack elements vertically on mobile
- Multi-column layout on larger screens

## Accessibility

### Color Contrast
- Text on background should meet WCAG AA standard (4.5:1 for normal text, 3:1 for large text)
- Interactive elements should have sufficient contrast

### Focus States
- Visible focus indicators for all interactive elements
- Custom focus styles consistent with brand

### Screen Readers
- Proper ARIA labeling for interactive components
- Hidden text for icons and visual elements

## Implementation Guidelines

### Using the Design System
- Components should use Tailwind utility classes
- Custom components should extend from base shadcn/ui components
- Consistency in spacing, color, and typography is essential

### File Organization
- Component styles should be co-located with components
- Global styles in index.css
- Theme configuration in tailwind.config.ts

### Adding New Components
- Should follow existing patterns
- Must be responsive by default
- Should support dark mode when implemented
- Should be accessible
