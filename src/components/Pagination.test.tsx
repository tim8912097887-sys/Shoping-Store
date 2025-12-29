import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Pagination from "./Pagination";
import { useSearchFilter } from "../hooks/useSearchFilter";

// Mock component props value
const MOCK_PAGES = 15;

// Global mock of module to gain the control
vi.mock("../hooks/useSearchFilter",() => ({
     useSearchFilter: vi.fn()
}))

describe("Pagination Component",() => {
   
    it('Should show up correct number of button in correct format according to the total page', () => {
        // Control the return value from custom hook
        vi.mocked(useSearchFilter).mockReturnValue({
            page: "0",
            getNewParams: vi.fn(),
            setFilter: vi.fn(),
            category: "",
            search: ""
        });

        render(
          <MemoryRouter>
            <Pagination totalPages={MOCK_PAGES} />
          </MemoryRouter>
        )

        expect(screen.getByText("1").tagName).toBe('DIV');
        expect(screen.getByTestId(/disable-previous/i).tagName).toBe('DIV');
        expect(screen.getByTestId(/next-link/i).tagName).toBe('A');
        expect(screen.getByRole('link',{ name: "15" })).toBeInTheDocument();
    })

    it('Should show up number two button instead of first part of dot on the left side if current page is four', () => {
        
        // Control the return value from custom hook
        vi.mocked(useSearchFilter).mockReturnValue({
            page: "3",
            getNewParams: vi.fn(),
            setFilter: vi.fn(),
            category: "",
            search: ""
        });

        render(
            <MemoryRouter>
              <Pagination totalPages={MOCK_PAGES} />
            </MemoryRouter>
        )
        
        expect(screen.getByRole('link',{ name: "2" })).toBeInTheDocument();
        expect(screen.queryByTestId("first-dot")).not.toBeInTheDocument();
    })

    it('Should show up two part of dot current page is within middle', () => {
         // Control the return value from custom hook
        vi.mocked(useSearchFilter).mockReturnValue({
            page: "7",
            getNewParams: vi.fn(),
            setFilter: vi.fn(),
            category: "",
            search: ""
        })

        render(
            <MemoryRouter>
              <Pagination totalPages={MOCK_PAGES} />
            </MemoryRouter>
        )

        expect(screen.getByTestId("first-dot")).toBeInTheDocument();
        expect(screen.getByTestId("last-dot")).toBeInTheDocument();
        // Center button will have one button on each side
        expect(screen.getByRole('link',{ name: "9" })).toBeInTheDocument();
        expect(screen.getByRole('link',{ name: "7" })).toBeInTheDocument();

    })

    it('Should show up last second of button instead of last dot when current page is less three than total page', () => {
       // Control the return value from custom hook
        vi.mocked(useSearchFilter).mockReturnValue({
            page: "11",
            getNewParams: vi.fn(),
            setFilter: vi.fn(),
            category: "",
            search: ""
        })

        render(
            <MemoryRouter>
              <Pagination totalPages={MOCK_PAGES} />
            </MemoryRouter>
        )
        // Use query or will throw error
        expect(screen.getByTestId("first-dot")).toBeInTheDocument();
        expect(screen.queryByTestId("last-dot")).not.toBeInTheDocument();
    })

    it('Should show up only last two and first number button and disable next button if current is last button', () => {
        // Control the return value from custom hook
        vi.mocked(useSearchFilter).mockReturnValue({
            page: "14",
            getNewParams: vi.fn(),
            setFilter: vi.fn(),
            category: "",
            search: ""
        })

        render(
            <MemoryRouter>
              <Pagination totalPages={MOCK_PAGES} />
            </MemoryRouter>
        )
        
        expect(screen.getByRole('link',{ name: "14" })).toBeInTheDocument();
        expect(screen.getByRole('link',{ name: "1" })).toBeInTheDocument();
        expect(screen.getByText("15").tagName).toBe("DIV");
        expect(screen.getByTestId('disable-next').tagName).toBe("DIV");
    })
})
