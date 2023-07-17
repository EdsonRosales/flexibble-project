/** Query to get a User from DB */
export const getUserQuery = `
    query GetUser($email: String!) {
        user(by: { email: $email }) {
            id
            name
            email
            avatarUrl
            description
            githubUrl
            linkedinUrl
        }
    }
`;

/** Mutation to create a User in the DB */
export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!) {
        userCreate(input: $input) {
            user {
                name
                email
                avatarUrl
                description
                githubUrl
                linkedinUrl
                id
            }
        }
    }
`