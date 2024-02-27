import React, { useEffect, useState } from "react";
import { dbConfig } from "../appwrite/index.js";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        setIsLoading(true);

        if (authStatus) {
            dbConfig.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                    setIsLoading(false);
                }
            });
        }
    }, []);

    return authStatus ? (
        !isLoading ? (
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
        )
    ) : (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;
