import React from 'react'
import dbService from '../Appwrite/Database'
import { Button, Input, Selectfield, RTE } from './Imports'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useForm} from 'react-hook-form'
import { useCallback } from 'react'


function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            title: post?.Title || "",
            slug: post?.Slug || "",
            content: post?.Content || "",
            status: post?.Status || "Active",

        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)

    const submitForm = async (data) => {
        if (post) {
            const file = data.Image[0] ? await dbService.uploadFile(data.Image[0]) : null;

            if (file) {
                dbService.deleteFile(post.Image)
            }
            const updtPost = await dbService.updatePost(post.$id, {
                ...data,
                Image: file ? file.$id : undefined,
            });

            if(updtPost) {
                navigate(`/post/${updtPost.$id}`)
            }
        } else {
            const file = await dbService.uploadFile(data.Image[0]);

            if (file) {
                const fileID = file.$id;
                data.Image = fileID;
                const dbPost = await dbService.createPost({
                    ...data,
                    UserID: userData.$id
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }

    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return ''
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={dbService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Selectfield
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
