const Config= {
    appwriteEndpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    appwriteProjID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDBID: import.meta.env.VITE_APPWRITE_DB_ID,
    appwriteBucketID: import.meta.env.VITE_APPWRITE_BUCKET_ID,
    appwriteCollectionID: import.meta.env.VITE_APPWRITE_COLLECTION_ID
}

export default Config