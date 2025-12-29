import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router"
import ProductContainer from "./ProductContainer";
import { getProducts } from "../apis/product.api";

// Mock the api call
vi.mock("../apis/product.api",() => ({
    getProducts: vi.fn()
}))

describe("ProductContainer Integration",() => {
    // Mock setTotal function to assert the call value
    const setTotal = vi.fn();
    
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it('Should fetch and display products based on page and category in the URL', async() => {
        // For mock resolved value
        const mockProducts = [{ id: 2,title: "iPhone 15",category: "smartphone",description: "iPhone 15 is great",price: 12.99,images: ["dfg"] }];
        
        vi.mocked(getProducts).mockResolvedValue({
            success: true,
            data: { products: mockProducts,total: 89,skip: 50,limit: 10 }
        })
        render(
            <MemoryRouter initialEntries={["/?category=smartphone&page=5"]}>
                <Routes>
                  <Route path="/" element={<ProductContainer total={0} setTotal={setTotal} />} />
                </Routes>
            </MemoryRouter>
        )
        // Verify the loading state
        expect(screen.getByTestId("page-loader")).toBeInTheDocument();

        // Verify api call arguments
        await waitFor(() => expect(getProducts).toHaveBeenCalledWith({
             limit: 10,
             skip: 5,
             search: null,
             category: "smartphone"
        }));

        // Verify setTotal called argument
        expect(setTotal).toHaveBeenCalledWith(89);

        // Verify ui update with Products
        expect(await screen.findByRole("heading",{ name: /iPhone 15/i })).toBeInTheDocument();
    })

    it('Should show the message and reset total when api call fail', async() => {
        
        // Simulate fetch fail
        vi.mocked(getProducts).mockResolvedValue({
            success: false,
            errorMsg: "Something went wrong"
        })

        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<ProductContainer total={100} setTotal={setTotal} />} />
                </Routes>
            </MemoryRouter>
        )

        // Verify error message show up on the screen
        expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
        // Verify total reset
        expect(setTotal).toHaveBeenCalledWith(0);
    })
})