# Dark Mode Toggle Design

**Date:** 2025-11-09
**Status:** Approved

## Overview

Add a simple icon-only theme toggle button in the top-right corner of the app that switches between light and dark modes. The toggle will persist user preference and integrate with the existing Tailwind CSS dark mode setup.

## Requirements

- Icon-only button (sun/moon icons)
- Fixed position in top-right corner on every page
- Two modes: Light and Dark (no system preference)
- Theme persistence across sessions
- Smooth visual transitions

## Technical Approach

### Technology Stack

- **next-themes** (already installed) - Theme state management and persistence
- **lucide-react** (already installed) - Sun and Moon icons
- **Existing Button component** - Reuse with ghost/icon variant
- **Tailwind CSS dark mode** - Already configured with CSS variables

### Component Architecture

**1. Providers Component** (`components/providers.tsx`)
- Client component wrapper for ThemeProvider
- Configures next-themes with attribute mode
- Prevents flash of unstyled content

**2. ThemeToggle Component** (`components/theme-toggle.tsx`)
- Client component using useTheme hook
- Renders sun icon in dark mode, moon icon in light mode
- Handles theme switching on click
- Fixed positioning with proper z-index

**3. Layout Integration** (`app/layout.tsx`)
- Wrap app with Providers component
- Add ThemeToggle as sibling to children
- ThemeToggle appears on all pages

### Implementation Details

**Positioning:**
- `fixed top-4 right-4` - Top-right corner with spacing
- `z-50` - Above other content
- No interference with page content

**Icons:**
- Sun icon when theme is dark (click to go light)
- Moon icon when theme is light (click to go dark)
- Size: 20px for good visibility
- Smooth fade transition on swap

**Theme Configuration:**
- Attribute: 'class' (adds/removes .dark class on html element)
- Storage: localStorage (automatic via next-themes)
- No default theme (respects user's first choice)

**Existing CSS:**
- No changes needed to globals.css
- Dark mode variables already defined
- .dark class toggle handled by next-themes

## Files Modified

### New Files
- `components/providers.tsx` - ThemeProvider wrapper
- `components/theme-toggle.tsx` - Toggle button component

### Modified Files
- `app/layout.tsx` - Add Providers and ThemeToggle

## User Experience

1. User lands on site (defaults to light mode on first visit)
2. Clicks sun/moon icon in top-right corner
3. Theme switches immediately with smooth transition
4. Preference saved to localStorage
5. Theme persists on page navigation and return visits

## Edge Cases

- **Server-side rendering:** ThemeProvider prevents flash of wrong theme
- **First visit:** App starts in light mode until user makes choice
- **Icon state:** Icon shown represents action (sun in dark = click for light)
- **Z-index conflicts:** Toggle at z-50 should be above most content
