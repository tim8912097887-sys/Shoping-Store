import { render,screen } from "@testing-library/react";
import useCurrentUser from "../hooks/useCurrentUser";
import useToken from "../hooks/useToken";
import { MemoryRouter, Route, Routes } from "react-router";
import UserAuthProvider from "../contexts/UserAuthProvider";
import Home from "../pages/Home";
import GuestOnly from "./GuestOnly";
import Login from "../pages/Login";

// Mock custom hook for UseAuthProvider
vi.mock('../hooks/useToken',() => ({
    default: vi.fn()
}))
vi.mock('../hooks/useCurrentUser',() => ({
    default: vi.fn()
}))

describe("GuestOnly Component",() => {
    // Clear mock call and result before each test
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it('Should render Login page if it is not authenticated', () => {
        // The mock return value serve as unauthenticated
        (useToken as any).mockReturnValue(["",vi.fn()]);
        (useCurrentUser as any).mockReturnValue(["",vi.fn()]);
        render(
            <MemoryRouter initialEntries={["/login"]}>
                <UserAuthProvider>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route element={<GuestOnly/>}>
                           <Route path="/login" element={<Login/>} />
                        </Route>
                    </Routes>
                </UserAuthProvider>
            </MemoryRouter>
        )
        // Assert that the GuestOnly component should allow go to login page if is unauthenticated
        expect(screen.getByText(/login form/i)).toBeInTheDocument();
        expect(screen.queryByText(/home/i)).not.toBeInTheDocument();
    })

    it('Should render Home page if it is authenticated', () => {
        // The mock return value serve as authenticated
        (useToken as any).mockReturnValue(["my-token",vi.fn()]);
        (useCurrentUser as any).mockReturnValue(["my-currentUser",vi.fn()]);
        render(
            <MemoryRouter initialEntries={["/login"]}>
                <UserAuthProvider>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route element={<GuestOnly/>}>
                           <Route path="/login" element={<Login/>} />
                        </Route>
                    </Routes>
                </UserAuthProvider>
            </MemoryRouter>
        )
        // Assert that the GuestOnly component should redirect to home page if is authenticated
        expect(screen.getByText(/home/i)).toBeInTheDocument();
        expect(screen.queryByText(/login form/i)).not.toBeInTheDocument();
    })
})