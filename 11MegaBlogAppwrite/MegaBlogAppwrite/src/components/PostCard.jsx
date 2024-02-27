import React, { useEffect, useState } from "react";
import { storageConfig } from "../appwrite/index.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
    const [image, setImage] = useState({});

    useEffect(() => {
        storageConfig.getFilePreview(featuredImage).then((image) => {
            setImage(image);
        });
    }, []);

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={image.href} alt={title} className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
