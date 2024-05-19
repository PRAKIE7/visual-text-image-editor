const Config= {
    appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDBID: String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
}

export default Config