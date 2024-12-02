export interface GetOrCreateUserRequestHeaders {
    "x-user-key": string;
}
export interface GetOrCreateUserRequestQuery {
}
export interface GetOrCreateUserRequestParams {
}
export interface GetOrCreateUserRequestBody {
    /**
     * Name of the [User](#schema_user) (not a unique identifier)
     */
    name?: string;
    /**
     * Picture url of the [User](#schema_user)
     */
    pictureUrl?: string;
    /**
     * Custom profile data of the [User](#schema_user) encoded as a string
     */
    profile?: string;
}
export type GetOrCreateUserInput = GetOrCreateUserRequestBody & GetOrCreateUserRequestHeaders & GetOrCreateUserRequestQuery & GetOrCreateUserRequestParams;
export type GetOrCreateUserRequest = {
    headers: GetOrCreateUserRequestHeaders;
    query: GetOrCreateUserRequestQuery;
    params: GetOrCreateUserRequestParams;
    body: GetOrCreateUserRequestBody;
};
export declare const parseReq: (input: GetOrCreateUserInput) => GetOrCreateUserRequest & {
    path: string;
};
export interface GetOrCreateUserResponse {
    /**
     * The user object represents someone interacting with the bot within a specific integration. The same person interacting with a bot in slack and messenger will be represented with two different users.
     */
    user: {
        /**
         * Identifier of the [User](#schema_user)
         */
        id: string;
        /**
         * Name of the [User](#schema_user)
         */
        name?: string;
        /**
         * Picture url of the [User](#schema_user)
         */
        pictureUrl?: string;
        /**
         * Custom profile data of the [User](#schema_user) encoded as a string
         */
        profile?: string;
        /**
         * Creation date of the [User](#schema_user) in ISO 8601 format
         */
        createdAt: string;
        /**
         * Updating date of the [User](#schema_user) in ISO 8601 format
         */
        updatedAt: string;
    };
}
