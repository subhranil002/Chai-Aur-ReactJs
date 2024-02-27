import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index.js";
import { dbConfig } from "../appwrite/index.js";

function AllPosts() {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        dbConfig.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                setIsLoading(false);
            }
        });
    }, []);

    return !isLoading ? (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ) : (
        <p>Loading...</p>
    );
}

export default AllPosts;
