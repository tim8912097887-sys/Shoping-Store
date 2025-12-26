import { render,screen } from "@testing-library/react";
import useCurrentUser from "../hooks/useCurrentUser";
import useToken from "../hooks/useToken";
import { MemoryRouter, Route, Routes } from "react-router";
import UserAuthProvider from "../contexts/UserAuthProvider";
import AuthProtect from "./AuthProtect";
import Home from "../pages/Home";
import Login from "../pages/Login";

// Mock the custom hook for UseAuthProvider
vi.mock("../hooks/useToken",() => ({
    default: vi.fn()
}))

vi.mock("../hooks/useCurrentUser",() => ({
    default: vi.fn()
}))

describe("AuthProtect Component",() => {
    // Clear the call time or result before each test begin
    beforeEach(() => {
        vi.clearAllMocks();
    })
    it('Should render Home page if is authenticated', () => {
        // Mock return value for custom hook inside context serve as authenticated
        (useToken as any).mockReturnValue(["my-token",vi.fn()]);
        (useCurrentUser as any).mockReturnValue(["my-user",vi.fn()]);
        render(
            <MemoryRouter initialEntries={["/"]}>
              <UserAuthProvider>
                 <Routes>
                    <Route element={<AuthProtect/>}>
                       <Route path="/" element={<Home/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>} />
                 </Routes>
              </UserAuthProvider>
            </MemoryRouter>
        )
        // Assert that AuthProtect component will allow go to home page if authenticated
        expect(screen.getByText(/home/i)).toBeInTheDocument();
        expect(screen.queryByText(/login form/i)).not.toBeInTheDocument();
    })
    it('Should render Login page if is not authenticated', () => {
        // Mock return value for custom hook inside context serve as unAuthenticated
        (useToken as any).mockReturnValue(["",vi.fn()]);
        (useCurrentUser as any).mockReturnValue(["",vi.fn()]);
        render(
            <MemoryRouter initialEntries={["/"]}>
              <UserAuthProvider>
                 <Routes>
                    <Route element={<AuthProtect/>}>
                       <Route path="/" element={<Home/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>} />
                 </Routes>
              </UserAuthProvider>
            </MemoryRouter>
        )
        // Assert that will allow navigate to login page if not authenticated
        expect(screen.getByText(/login form/i)).toBeInTheDocument();
        expect(screen.queryByText(/home/i)).not.toBeInTheDocument();
    })
})