# Component Structure - Atomic Design

This project follows **Atomic Design** principles for component organization:

## 📁 Structure

```
src/components/
├── atoms/           # Basic building blocks
├── molecules/       # Simple combinations of atoms
└── organisms/       # Complex UI sections
```

## ⚛️ Atoms
**Smallest, reusable UI components**

- `ui/` - Base UI components (Button, Input, Textarea, etc.)
- `LoadingScreen.tsx` - Loading animation
- `particles.tsx` - Background particle effects
- `experienceback.tsx` - Experience section background
- `projectsback.tsx` - Projects section background

## 🔬 Molecules
**Simple combinations of atoms**

- `navbar.tsx` - Navigation bar
- `socials.tsx` - Social media floating bar
- `footer.tsx` - Footer component

## 🧬 Organisms
**Complex, feature-rich sections**

- `front.tsx` - Video background section
- `starwarstext.tsx` - 3D hero title and CTA buttons
- `hero.tsx` - About me section with portrait
- `education.tsx` - Education history
- `skills.tsx` - Skills showcase
- `experience.tsx` - Work experience
- `achievements.tsx` - Publications and awards
- `projects.tsx` - Project portfolio
- `contributions.tsx` - Other contributions
- `contact.tsx` - Contact form
- `info.tsx` - Additional info section
- `layout.tsx` - Layout wrapper

## 📦 Barrel Exports

Each folder has an `index.ts` for cleaner imports:

```typescript
// Instead of:
import Hero from '@/components/organisms/hero'

// You can use:
import { Hero } from '@/components/organisms'
```

## 🎯 Benefits

1. **Clear hierarchy** - Easy to understand component relationships
2. **Reusability** - Atoms can be composed into molecules and organisms
3. **Maintainability** - Logical organization makes finding components easier
4. **Scalability** - Easy to add new components at the appropriate level
5. **Testing** - Isolated atoms are easier to test

## 📝 Guidelines

- **Atoms**: Should be pure, stateless when possible, and highly reusable
- **Molecules**: Combine atoms with minimal logic
- **Organisms**: Can have complex state and business logic
- **Keep imports clean**: Use atomic paths consistently
