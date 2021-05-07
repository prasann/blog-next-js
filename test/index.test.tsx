import { render, screen } from "@testing-library/react";
import App from "../src/pages/index";

describe("App", () => {
    it("renders without crashing", () => {
        render(<App allPosts={[]}/>);
        expect(
            screen.getByRole("heading", { name: "Prasanna Blog" })
        ).toBeInTheDocument();
        expect(false).toBeFalsy()
    });
});