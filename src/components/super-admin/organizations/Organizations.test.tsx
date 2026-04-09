// Organizations.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Organizations } from "./index";

// ✅ Mock APIs
jest.mock("@/utils/graphql/organization/action", () => ({
    getAllOrganizationsAction: jest.fn(),
}));

jest.mock("@/store/actions/organization-action", () => ({
    createOrganization: jest.fn(),
    updateOrganizationById: jest.fn(),
    removeOrganizationById: jest.fn(),
}));

// ✅ Mock toast
jest.mock("sonner", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

// ✅ Mock child components (to simplify testing)
jest.mock("@/components/OrganizationForm", () => ({
    OrganizationForm: () => <div>Mock Form</div>,
}));

jest.mock("./OrganizationTable", () => () => <div>Mock Table</div>);
jest.mock("@/components/Pagination", () => () => <div>Mock Pagination</div>);
jest.mock("@/components/ConfirmationModal", () => () => <div>Mock Modal</div>);