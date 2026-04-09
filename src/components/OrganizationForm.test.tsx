import { render, screen, fireEvent } from "@testing-library/react";
import { OrganizationForm } from "./OrganizationForm";

const props = {
    organization: null,
    onClose: jest.fn(),
    state: "create",
};

describe("OrganizationForm", () => {

    it("renders form", () => {
        render(<OrganizationForm {...props} />);

        expect(
            screen.getByRole("heading", { name: /add new organization/i })
        ).toBeInTheDocument();
    });

    // ✅ 1. Input test
    it("updates input value", () => {
        render(<OrganizationForm {...props} />);

        const input = screen.getByLabelText(/organization name/i);

        fireEvent.change(input, { target: { value: "Test Org" } });

        expect(input).toHaveValue("Test Org");
    });

    it("submits form", () => {
        const mockSubmit = jest.fn();

        render(
            <OrganizationForm
                {...props}
                onSubmit={mockSubmit} // only if supported
            />
        );

        fireEvent.change(screen.getByLabelText(/organization name/i), {
            target: { value: "Test Org" },
        });

        fireEvent.click(
            screen.getByRole("button", { name: /Add New Organization/i })
        );

        expect(mockSubmit).toHaveBeenCalled();
    });

    it("shows error if empty submit", () => {
        render(<OrganizationForm {...props} />);

        fireEvent.click(
            screen.getByRole("button", { name: /Add New Organization/i })
        );

        expect(screen.getByText(/required/i)).toBeInTheDocument();
    });

});