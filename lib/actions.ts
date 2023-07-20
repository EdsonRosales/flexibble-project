import { ProjectForm } from "@/common.types";
import { createUserMutation, getUserQuery } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql'; // <--- Endpoint to dev or prod environment
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';   // <--- Key to dev or prod environment
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';  // <--- Check the correct server

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables);
    } catch (error) {
        throw error
    }
};

// Action to get the User
export const getUser = (email: string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getUserQuery, { email });
};

// Action to create a User
export const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey);
    const variables = {
        input: {
            name, email, avatarUrl
        }
    };
    return makeGraphQLRequest(createUserMutation, variables);
};

export const uploadImage = async (imagePath: string) => {
    try {
        const resp = await fetch(`${serverUrl}/api/upload`, {
            // Endpoint to upload the image to Cloudinary
        })
    } catch (error) {
        console.log("Error to upload the image", error);
    }
};

// Action to create a New Project
export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image);
};