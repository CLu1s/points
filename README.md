# Tax Calculator UI

This project provides a user interface to calculate income taxes based on annual salary and fiscal year, using dynamic tax brackets from an external API. The app is built with **Next.js** and **TypeScript**, following **TDD principles** to ensure maintainable and reliable code.

---

## Features

- Calculate **total taxes owed** based on annual salary.
- Display **taxes owed per tax band**.
- Show the **effective tax rate**.
- Responsive and accessible UI.
- Graceful error handling and user feedback.

---

## Technologies Used

- **Next.js** (Frontend framework)
- **TypeScript** (Type safety and enhanced development experience)
- **Axios** (HTTP client for API requests)
- **Jest** and **React Testing Library** (Testing framework and utilities)
- **Tailwind CSS** (For styling)
- **Shadcn** (For UI components)
---

## Getting Started

### Prerequisites

Before starting, ensure you have the following installed:
- Node.js (>=v20.10.x)
- npm or yarn
- Docker (optional, for running the API)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CLu1s/points.git
   cd points
    ```
2. Install dependencies:
    
    ```bash
    npm install
    ```

3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
## API Setup
The application depends on an external API for tax data. Follow these steps to set it up:

```bash
docker pull ptsdocker16/interview-test-server
docker run --init -p 5001:5001 -it ptsdocker16/interview-test-server
```
The API will be available at:
http://localhost:5001

## Usage
1. Enter your annual salary and the fiscal year in the form.
2. Click the Calculate button.
3. View the results, including:

   - Total taxes owed.
   - Breakdown of taxes per band.
   - Effective tax rate.
### Example Output
`Total Taxes Owed: $12,000`

`Breakdown:`
`$0 - $50,197: $7,529.55`

`$50,197 - $100,392: $4,470.45`

`Effective Tax Rate: 20%`

---

## Testing
Run the test suite to verify the app's functionality:

Execute tests:
```bash
npm test
```
Test coverage will be displayed in the terminal.