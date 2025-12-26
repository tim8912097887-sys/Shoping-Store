import userEvent from "@testing-library/user-event";
import { render,screen } from "@testing-library/react";
import useCurrentUser from "../hooks/useCurrentUser";
import useToken from "../hooks/useToken";
import UserAuthProvider from "../contexts/UserAuthProvider";
import TitleBar from "./TitleBar";
import { MemoryRouter } from "react-router";

// Mock custom hook for UseAuthProtect component
vi.mock('../hooks/useToken',() => ({
    default: vi.fn()   
}))
vi.mock('../hooks/useCurrentUser',() => ({
    default: vi.fn()   
}))

describe("TitleBar Component",() => {
    // Clear mock call and result before each test
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it('Should render login and signup link Not logout buttton on title bar if is unAuthenticated', () => {
         // The mock return value serve as unauthenticated
        (useToken as any).mockReturnValue(["",vi.fn()]);
        (useCurrentUser as any).mockReturnValue(["",vi.fn()]);

        render(
            <MemoryRouter>
               <UserAuthProvider>
                <TitleBar/>
               </UserAuthProvider>
            </MemoryRouter>
        )
        // Assert the link exist
        expect(screen.getByRole('link',{ name: /login/i })).toBeInTheDocument();
        expect(screen.getByRole('link',{ name: /signup/i })).toBeInTheDocument();
        // Assert the link has the correct href attribute
        expect(screen.getByRole('link',{ name: /login/i })).toHaveAttribute('href',"/login");
        expect(screen.getByRole('link',{ name: /signup/i })).toHaveAttribute('href',"/signup");
        // Assert the logout button not exist
        expect(screen.queryByRole("button",{ name: /logout/i })).not.toBeInTheDocument();
    })

    it('Should render logout link on title bar if is authenticated', () => {
         // The mock return value serve as authenticated
        (useToken as any).mockReturnValue(["my-token",vi.fn()]);
        (useCurrentUser as any).mockReturnValue(["my-currentUser",vi.fn()]);

        render(
            <MemoryRouter>
               <UserAuthProvider>
                 <TitleBar/>
               </UserAuthProvider>
            </MemoryRouter>
        )
        // Assert the logout button exist
        expect(screen.getByRole('button',{ name: /logout/i })).toBeInTheDocument();

        // Assert the link not exist
        expect(screen.queryByRole('link',{ name: /login/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link',{ name: /signup/i })).not.toBeInTheDocument();
    })

    // Interaction test
    it('Should call logout logic', async() => {
        const mockSaveUser = vi.fn();
        const mockSaveToken = vi.fn();
        // Mock return value serve as authenticated
        (useToken as any).mockReturnValue(["my-token",mockSaveToken]);
        (useCurrentUser as any).mockReturnValue(["my-currentUser",mockSaveUser]);

        render(
            <MemoryRouter>
                <UserAuthProvider>
                    <TitleBar/>
                </UserAuthProvider>
            </MemoryRouter>
        )
        const user = userEvent.setup();
        const logoutBtn = screen.getByRole("button",{ name: /logout/i });
        // Simulate user click button
        await user.click(logoutBtn);
        // Assert the two function have been called with empty string in the logout function
        expect(mockSaveToken).toHaveBeenCalledWith("");
        expect(mockSaveToken).toHaveBeenCalledWith("");
    })
})