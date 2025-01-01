# Agency Directory Project

## Project Overview
The Agency Directory is a Next.js application designed for managing and displaying agency information. It leverages modern web technologies to provide a robust and scalable platform.

## Technology Stack
- **Next.js**: A React framework for server-side rendering and static web applications.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Supabase**: An open-source Firebase alternative for backend services.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React**: A JavaScript library for building user interfaces.

## Architecture
![Architecture Diagram](architecture-diagram.png)

The architecture is based on a modular design with a clear separation of concerns. It consists of the following layers:
- **Presentation Layer**: Handles the user interface using React components.
- **Business Logic Layer**: Contains the application logic implemented with custom hooks and services.
- **Data Access Layer**: Interfaces with Supabase for data storage and retrieval.

## Prerequisites
- **Node.js**: Version 18 or higher is recommended.
- **npm or yarn**: Package managers for JavaScript.
- **Supabase Account**: Required for backend services.
- **Git**: Version control system.

## Setup and Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd agency-directory
```

### 2. Environment Configuration
Create a [.env.local](cci:7://file://wsl.localhost/Ubuntu/home/grey/LSTLY/agency-directory/.env.local:0:0-0:0) file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies
```bash
npm install
# or
yarn install
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```
Access the application at [http://localhost:3000](http://localhost:3000).

## Project Structure
- **`app/`**: Contains Next.js app router pages.
- **`components/`**: Houses reusable React components.
- **`lib/`**: Includes utility functions and schemas.
- **`hooks/`**: Custom React hooks for various functionalities.
- **`services/`**: API and service layer for external interactions.
- **`supabase/`**: Configurations related to Supabase.

## Key Components
- **`agency-form.tsx`**: Primary form component for agency data entry.
- **`schemas.ts`**: Contains data validation schemas using Zod.

## Development Workflow

### Branching Strategy
- **`main`**: Stable production branch.
- **`develop`**: Active development branch.
- **Feature branches**: Use the format `feature/description`.

### Coding Standards
- **TypeScript**: Enforce strict mode for type safety.
- **ESLint**: Use for code linting and maintaining code quality.
- **Prettier**: For consistent code formatting.

## Testing
Run tests using the following command:
```bash
npm run test
# or
yarn test
```

## Deployment
- **Vercel**: Recommended platform for deploying Next.js applications.
- Ensure all necessary environment variables are set up before deployment.

## Contributing
1. Fork the repository.
2. Create a feature branch following the naming convention.
3. Commit your changes with clear and descriptive messages.
4. Push to your fork and submit a pull request.

## Known Issues / Limitations
- [List any current known bugs or limitations]

## Future Roadmap
- [List potential future enhancements]

## License
[Specify the project license]

## Contact
For any inquiries or issues, please contact [Project Maintainer's Contact Information].

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
