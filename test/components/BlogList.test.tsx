import {render, screen} from "@testing-library/react";
import Blog from "../../src/components/Posts";
import post from "../factories/post";

describe("Posts", () => {
    it("renders list of blog entries", () => {
        let blogPost1 = post({slug: 'slug-for-post1', title: 'title-for-post-1'});
        render(<Blog entries={[blogPost1]}/>);
        expect(
            screen.getByRole("link", {name: "title-for-post-1"})
        ).toHaveAttribute('href', '/posts/slug-for-post1')
    });

    it("renders nothing if no blog entries are present", () => {
        const {container} = render(<Blog entries={[]}/>);
        expect(
            container.firstChild
        ).toBeNull();
    });
});
