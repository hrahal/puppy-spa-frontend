# Puppy Spa Frontend Project - README

Puppy Spa frontend project.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed:

* **Node.js:** (Version 22.10.7 or later recommended)
* **pnpm:** (Recommended package manager, see `pnpm` in `package.json`)
* **Git:** (If you need to clone the project from a Git repository)

## Installation

1.  **Clone the Repository (if necessary):**

    If you need to clone the project from a Git repository, execute the following command:

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install Dependencies:**

    Use `pnpm` to install the required dependencies:

    ```bash
    pnpm install
    ```

## Starting the Development Environment

To start the development environment, execute the following command:

```bash
pnpm dev --turbopack
```

## Build and start

To build and start, execute the following command:

```bash
pnpm build & pnpm start
```


## Directory Breakdown

* **`dashboard/`**:
    * **`customer/`**:
        * **`[id]/edit/`**:
            * Contains pages for editing individual customer requests, where `[id]` represents the customer request's unique identifier.
            * **`not-found.tsx`**: handles the case when a customer request is not found.
            * **`page.tsx`**: the page to edit the customer request.
        * **`create/page.tsx`**:
            * Page for creating new customer requests.
        * **`page.tsx`**:
            * The main page for displaying a list of customer requests.
    * **`layout.tsx`**:
        * Layout component specific to the dashboard section.
* **`layout.tsx`**:
    * The root layout component for the entire application.
* **`lib/`**:
    * Contains utility functions, data access logic, and type definitions used throughout the application.
    * **`actions.tsx`**:
        * Server actions for data manipulation.
    * **`customer-request-data.tsx`**:
        * Functions for accessing and manipulating customer request data.
    * **`definitions.ts`**:
        * Type definitions for data structures.
    * **`utils.ts`**:
        * General utility functions.
* **`loading.tsx`**:
    * A loading component displayed during asynchronous operations.
* **`page.tsx`**:
    * The application's homepage.
* **`ui/`**:
    * Contains reusable UI components.
    * **`button.tsx`**:
        * A generic button component.
    * **`customer-requests/`**:
        * UI components specific to the customer request management section.
        * **`breadcrumbs.tsx`**:
            * Breadcrumb navigation component.
        * **`buttons.tsx`**:
            * customer request related button components.
        * **`create-form.tsx`**:
            * The form for creating a customer request.
        * **`customer-row.tsx`**:
            * The display of a single customer request row.
        * **`edit-form.tsx`**:
            * The form for editing a customer request.
    * **`dashboard/`**:
        * UI components specific to the dashboard section.
        * **`nav-links.tsx`**:
            * Navigation links for the dashboard.
        * **`sidenav.tsx`**:
            * The dashboard's side navigation.
