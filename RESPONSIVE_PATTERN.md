# Responsive Design Pattern Guide

This guide explains the responsive design pattern used throughout the application to ensure all pages work properly on small screens.

## Page Container Pattern

### Option 1: Using PageContainer Component (Recommended)

Wrap your page content with the `PageContainer` component:

```vue
<template>
  <PageContainer>
    <!-- Your page content here -->
  </PageContainer>
</template>
```

### Option 2: Manual Classes

If you prefer manual classes, use this pattern:

```vue
<template>
  <div class="m-4 sm:m-6 md:m-8 py-4 sm:py-6 px-4 sm:px-8 md:px-16 max-w-full overflow-x-hidden">
    <!-- Your page content here -->
  </div>
</template>
```

## Page Header Pattern

### Option 1: Using PageHeader Component (Recommended)

```vue
<template>
  <PageContainer>
    <PageHeader 
      title="Page Title"
      subtitle="Page subtitle or description"
    />
    <!-- Rest of your content -->
  </PageContainer>
</template>
```

### Option 2: Manual Classes

```vue
<template>
  <div class="mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-right">
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f172a] mb-2 break-words">
      Page Title
    </h1>
    <p class="text-xs sm:text-sm md:text-base text-[#64748b] break-words">
      Page subtitle
    </p>
  </div>
</template>
```

## Form Elements Pattern

### Input Fields
```vue
<input
  class="w-full px-3 sm:px-4 py-2 sm:py-3 ... min-w-0"
/>
```

### Textareas
```vue
<textarea
  class="w-full px-3 sm:px-4 py-2 sm:py-3 ... min-w-0 resize-none"
></textarea>
```

### Labels
```vue
<label class="block text-xs sm:text-sm font-medium ... break-words">
  Label Text
</label>
```

## Spacing Pattern

Use responsive spacing throughout:

- **Margins**: `m-4 sm:m-6 md:m-8`
- **Padding**: `p-4 sm:p-6 md:p-8`
- **Gaps**: `gap-3 sm:gap-4 md:gap-6`
- **Vertical spacing**: `mb-4 sm:mb-6 md:mb-8`

## Typography Pattern

### Headings
- **H1**: `text-xl sm:text-2xl md:text-3xl`
- **H2**: `text-lg sm:text-xl md:text-2xl`
- **H3**: `text-base sm:text-lg md:text-xl`

### Body Text
- **Regular**: `text-xs sm:text-sm md:text-base`
- **Small**: `text-xs sm:text-sm`

**Always add `break-words`** to prevent text overflow.

## Cards and Sections

```vue
<div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 max-w-full overflow-hidden">
  <!-- Card content -->
</div>
```

## Buttons

### Full-width on mobile, auto on larger screens
```vue
<button class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 ...">
  Button Text
</button>
```

## Grid Layouts

```vue
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
  <!-- Grid items -->
</div>
```

## Key Rules

1. **Always use responsive classes**: `base sm: md: lg:`
2. **Prevent horizontal overflow**: Add `max-w-full overflow-x-hidden` to main containers
3. **Prevent text overflow**: Add `break-words` to text elements
4. **Prevent flex overflow**: Add `min-w-0` to flex children
5. **Use responsive spacing**: Start small (mobile-first) and scale up
6. **Test on mobile**: Always test your pages on small screens

## Example: Complete Page Template

```vue
<template>
  <PageContainer>
    <PageHeader 
      title="Page Title"
      subtitle="Page description"
    />
    
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 max-w-full overflow-hidden">
      <h2 class="text-lg sm:text-xl font-bold mb-4 sm:mb-6 break-words">
        Section Title
      </h2>
      
      <div class="space-y-4 sm:space-y-6">
        <div>
          <label class="block text-xs sm:text-sm font-medium mb-2 break-words">
            Label
          </label>
          <input
            class="w-full px-3 sm:px-4 py-2 sm:py-3 ... min-w-0"
          />
        </div>
      </div>
    </div>
    
    <div class="mt-4 sm:mt-6 flex justify-end">
      <button class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 ...">
        Save
      </button>
    </div>
  </PageContainer>
</template>
```

## Components Available

- **PageContainer**: Wrapper component for consistent page spacing
- **PageHeader**: Consistent page header component
- **StatCard**: Responsive statistics card component

Use these components whenever possible to maintain consistency across the application.
