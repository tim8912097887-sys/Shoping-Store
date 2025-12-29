import { render,screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes, useSearchParams } from "react-router"
import CategoryList from "./CategoryList"
import userEvent from "@testing-library/user-event";

// Mock the api request
vi.mock("../apis/product.api",() => ({
      getCategory: vi.fn(() => Promise.resolve({
         success: true,
         data: ['beauty',"electronics"]
      }))
}))

// Check the correctness of the category update
const LocationDisplay = () => {
    const [searchParams] = useSearchParams();
    return <div data-testid="location-param">{searchParams.get("category")}</div>
}

describe("Category List Component",() => {

    it('Should render category from the api and update URL on change', async() => {
        
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={['/']}>
                <CategoryList/>
                <Routes>
                  {/* Detect the route search param change */}
                  <Route path="/" element={<LocationDisplay/>} />
                </Routes>
            </MemoryRouter>
        )

        // Check Default option exist
        expect(screen.getByRole('option',{ name: /all categories/i })).toBeInTheDocument();
        // Wait the api call to fetch the list options
        expect(await screen.findByRole('option',{ name: /beauty/i })).toBeInTheDocument();
        // Simulate user select the option
        const select = screen.getByRole('combobox');
        await user.selectOptions(select,"beauty");
        // Simulate useSearchFilter should update the search param in url correctly
        expect(screen.getByTestId("location-param")).toHaveTextContent("beauty");
    })
})