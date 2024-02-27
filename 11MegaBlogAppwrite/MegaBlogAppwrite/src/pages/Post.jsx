import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dbConfig, storageConfig } from "../appwrite/index.js";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState({});
    const [image, setImage] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { postId } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        setIsLoading(true);

        if (postId) {
            dbConfig
                .getPost(postId)
                .then((post) => {
                    if (post) {
                        setPost(post);
                        return post;
                    } else navigate("/");
                })
                .then((post) => {
                    storageConfig
                        .getFilePreview(post.featuredImage)
                        .then((imageObject) => {
                            setImage(imageObject.href);
                            setIsLoading(false);
                        });
                });
        } else navigate("/");
    }, [postId, navigate]);

    const deletePost = () => {
        setIsLoading(true);
        dbConfig.deletePost(post.$id).then((status) => {
            if (status) {
                storageConfig.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post && !isLoading ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img src={image} alt={post.title} className="rounded-xl" />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                </div>
                <div className="text-2xl">{parse(`${post.content}`)}</div>
            </Container>
        </div>
    ) : (
        <p>Loading...</p>
    );
}
